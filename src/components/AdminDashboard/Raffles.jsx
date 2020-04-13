import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { RouteConstants } from '../../constants';

class Raffles extends Component {
  render() {
    return (
      <AdminTable
        tableData={this.props.data}
        route={RouteConstants.ADMIN_RAFFLES}
      />
    );
  }
}

export default Raffles;
