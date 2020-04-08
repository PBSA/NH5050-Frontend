import React, { useState } from 'react';
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

function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const activeTab = tabs[tabIndex].id;

  return (
    <Card className="order" variant="outlined">
      <CardContent>
        <Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)} centered>
          {tabs.map(({ id, label }) => <Tab key={id} label={label} />)}
        </Tabs>
        {activeTab === 'beneficiaries' && <Beneficiaries />}
        {activeTab === 'sellers' && <Sellers />}
        {activeTab === 'raffles' && <Raffles />}
        {activeTab === 'tickets' && <Tickets />}
      </CardContent>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(AdminDashboard);
