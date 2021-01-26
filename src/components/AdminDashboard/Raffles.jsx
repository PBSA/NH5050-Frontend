import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import imageCompression from 'browser-image-compression';

import AdminTable from './AdminTable';
import RaffleImageUpload from './RaffleImageUpload';
import { RaffleService } from '../../services';
import strings from '../../assets/locales/strings';

class Raffles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [
        { id: 'raffle_name', label: 'Raffle Name', active: this.isRaffleActive },
        { id: 'total_entries', label: 'Entries' },
        { id: 'total_jackpot', label: 'Jackpot' },
        {
          id: 'raffle_image',
          label: 'Image',
          render: (item) => (<RaffleImageUpload item={item} saveImage={this.saveImage}/>),
        },
      ],
      open: false,
    };
  }

  componentDidMount() {
    RaffleService.getRaffle(this.props.organizationId)
      .then((rows) => {
        rows = rows.sort((a,b) => a.id - b.id);
        this.setState({ rows });
      });
  }

  saveImage = (file, ticketId) => {
    const {rows} = this.state;

    let options = {
      maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
      maxWidthOrHeight: 800, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
      useWebWorker: true // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
    };

    imageCompression(file, options).then((compressedFile) =>
      RaffleService.uploadImage(compressedFile, ticketId)
      .then((res) => {
        const index = rows.findIndex(x => x.id === res.id);
        rows[index].image_url = res.image_url;
        this.setState({rows});
      })
    );
  }

  isRaffleActive = (item) => {
    const now = new Date();
  
    if (new Date(item.draw_datetime) > now && new Date(item.start_datetime) < now) {
      return true;
    }
    if (new Date(item.start_datetime) > now) {
      return undefined;
    }
    return false;
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
        <AdminTable columns={this.state.columns} rows={this.state.rows} />
      </div>
    );
  }
}

export default Raffles;
