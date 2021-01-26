import React, { Component } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default class RaffleImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleSave = (files, ticketId) => {
    this.setState({open: false});
    this.props.saveImage(files[0], ticketId);
  }

  render() {
    return (
      <div>
        <Button className="admin-table-button" onClick={this.handleOpen}>
          <img className="admin-table-img" src={this.props.item.image_url} alt="Add" />
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={(files) => this.handleSave(files, this.props.item.id)}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews
          filesLimit={1}
          maxFileSize={5242880}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
