import React, { Component } from 'react';
import {
  TextField, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, InputLabel, Select, MenuItem, Checkbox
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import strings from '../../assets/locales/strings';

class OrderInfo extends Component {

  state = {
    ticketSelected: '1',
    ticketBundles: [
      {label: '1 entry for $5', value: '1'}, 
      {label:'3 entries for $10', value: '2'}, 
      {label:'10 entries for $20', value: '3'}, 
      {label:'50 entries for $50', value: '4'},
    ],
    detachementSelected: '1',
    detachements: [
      {label:'NH Marine Core 1', value: '1'},
      {label:'NH Marine Core 2', value: '2'},
      {label:'NH Marine Core 3', value: '3'}
    ],
    ageCheck: false,
    ticketCheck: false,
  }
  
  handleTicketBundleChange = (event) => {
    const ticket = event.target.value;
    this.setState({ticketSelected: ticket});
  }

  handleDetachementChange = (event) => {
    const ticket = event.target.value;
    this.setState({detachementSelected: ticket});
  }

  handleCheckboxAgeChange = () => {
    this.setState({ageCheck: !this.state.ageCheck});
  };

  handleCheckboxTicketChange = () => {
    this.setState({ticketCheck: !this.state.ticketCheck});
  };

  navigateToPayment = () => {
    this.props.navigate(RouteConstants.PAYMENT_INFO);
  }
  
  render() {
    const {ticketSelected, ticketBundles, detachementSelected, detachements, ageCheck, ticketCheck} = this.state;
    console.log('state: ', this.state);
    return (
      <div className="order">
        <div className="order-wrapper">

          <div className="order-info">
            <div className="order-headers-wrapper">
              <span className="order-headers">{strings.orderInfo.infoHeader}</span>
            </div>
            <TextField
              className="order-info-input"
              label="First Name"
              variant="outlined"
            />
            <TextField
              className="order-info-input"
              label="Last Name"
              variant="outlined"
            />
            <TextField
              className="order-info-input"
              label="Email Address"
              variant="outlined"
            />
            <TextField
              className="order-info-input"
              label="Mobile Phone"
              variant="outlined"
              type="tel"
            />
            <div className="order-headers-wrapper">
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={ageCheck} name="ageCheck" onChange={this.handleCheckboxAgeChange}/>}
                  label="I'm over the age of 16."
                />
                <FormControlLabel
                  control={<Checkbox checked={ticketCheck} name="ticketCheck" onChange={this.handleCheckboxTicketChange}/>}
                  label="Send my ticket numbers via email."
                  />
              </FormGroup>
            </FormControl>
            </div>
          </div>




          <div className="order-tickets">
            <span className="order-headers">{strings.orderInfo.ticketsHeader}</span>
            <span className="order-tickets-subtext">{strings.orderInfo.ticketsSubtext}</span>
            <FormControl component="fieldset">
              <RadioGroup aria-label="Ticket Bundle" name="ticket-bundle" value={ticketSelected} onChange={this.handleTicketBundleChange}>
                {ticketBundles.map((ticket, index) => {
                  return <FormControlLabel key={index} value={ticket.value} control={<Radio />} label={ticket.label} />
                })}
              </RadioGroup>
            </FormControl>

            <div className="order-tickets-wrapper">
              <span className="order-tickets-subtext">{strings.orderInfo.ticketDetachementSubtext}</span>
              <FormControl className="order-tickets-detachement" variant="outlined">
                <InputLabel id="detachement-select">Select a detachement</InputLabel>
                <Select
                  id="detachement-select"
                  value={detachementSelected}
                  onChange={this.handleDetachementChange}
                  label={'Select A Detachement'}
                >
                  {detachements.map((detachement, index) => {
                    return <MenuItem key={index} value={detachement.value}>{detachement.label}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="order-button-wrapper">
          <Button className="order-button" onClick={this.navigateToPayment} endIcon={<ArrowRightAltIcon />}>Continue</Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(OrderInfo);
