import React, { Component } from 'react';
import AdminTable from './AdminTable';
import { RaffleService } from '../../services';

function isRaffleActive(item) {
  const now = new Date();

  return new Date(item.draw_datetime) > now &&
         new Date(item.start_datetime) < now;
}

const columns = [
  {id: 'raffle_name', label: 'Raffle Name', active: isRaffleActive},
  {id: 'total_entries', label: 'Entries'},
  {id: 'total_jackpot', label: 'Jackpot'}
];

class Raffles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    };
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then(rows => this.setState({rows}));
  }

  render() {
    return (
      <AdminTable columns={columns} rows={this.state.rows} />
    );
  }
}

export default Raffles;
