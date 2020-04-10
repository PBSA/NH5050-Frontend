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
      let beneficiaries = data.map(item => {
        return ({
        name: item.user.name,
        type: item.user.type,
        proceeds: item.total_funds,
        })
      });
      this.setState({beneficiaries});
    })
  }

  getSellers = () => {
    OrganizationService.getSellers(this.props.organizationId).then((sellers) => {
      
      this.setState({sellers});
    })
  }

  getRaffles = () => {
    RaffleService.getRaffles(this.props.organizationId).then((raffles) => {
      this.setState({raffles});
    })
  }

  componentDidMount() {
    this.getBeneficiaries();
    // this.getSellers();
    // this.getRaffles();
  }

  render() {
    const { tabIndex, beneficiaries, sellers, raffles, tickets } = this.state;
    const activeTab = tabs[tabIndex].id;
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
    organizationId: state.getIn(['checkout', 'organizationId'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
