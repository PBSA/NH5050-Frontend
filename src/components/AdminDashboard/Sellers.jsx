import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { RouteConstants } from '../../constants';

export default class Sellers extends Component {
  render() {
    const proceedSum = {
      total: 'Total',
      empty: this.props.data.reduce((sum, {seller_sales}) => sum + parseInt(seller_sales), 0),
      proceeds: this.props.data.reduce((sum, {seller_funds}) => sum + parseFloat(seller_funds), 0).toFixed(2)
    };

    return (
      <AdminTable tableData={this.props.data} route={RouteConstants.ADMIN_SELLERS} sumRowData={proceedSum} />
    );
  }
}
