import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { OrganizationService } from '../../services';

const columns = [
  { id: 'name', label: 'Beneficiaries Name', render: (item) => item.user.name },
  { id: 'type', label: 'Type', render: (item) => item.user.type },
  { id: 'proceeds', label: 'Proceeds', render: (item) => item.total_funds },
];

class Beneficiaries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    };
  }

  componentDidMount() {
    let rows;
    OrganizationService.getOrganizationInfo(this.props.organizationId)
      .then((org) => {
        rows = [{
          user:
          { name: org.name, type: org.type },
          total_funds: org.total_funds,
        }];
      })
      .then(() => OrganizationService.getBeneficiaries(this.props.organizationId)
        .then((beneficiaries) => {
          rows.push(...beneficiaries);
          this.setState({ rows });
        }));
  }

  render() {
    const { rows } = this.state;
    const totalSales = rows.reduce((sum, item) => sum + parseFloat(item.total_funds), 0).toFixed(2);
    return (
      <AdminTable columns={columns} rows={this.state.rows} extraRows={[['Total', '', totalSales]]} />
    );
  }
}

export default Beneficiaries;
