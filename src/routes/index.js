import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import OrderInfo from '../components/OrderInfo';
import { RouteConstants as Routes } from '../constants';

console.log('rendering routes');
const routes = (
  <>
    <Switch>
      <Route path={Routes.DASHBOARD} component={Dashboard} />
      <Route path={Routes.ORDER_INFO} component={OrderInfo} />
    </Switch>
  </>
);

export default routes;
