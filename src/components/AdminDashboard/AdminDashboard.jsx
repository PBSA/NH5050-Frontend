import React, { Component } from 'react';
import {
  Card, CardContent, Tabs, Tab,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
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
    sellers: [],
    raffles: []
  }

  setTabIndex = (index) => {
    this.setState({tabIndex: index});
  }

  render() {
    const { organizationId } = this.props;
    const { tabIndex } = this.state;
    const activeTab = tabs[tabIndex].id;
    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          <Tabs value={tabIndex} onChange={(e, index) => this.setTabIndex(index)} centered>
            {tabs.map(({ id, label }) => <Tab key={id} label={label} />)}
          </Tabs>
          {activeTab === 'beneficiaries' && <Beneficiaries organizationId={organizationId} />}
          {activeTab === 'sellers' && <Sellers organizationId={organizationId} />}
          {activeTab === 'raffles' && <Raffles organizationId={organizationId} />}
          {activeTab === 'tickets' && <Tickets organizationId={organizationId} />}
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
