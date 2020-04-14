import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FormControl, Select, MenuItem, InputLabel, Button,
} from '@material-ui/core';
import { NavigateActions } from '../../redux/actions';
import AdminTable from './AdminTable';
import { RouteConstants } from '../../constants';
import RaffleService from '../../services/RaffleService';

function padZeros(num, totalDigitsRequired) {
  let str = `${num}`;
  while (str.length < totalDigitsRequired) str = `0${str}`;
  return str;
}

const columns = [
  { id: 'ticket_id', label: 'Ticket Id', render: (item) => `R${padZeros(item.raffle_id, 2)}T${padZeros(item.id, 4)}` },
  { id: 'ticket_player', label: 'Player', render: (item) => `${item.player.firstname} ${item.player.lastname}` },
  { id: 'ticket_entries', label: 'Entries', render: (item) => item.bundle.quantity },
  { id: 'ticket_value', label: 'Value', render: (item) => item.total_price.toFixed(2) },
];

class Tickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raffleId: 1,
      raffles: [],
      rows: [],
    };
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then((raffles) => this.setState({ raffles }));

    this.reloadTickets();
  }

  reloadTickets() {
    RaffleService.getTicketSalesForRaffle(this.state.raffleId)
      .then((rows) => this.setState({ rows }));
  }

  handleRaffleChanged(raffleId) {
    this.setState({ raffleId }, () => this.reloadTickets());
  }

  csvExport() {
    RaffleService.getReportUrl(this.state.raffleId)
      .then(({ url }) => window.open(url));
  }

  render() {
    const { raffles, rows } = this.state;

    const totalEntries = rows.reduce((sum, item) => sum + item.bundle.quantity, 0);
    const totalFunds = rows.reduce((sum, item) => sum + item.total_price, 0).toFixed(2);

    return (
      <div>
        <FormControl variant="outlined">
          <InputLabel id="raffle-select">Raffle</InputLabel>
          <Select
            id="raffle-select"
            value={this.state.raffleId}
            onChange={(e) => this.handleRaffleChanged(e.target.value)}
            label="Filter by Raffle"
          >
            {raffles.map((raffle, index) => <MenuItem key={index} value={raffle.id}>{raffle.raffle_name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button className="csv-button" type="button" onClick={() => this.csvExport()}>CSV Export</Button>
        <AdminTable
          columns={columns}
          rows={rows}
          extraRows={[['Total', '', totalEntries, totalFunds]]}
          onRowClick={(row) => this.props.navigate(`${RouteConstants.ADMIN_TICKETS}/${row.id}`)}
        />
      </div>
    );
  }
}

export default (connect(null, (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
))(Tickets));
