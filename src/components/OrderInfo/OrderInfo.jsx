import React, { Component, useCallback } from 'react';
import {
  TextField, Button, FormControl, FormControlLabel, FormGroup, CircularProgress, Radio, RadioGroup, InputLabel, Select, MenuItem, Checkbox, Card, CardContent
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import { RaffleService, OrganizationService, UserService } from '../../services';
import { ValidationUtil } from '../../utility';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import strings from '../../assets/locales/strings';
import ProgressBar from '../ProgressBar';

class OrderInfo extends Component {

  constructor(props) {
    super(props);
    const checkout = this.props.checkout;

    this.state = {
      ticketSelected: checkout.get('bundleVal'),
      ticketBundles: [],
      detachmentSelected: checkout.get('detachementVal'),
      detachments: [],
      firstName: checkout.get('firstName'),
      lastName: checkout.get('lastName'),
      phoneNum: checkout.get('phone'),
      email: checkout.get('email'),
      playerId: 0,
      ageCheck: checkout.get('ageCheck'),
      emailCheck: checkout.get('emailCheck'),
      errorText: '',
    }
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
    this.setState({detachmentSelected: ticket});
  }

  handleCheckboxAgeChange = () => {
    this.setState({ageCheck: !this.state.ageCheck});
  };

  handleCheckboxEmailChange = () => {
    this.setState({emailCheck: !this.state.emailCheck});
  };

  navigateToPayment = () => {
    this.setState({errorText: ''});
    this.props.setOrderInfo({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phoneNum,
      email: this.state.email,
      ageCheck: this.state.ageCheck,
      emailCheck: this.state.emailCheck,
      playerId: this.state.playerId,
      bundle: this.state.ticketBundles[this.state.ticketSelected],
      bundleVal: this.state.ticketSelected,
      detachment: this.state.detachments[this.state.detachmentSelected],
      detachementVal: this.state.detachmentSelected
    });
    this.props.navigate(RouteConstants.PAYMENT_INFO);
  }

  componentDidMount = () => {
    RaffleService.getTicketBundle(this.props.raffleId).then((res) => {
      this.setState({ticketBundles: res});
    });

    OrganizationService.getBeneficiaries(this.props.organizationId).then((res) => {
      this.setState({detachments: res});
    })
  }

  componentWillUnmount = () => {
    this.setState({loading: false});
  }

  submitOrder = async(event) => {
    event.preventDefault();
    let errorText = '';
    const errors = strings.orderInfo.errors;
    const {firstName, lastName, phoneNum, email, ageCheck, emailCheck, detachmentSelected} = this.state;
    let player;

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
    } else if (detachmentSelected === '') {
      errorText = errors.noDetachment;
    } else {
      errorText = ''

      this.setState({loading: true});
      try {
        player = await UserService.getPlayer(email, phoneNum);
      } catch (err) {
        console.error(err);
      }

      if(player) {
        player.is_email_allowed = emailCheck;
        delete player.organization_id;
        this.setState({playerId: player.id});
      } else {
        player = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          mobile: phoneNum,
          is_email_allowed: emailCheck
        }
      }

      try {
        player = await UserService.createPlayer(player);
        this.setState({playerId: player.id, loading: false});
      } catch (err) {
        console.error(err);
        
        if(err.hasOwnProperty('data')) {
          if(err.status === 400 && typeof err.data.error !== 'string') {
            let errText = '';
            Object.keys(err.data.error).map((key)=>{
              errText += key + ': ' + err.data.error[key] + '\n'
            });
            this.setState({
              errorText: errText,
              loading: false
            });
          } else {
            this.setState({
              errorText: err.data.error,
              loading: false
            });
          }
        } else {
          this.setState({
            errorText: err.message,
            loading: false
          });
        }

        return;
      }
      this.navigateToPayment();
    }

    this.setState({errorText: errorText, loading: false});
  }

  render() {
    const {firstName, lastName, email, phoneNum, ticketSelected, ticketBundles, detachmentSelected, detachments, ageCheck, emailCheck, errorText} = this.state;

    return (
      <div>
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
                    label={strings.orderInfo.firstNameLabel}
                    variant="outlined"
                    value={firstName}
                    onChange={this.handleFirstnameChange}
                  />
                  <TextField
                    className="order-info-input"
                    label={strings.orderInfo.lastNameLabel}
                    variant="outlined"
                    value={lastName}
                    onChange={this.handleLastnameChange}
                  />
                  <TextField
                    className="order-info-input"
                    label={strings.orderInfo.emailLabel}
                    variant="outlined"
                    value={email}
                    onChange={(event) => this.setState({email: event.target.value})}
                  />
                  <TextField
                    className="order-info-input"
                    label={strings.orderInfo.phoneLabel}
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
                          label={strings.orderInfo.ageCheckLabel}
                        />
                        <FormControlLabel
                          control={<Checkbox checked={emailCheck} name="emailCheck" onChange={this.handleCheckboxEmailChange}/>}
                          label={strings.orderInfo.emailCheckLabel}
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
                    <span className="order-tickets-subtext">{strings.orderInfo.ticketDetachmentSubtext}</span>
                    <FormControl className="order-tickets-detachment" variant="outlined">
                    <InputLabel id="detachment-select">{strings.orderInfo.detachmentSelectLabel}</InputLabel>
                      <Select
                        id="detachment-select"
                        value={detachmentSelected}
                        onChange={this.handleDetachementChange}
                        label={'Select A Detachment'}
                      >
                        {detachments.map((detachment, index) => {
                          return <MenuItem key={index} value={index}>{detachment.user.name}</MenuItem>
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
        {this.state.loading && <div className='order-backdrop'>
          <CircularProgress color="secondary" />
        </div>}
      </div>
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
