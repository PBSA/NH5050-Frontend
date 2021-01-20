import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import AdminTable from './AdminTable';
import { RaffleService } from '../../services';
import strings from '../../assets/locales/strings';

function isRaffleActive(item) {
  const now = new Date();

  if (new Date(item.draw_datetime) > now && new Date(item.start_datetime) < now) {
    return true;
  }
  if (new Date(item.start_datetime) > now) {
    return undefined;
  }
  return false;
}

const columns = [
  { id: 'raffle_name', label: 'Raffle Name', active: isRaffleActive },
  { id: 'total_entries', label: 'Entries' },
  { id: 'total_jackpot', label: 'Jackpot' },
];

class Raffles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    };
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then((rows) => this.setState({ rows }));
  }

  render() {
    return (
      <div>
        <Button
          className="lottery-form-button"
          onClick={this.props.navigateToCreateLottery}
        >
          {strings.createLottery.buttonText}
        </Button>
        <AdminTable columns={columns} rows={this.state.rows} />
      </div>
    );
  }
}

export default Raffles;
