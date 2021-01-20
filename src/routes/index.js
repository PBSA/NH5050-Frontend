import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import AdminTicketDetails from '../components/AdminTicketDetails';
import CreateLottery from '../components/CreateLottery';
// import SellerForm from '../components/SellerForm';
import CheckoutContainer from '../components/CheckoutContainer';
import { RouteConstants as Routes } from '../constants';
import { requireAuthentication } from '../utility/AuthComponent';
import Widget from '../components/Dashboard/JackpotDisplayWidget/Widget';

const routes = (
  <>
    <Switch>
      {/* Checkout Section */}
      <Route path={Routes.DASHBOARD} component={Dashboard} />
      <Route path={Routes.ORDER_INFO} component={CheckoutContainer} />
      <Route path={Routes.PAYMENT_INFO} component={CheckoutContainer} />
      <Route path={Routes.CONFIRMATION_PAGE} component={CheckoutContainer} />
      <Route path={Routes.GROW_JACKPOT} component={CheckoutContainer} />
      <Route exact path={Routes.JACKPOT_WIDGET} component={Widget} />
      {/* ADMIN SECTION */}
      <Route path={Routes.ADMIN_LOGIN} component={AdminLogin} />
      <Route exact path={Routes.ADMIN} component={requireAuthentication(AdminDashboard)} />
      {/* <Route path={Routes.ADMIN_EDIT_SELLER} component={SellerForm} /> */}
      <Route exact path={Routes.ADMIN_BENEFICIARIES} component={requireAuthentication(AdminDashboard)} />
      <Route exact path={Routes.ADMIN_SELLERS} component={requireAuthentication(AdminDashboard)} />
      <Route exact path={Routes.ADMIN_RAFFLES} component={requireAuthentication(AdminDashboard)} />
      <Route exact path={Routes.ADMIN_TICKETS} component={requireAuthentication(AdminDashboard)} />
      <Route exact path={Routes.CREATE_LOTTERY} component={requireAuthentication(CreateLottery)} />
      <Route path={`${Routes.ADMIN_TICKETS}/:ticket_id`} component={requireAuthentication(AdminTicketDetails)} />
    </Switch>
  </>
);

export default routes;
