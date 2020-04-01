import React, { Component, useCallback } from 'react';
import {
  TextField, Button, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, InputLabel, Select, MenuItem, Checkbox, Card, CardContent
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import { RaffleService, OrganizationService } from '../../services';
import { ValidationUtil } from '../../utility';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import strings from '../../assets/locales/strings';
import ProgressBar from '../ProgressBar';

class OrderInfo extends Component {

  state = {
    ticketSelected: '1',
    ticketBundles: [],
    detachementSelected: '',
    detachements: [],
    firstName: '',
    lastName: '',
    phoneNum: '',
    email: '',
    ageCheck: false,
    ticketCheck: false,
    errorText: '',
  }

  handleFirstnameChange = (event) => {
    const firstName = ValidationUtil.normalizeNameField(event);
    this.setState({firstName});
  }

  handleLastnameChange = (event) => {
    const lastName = ValidationUtil.normalizeNameField(event);
    this.setState({lastName});
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
    this.setState({errorText: ''});
    this.props.navigate(RouteConstants.PAYMENT_INFO);
    this.props.setOrderInfo({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phoneNum,
      email: this.state.email,
      ageCheck: this.state.ageCheck,
      emailCheck: this.state.ticketCheck,
      bundle: this.state.ticketBundles[this.state.ticketSelected],
      detachement: this.state.detachements[this.state.ticketSelected]
    });
  }

  componentDidMount = () => {
    RaffleService.getTicketBundle(this.props.raffleId).then((res) => {
      this.setState({ticketBundles: res});
    });

    OrganizationService.getBeneficiaries(this.props.organizationId).then((res) => {
      this.setState({detachements: res});
    })
  }
  
  submitOrder = (event) => {
    event.preventDefault();
    let errorText = '';
    const errors = strings.orderInfo.errors;
    const {firstName, lastName, phoneNum, email, ageCheck, ticketCheck, detachementSelected} = this.state;

    if (firstName === '') {
      errorText = errors.noFirstName;
    } else if (lastName === '') {
      errorText = errors.noLastName;
    } else if (email === '') {
      errorText = errors.noEmail;
    } else if (!ValidationUtil.validateEmail(email)) {
      errorText = errors.invalidEmail;
    } else if (phoneNum === '') {
      errorText = errors.noPhone;
    } else if (!ValidationUtil.validatePhone(phoneNum)) {
      errorText = errors.invalidPhone;
    } else if (!ageCheck) {
      errorText = errors.ageCheck
    } else if (!ticketCheck) {
      errorText = errors.ticketCheck;
    } else if (detachementSelected === '') {
      errorText = errors.noDetachement;
    } else {
      errorText = ''
      this.navigateToPayment();
    }

    this.setState({errorText: errorText});
  }

  render() {
    const {firstName, lastName, email, phoneNum, ticketSelected, ticketBundles, detachementSelected, detachements, ageCheck, ticketCheck, errorText} = this.state;
    console.log('state:', this.state);
    return (
      <Card className="order" variant="outlined">
        <CardContent>
          <ProgressBar activeStep={0}/>
          <form className="order-form" onSubmit={this.submitOrder}>
            {errorText !== '' ? <Alert severity="error">{errorText}</Alert> : null}
            <div className="order-wrapper">
              <div className="order-info">
                <div className="order-headers-wrapper">
                  <span className="order-headers">{strings.orderInfo.infoHeader}</span>
                </div>
                <TextField
                  className="order-info-input"
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={this.handleFirstnameChange}
                />
                <TextField
                  className="order-info-input"
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={this.handleLastnameChange}
                />
                <TextField
                  className="order-info-input"
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(event) => this.setState({email: event.target.value})}
                />
                <TextField
                  className="order-info-input"
                  label="Mobile Phone"
                  variant="outlined"
                  type="tel"
                  value={phoneNum}
                  onChange={(event) => this.setState({phoneNum: event.target.value})}
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
                      return <FormControlLabel key={index} value={index.toString()} control={<Radio />} label={`${ticket.quantity} entry for ${ticket.price}$`} />
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
                        return <MenuItem key={index} value={index}>{detachement.user.name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="order-button-wrapper">
              <Button className="order-button" type="submit" endIcon={<ArrowRightAltIcon />}>Continue</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    organizationId: state.getIn(['checkout', 'organizationId']),
    raffleId: state.getIn(['checkout','raffleId']),
    checkout: state.getIn(['checkout'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setOrderInfo: CheckoutActions.setOrderInfo,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);
