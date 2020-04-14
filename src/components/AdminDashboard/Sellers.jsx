import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { OrganizationService } from '../../services';

const columns = [
  {id: 'name', label: 'Seller Name', render: item => item.firstname + ' ' + item.lastname, active: item => item.status === 'active'},
  {id: 'sales_count', label: 'Ticket Sales'},
  {id: 'total_funds', label: 'Funds Raised'},
];

export default class Sellers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    OrganizationService.getSellers(this.props.organizationId)
      .then(rows => this.setState({rows}));
  }

  render() {
    const { rows } = this.state;

    const salesCount = rows.reduce((sum, item) => sum + parseInt(item.sales_count), 0);
    const totalFunds = rows.reduce((sum, item) => sum + parseFloat(item.total_funds), 0).toFixed(2);

    return (
      <AdminTable columns={columns} rows={this.state.rows} extraRows={[['Total', salesCount, totalFunds]]} />
    );
  }
}
