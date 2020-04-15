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
  { label: strings.adminDashboard.tabs.beneficiaries, route: RouteConstants.ADMIN_BENEFICIARIES },
  { label: strings.adminDashboard.tabs.sellers, route: RouteConstants.ADMIN_SELLERS },
  { label: strings.adminDashboard.tabs.raffles, route: RouteConstants.ADMIN_RAFFLES },
  { label: strings.adminDashboard.tabs.tickets, route: RouteConstants.ADMIN_TICKETS },
];

class AdminDashboard extends Component {

  render() {
    const { organizationId, path } = this.props;

    let tabIndex = 0;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].route === path) {
        tabIndex = i;
        break;
      }
    }

    const activeTab = tabs[tabIndex];

    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          <Tabs value={tabIndex} centered>
            {tabs.map(({ label, route }, index) => <Tab onClick={() => this.props.navigate(route)} key={index} label={label} />)}
          </Tabs>
          {activeTab.route === RouteConstants.ADMIN_BENEFICIARIES && <Beneficiaries organizationId={organizationId} />}
          {activeTab.route === RouteConstants.ADMIN_SELLERS && <Sellers organizationId={organizationId} />}
          {activeTab.route === RouteConstants.ADMIN_RAFFLES && <Raffles organizationId={organizationId} />}
          {activeTab.route === RouteConstants.ADMIN_TICKETS && <Tickets organizationId={organizationId} />}
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
