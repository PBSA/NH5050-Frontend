import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import AdminTicketDetails from '../components/AdminTicketDetails';
import SellerForm from '../components/SellerForm';
import CheckoutContainer from '../components/CheckoutContainer';
import { RouteConstants as Routes } from '../constants';

const routes = (
  <>
    <Switch>
      <Route path={Routes.DASHBOARD} component={Dashboard} />
      <Route path={Routes.ORDER_INFO} component={CheckoutContainer} />
      <Route path={Routes.PAYMENT_INFO} component={CheckoutContainer} />
      <Route path={Routes.CONFIRMATION_PAGE} component={CheckoutContainer} />
      <Route path={Routes.GROW_JACKPOT} component={CheckoutContainer} />
      <Route path={Routes.ADMIN_LOGIN} component={AdminLogin} />
      <Route path={`${Routes.ADMIN_TICKETS}/:ticket_id`} component={AdminTicketDetails} />
      <Route path={Routes.ADMIN} component={AdminDashboard} />
      <Route path={Routes.ADMIN_EDIT_SELLER} component={SellerForm} />
    </Switch>
  </>
); 

export default routes;
