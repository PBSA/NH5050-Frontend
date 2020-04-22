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
import { GeneralUtil } from '../../utility';

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
      raffleId: '',
      raffles: [],
      rows: [],
    };
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then((raffles) => {
        const filteredRaffles = raffles.filter((raffle) => new Date(raffle.start_datetime) < new Date())
          .sort((a, b) => new Date(b.start_datetime) - new Date(a.start_datetime));
        const activeRaffle = raffles.find((raffle) => GeneralUtil.isActive5050Raffle(raffle));
        this.setState({ raffles: filteredRaffles, raffleId: activeRaffle ? activeRaffle.id : '' });
      }).then(() => {
        if (this.state.raffleId !== '') this.reloadTickets();
      });
  }

  async reloadTickets() {
    if (this.state.raffleId === '') return;

    const selectedRaffle = this.state.raffles.find((raffle) => raffle.id === this.state.raffleId);

    if (!selectedRaffle) return;

    let rafflesInProgressive;

    if (selectedRaffle.draw_type === 'progressive') {
      rafflesInProgressive = this.state.raffles.filter((raffle) => raffle.progressive_draw_id === selectedRaffle.id);
      const rows = [];

      for (let i = 0; i < rafflesInProgressive.length; i++) {
        const entries = await RaffleService.getTicketSalesForRaffle(rafflesInProgressive[i].id);
        entries.sort((a, b) => b.id - a.id);
        rows.push(...entries);
      }

      this.setState({ rows });
    } else {
      RaffleService.getTicketSalesForRaffle(this.state.raffleId)
        .then((rows) => {
          rows.sort((a, b) => b.id - a.id);
          this.setState({ rows });
        });
    }
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
        <div className="tickets-wrapper">
          <FormControl className="admin-filter">
            <InputLabel id="raffle-select">Filter By Raffle</InputLabel>
            <Select
              id="raffle-select"
              value={this.state.raffleId}
              onChange={(e) => this.handleRaffleChanged(e.target.value)}
              label="Filter by Raffle"
            >
              {raffles.map((raffle, index) => <MenuItem key={index} value={raffle.id}>{raffle.raffle_name}</MenuItem>)}
            </Select>
          </FormControl>
          <Button className="tickets-csv" type="button" onClick={() => this.csvExport()}>CSV Export</Button>
        </div>
        <AdminTable
          columns={columns}
          rows={rows}
          extraRows={[['Total', '', totalEntries, totalFunds]]}
          onRowClick={(row) => this.props.navigate(`${RouteConstants.ADMIN_TICKETS}/${row.id}`)}
          clickableRow
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
