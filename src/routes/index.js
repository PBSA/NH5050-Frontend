import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { RouteConstants as Routes } from '../constants';

console.log('rendering routes');
const routes = (
  <>
    <Switch>
      <Route path={Routes.DASHBOARD} component={Dashboard} />
    </Switch>
  </>
);

export default routes;
