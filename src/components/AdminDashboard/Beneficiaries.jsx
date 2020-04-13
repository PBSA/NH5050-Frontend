import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { RouteConstants } from '../../constants';
import { GeneralUtil } from '../../utility';

class Beneficiaries extends Component {
  sumRow = () => {
    const proceeds = GeneralUtil.sumProceeds(this.props.data);
    if(!!proceeds) {
      return {
        total: 'Total',
        empty: '',
        proceeds: proceeds.toFixed(2)
      }
    }
  }

  render() {
    const proceedSum = this.sumRow();
    return (
      <AdminTable tableData={this.props.data} route={RouteConstants.ADMIN_BENEFICIARIES} sumRowData={proceedSum} />
    );
  }
}

export default Beneficiaries;
