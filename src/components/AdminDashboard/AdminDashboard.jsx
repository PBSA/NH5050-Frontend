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
import { RouteConstants } from '../../constants';

const tabs = [
  { id: 'beneficiaries', label: strings.adminDashboard.tabs.beneficiaries, route: RouteConstants.ADMIN_BENEFICIARIES },
  { id: 'sellers', label: strings.adminDashboard.tabs.sellers, route: RouteConstants.ADMIN_SELLERS },
  { id: 'raffles', label: strings.adminDashboard.tabs.raffles, route: RouteConstants.ADMIN_RAFFLES },
  { id: 'tickets', label: strings.adminDashboard.tabs.tickets, route: RouteConstants.ADMIN_TICKETS },
];

class AdminDashboard extends Component {
  
  constructor(props) {
    super(props);

    let tabIndex = 0;
    for (const tab of tabs) {
      if (tab.route === props.path) {
        break;
      }

      tabIndex++;
    }
    this.state = { tabIndex };
  }

  setTabIndex = (index) => {
    this.setState({tabIndex: index});
  }

  render() {
    const { organizationId } = this.props;
    const { tabIndex } = this.state;
    const activeTab = tabIndex < 4 ? tabs[tabIndex].id : false;

    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          <Tabs value={tabIndex} onChange={(e, index) => this.setTabIndex(index)} centered>
            {tabs.map(({ id, label, route }) => <Tab onClick={() => this.props.navigate(route)} key={id} label={label} />)}
          </Tabs>
          {activeTab === 'beneficiaries' && <Beneficiaries organizationId={organizationId} />}
          {activeTab === 'sellers' && <Sellers organizationId={organizationId} />}
          {activeTab === 'raffles' && <Raffles organizationId={organizationId} />}
          {activeTab === 'tickets' && <Tickets organizationId={organizationId} />}
          {activeTab === false ? <h1>Admin Dashboard Goes Here!</h1> : null}
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
