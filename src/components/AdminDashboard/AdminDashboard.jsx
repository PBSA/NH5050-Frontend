import React, { Component, useState } from 'react';
import {
  Card, CardContent, Tabs, Tab,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
import { OrganizationService, RaffleService } from '../../services';
import strings from '../../assets/locales/strings';

import Beneficiaries from './Beneficiaries';
import Sellers from './Sellers';
import Raffles from './Raffles';
import Tickets from './Tickets';

const tabs = [
  { id: 'beneficiaries', label: strings.adminDashboard.tabs.beneficiaries },
  { id: 'sellers', label: strings.adminDashboard.tabs.sellers },
  { id: 'raffles', label: strings.adminDashboard.tabs.raffles },
  { id: 'tickets', label: strings.adminDashboard.tabs.tickets },
];

class AdminDashboard extends Component {
  
  state = {
    tabIndex: 0,
    beneficiaries: [],
    sellers: [],
    raffles: [],
    tickets: [],
  }

  setTabIndex = (index) => {
    this.setState({tabIndex: index});
  }

  getBeneficiaries = () => {
    OrganizationService.getBeneficiaries(this.props.organizationId).then((data) => {
      let beneficiaries = data.map(item => ({
        name: item.user.name,
        type: item.user.type,
        proceeds: item.total_funds,
      }));

      this.setState({beneficiaries});
    })
  }

  getSellers = () => {
    OrganizationService.getSellers(this.props.organizationId).then((data) => {
      let sellers = data.map(item => {
        return ({
          seller_name: item.status + ':' + item.firstname + ' ' + item.lastname,
          seller_sales: item.sales_count,
          seller_funds: item.total_funds
        })
      });
      this.setState({sellers});
    })
  }

  getRaffles = () => {
    RaffleService.getRaffle(this.props.organizationId).then((data) => {
      let raffles = data.map(item => {
        return ({
          raffles_name: (new Date(item.draw_datetime) > new Date(Date.now()) && new Date(item.start_datetime) < new Date(Date.now()) ? 'active' : new Date(item.start_datetime) > new Date(Date.now()) ? ' ' : 'inactive') + ':' + item.raffle_name,
          raffles_entries: item.total_entries,
          raffles_jackpot: item.total_jackpot
        })
      })

      this.setState({raffles});
    })
  }

  componentDidMount() {
    this.getBeneficiaries();
    this.getSellers();
    this.getRaffles();
  }

  render() {
    const { tabIndex, beneficiaries, sellers, raffles, tickets } = this.state;
    const activeTab = tabs[tabIndex].id;
    console.log('PATH INSIDE ADMIN DASHBOARD: ',this.props.path);
    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          <Tabs value={tabIndex} onChange={(e, index) => this.setTabIndex(index)} centered>
            {tabs.map(({ id, label }) => <Tab key={id} label={label} />)}
          </Tabs>
          {activeTab === 'beneficiaries' && <Beneficiaries data={beneficiaries}/>}
          {activeTab === 'sellers' && <Sellers data={sellers}/>}
          {activeTab === 'raffles' && <Raffles data={raffles}/>}
          {activeTab === 'tickets' && <Tickets data={tickets}/>}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    organizationId: state.getIn(['checkout', 'organizationId']),
    path: state.getIn(['router', 'location', 'pathname']),
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
