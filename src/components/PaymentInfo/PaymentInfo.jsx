import React, { Component } from 'react';
import { Button, CardContent, Card, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeForm from './StripeForm';
import ProgressBar from '../ProgressBar';
import { RaffleService } from '../../services';
import strings from '../../assets/locales/strings';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import { StorageUtil } from '../../utility';
import moment from 'moment';

const stripePromise = loadStripe('pk_test_eXMu4Pj53sjl7Ff2pj3xYPh8');
class PaymentInfo extends Component {
  state = {
    loading: false,
    errorMessage: '',
    sellerPassword: '',
    name: '',
    raffle: {draw_datetime: moment()},
    progressive: {draw_datetime: moment()},
  };

  componentDidMount() {
    this.setState({loading: true});
    RaffleService.getRaffleById(this.props.raffleId).then((raffle)=>{
      this.setState({raffle});
      RaffleService.getRaffleById(raffle.progressive_draw_id).then((progressive)=>{
        this.setState({progressive});
      });
    });
    RaffleService.createPayment(this.props.bundleId).then((res) => {
      this.setState({
        paymentId: res.paymentId,
        clientSecret: res.clientSecret,
        loading: false
      });
    }).catch((err) => {
      this.setState({
        errorMessage: err.message,
        loading: false
      });
    });
  }

  stripeCallback = (stripe, elements) => {
    if(!this.state.elements && elements) {
      this.setState({
        elements
      });
    }
    if(!this.state.stripe && stripe) {
      this.setState({
        stripe
      });
    }
  }

  componentWillUnmount() {
    this.setState({loading: false});
  }

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    } else {
      this.setState({errorMessage: ''})
    }
  };

  handleSellerPasswordChange = (e) => {
    this.setState({
      sellerPassword: e.target.value
    });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  navigateBack = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
    this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  navigateToConfirmation = async() => {
    let tickets;
    const {sellerPassword} = this.state;

    if(sellerPassword) {
      try{
        this.setState({loading: true});
        tickets = await RaffleService.ticketPurchase({
          raffle_id: this.props.raffleId,
          ticketbundle_id: this.props.bundleId,
          total_price: this.props.bundlePrice,
          beneficiary_id: this.props.beneficiaryId,
          player_id: this.props.playerId,
          payment_type: 'cash',
          seller_password: sellerPassword
        });
        this.setState({loading: false});
      }
      catch(err) {
        console.error(err);

        if(err.status === 400 && typeof err.data.error !== 'string') {
          let errText = '';
          Object.keys(err.data.error).map((key)=>{
            errText += key + ': ' + err.data.error[key]
          });
          this.setState({
            errorMessage: errText
          });
        } else {
          this.setState({
            errorMessage: err.data.error
          });
        }

        this.setState({loading: false});
        return;
      }
    } else {
      const { stripe, elements, clientSecret } = this.state;
      if(this.state.name === '') {
        this.setState({errorMessage: strings.paymentInfo.errors.noName});
        return;
      }
      
      if (stripe && clientSecret) {
        try{
          this.setState({loading: true});
          try{
            await RaffleService.initStripePayment({
              raffle_id: this.props.raffleId,
              ticketbundle_id: this.props.bundle.id,
              total_price: this.props.bundle.price,
              beneficiary_id: this.props.beneficiary.id,
              player_id: this.props.playerId,
              payment_type: 'stripe',
              stripe_payment_id: this.state.paymentId
            });
          }catch(error) {
            //Ignore any error
            console.error(error);
          }

          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: this.state.name,
              },
            }
          });

          if (result.error) {
            this.setState({
              errorMessage:result.error.message
            });
            console.log(result.error.message);
            this.setState({loading: false});
            return;
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              tickets = await RaffleService.ticketPurchase({
                raffle_id: this.props.raffleId,
                ticketbundle_id: this.props.bundleId,
                total_price: this.props.bundlePrice,
                beneficiary_id: this.props.beneficiaryId,
                player_id: this.props.playerId,
                payment_type: 'stripe',
                stripe_payment_id: this.state.paymentId
              });
            }else {
              tickets = 'Processing';
            }
            this.setState({loading: false});
          }
        }catch(err) {
          console.error(err);

          if(err.hasOwnProperty('data')) {
            if(err.status === 400 && typeof err.data.error !== 'string') {
              let errText = '';
              Object.keys(err.data.error).map((key)=>{
                errText += key + ': ' + err.data.error[key]
              });
              this.setState({
                errorMessage: errText,
                loading: false
              });
            } else {
              this.setState({
                errorMessage: err.data.error,
                loading: false
              });
            }
          } else {
            this.setState({
              errorMessage: err.message,
              loading: false
            });
          }

          return;
        }
      } else {
        console.log("Stripe hasn't loaded yet.");
        this.setState({loading: false});
        return;
      }
    }

    this.setState({loading: false});
    this.props.setTicketPurchaseResponse(tickets);
    this.props.navigate(RouteConstants.CONFIRMATION_PAGE);
    this.props.setRoute(RouteConstants.CONFIRMATION_PAGE);
  }

  render() {
    return (
      <div className="checkout-container">
        <Card className="payment-card" variant="outlined">
        <CardContent>
          <ProgressBar activeStep={1}/>
          <div className="payment">
            <div className="payment-error">
              {this.state.errorMessage !== '' ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
            </div>
              <span className="payment-header">{strings.paymentInfo.title}</span>

            <div className="payment-wrapper">
              <div className="payment-info">
                <Elements stripe={stripePromise}>
                  <StripeForm handleResult={this.props.handleResult} stripeCallback={this.stripeCallback} handleChange={this.handleChange} handleSellerPasswordChange={this.handleSellerPasswordChange} handleNameChange={this.handleNameChange} />
                </Elements>
              </div>
              <div className="payment-ticket">
                <p className="payment-ticket-header">${this.props.bundlePrice} {strings.paymentInfo.ticket}</p>
                <span className="payment-ticket-subtext">{strings.paymentInfo.getsYou} {this.props.bundle.quantity} {strings.paymentInfo.text1} {moment(this.state.raffle.draw_datetime).format('MMMM D, YYYY')}. {strings.paymentInfo.and} {this.props.bundle.quantity} {strings.paymentInfo.text2} {moment(this.state.progressive.draw_datetime).format('MMMM D, YYYY')}.</span>
              </div>
            </div>
            <div className="payment-buttons">
              <Button className="payment-buttons-back" onClick={this.navigateBack}>{strings.paymentInfo.back}</Button>
              <Button className="payment-buttons-buy" onClick={this.navigateToConfirmation} endIcon={<ArrowRightAltIcon />} disabled={!stripePromise}>{strings.paymentInfo.buyNow}</Button>
            </div>
          </div>
          </CardContent>
        </Card>
        {this.state.loading && <div className='payment-backdrop'>
          <CircularProgress color="secondary" />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    raffleId: state.getIn(['checkout','raffleId']),
    bundle: state.getIn(['checkout','bundle']),
    bundleId: state.getIn(['checkout','bundle', 'id']),
    bundlePrice: state.getIn(['checkout','bundle', 'price']),
    beneficiaryId: state.getIn(['checkout','detachment','id']),
    beneficiary: state.getIn(['checkout','detachment']),
    playerId: state.getIn(['checkout','playerId'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setTicketPurchaseResponse: CheckoutActions.setTicketPurchaseResponse,
    setRoute: CheckoutActions.setCheckoutRoute
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
