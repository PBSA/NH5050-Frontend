import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import OrderInfo from '../components/OrderInfo';
import PaymentInfo from '../components/PaymentInfo';
import ConfirmationPage from '../components/ConfirmationPage';
import GrowJackpot from '../components/GrowJackpot';
import { RouteConstants as Routes } from '../constants';

console.log('rendering routes');
const routes = (
  <>
    <Switch>
      <Route path={Routes.DASHBOARD} component={Dashboard} />
      <Route path={Routes.ORDER_INFO} component={OrderInfo} />
      <Route path={Routes.PAYMENT_INFO} component={PaymentInfo} />
      <Route path={Routes.CONFIRMATION_PAGE} component={ConfirmationPage} />
      <Route path={Routes.GROW_JACKPOT} component={GrowJackpot} />
    </Switch>
  </>
);

export default routes;
