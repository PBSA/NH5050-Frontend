import React, { Component } from 'react';
import {
  FormControl, Select, MenuItem, InputLabel,
} from '@material-ui/core';
import AdminTable from './AdminTable';
import { OrganizationService, RaffleService } from '../../services';

const columns = [
  {
    id: 'name', label: 'Seller Name', render: (item) => `${item.firstname} ${item.lastname}`, active: (item) => item.status === 'active',
  },
  { id: 'sales_count', label: 'Ticket Sales' },
  { id: 'total_funds', label: 'Funds Raised' },
];

export default class Sellers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      raffles: [],
      raffleId: 1,
    };
  }

  async refreshRows() {
    const { organizationId } = this.props;
    const { raffleId } = this.state;

    const rows = await OrganizationService.getSellers(organizationId, raffleId === '' ? null : raffleId);
    this.setState({ rows });
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then((raffles) => {
        this.setState({ raffles }, () => {
          this.refreshRows();
        });
      });
  }

  handleRaffleChanged(raffleId) {
    this.setState({ raffleId }, () => this.refreshRows());
  }

  render() {
    const { rows, raffles, raffleId } = this.state;

    const salesCount = rows.reduce((sum, item) => sum + parseInt(item.sales_count), 0);
    const totalFunds = rows.reduce((sum, item) => sum + parseFloat(item.total_funds), 0).toFixed(2);

    return (
      <>
        <div className="sellers-wrapper">
          <FormControl className="admin-filter">
            <InputLabel id="raffle-select">Filter By Raffle</InputLabel>
            <Select
              id="raffle-select"
              value={raffleId}
              onChange={(e) => this.handleRaffleChanged(e.target.value)}
              label="Filter by Raffle"
            >
              <MenuItem key={0} value="">No Filter</MenuItem>
              {raffles.map((raffle, index) => <MenuItem key={index} value={raffle.id}>{raffle.raffle_name}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        <AdminTable columns={columns} rows={rows} extraRows={[['Total', salesCount, totalFunds]]} />
      </>
    );
  }
}
