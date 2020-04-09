import React from 'react';
import AdminTable from './AdminTable';
import { RouteConstants } from '../../constants';

const Beneficiaries = (props) => (
  <AdminTable tableData={props.data} route={RouteConstants.ADMIN_BENEFICIARIES} />
);

export default Beneficiaries;
