import React, { Component } from 'react';
import { Button, CardContent, Card, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StripeForm from './StripeForm';
import ProgressBar from '../ProgressBar';
import { RaffleService } from '../../services';
import strings from '../../assets/locales/strings';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import moment from 'moment';

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
        this.setState({progressive, loading: false});
      });
    });
  }

  componentWillUnmount() {
    this.setState({loading: false});
  }

  handleSellerPasswordChange = (e) => {
    this.setState({
      sellerPassword: e.target.value
    });
  }

  navigateBack = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
    this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  navigateToConfirmation = async() => {
    let tickets;
    const {sellerPassword} = this.state;

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
          errText += err.data.error[key]
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
                  <StripeForm handleResult={this.props.handleResult} handleSellerPasswordChange={this.handleSellerPasswordChange} />
              </div>
              <div className="payment-ticket">
                <p className="payment-ticket-header">${this.props.bundlePrice} {strings.paymentInfo.ticket}</p>
                <span className="payment-ticket-subtext">{strings.paymentInfo.getsYou} {this.props.bundle.quantity} {strings.paymentInfo.text1} {moment(this.state.raffle.draw_datetime).format('MMMM D, YYYY')}. {strings.paymentInfo.and} {this.props.bundle.quantity} {strings.paymentInfo.text2} {moment(this.state.progressive.draw_datetime).format('MMMM D, YYYY')}.</span>
              </div>
            </div>
            <div className="payment-buttons">
              <Button className="payment-buttons-back" onClick={this.navigateBack}>{strings.paymentInfo.back}</Button>
              <Button className="payment-buttons-buy" onClick={this.navigateToConfirmation} endIcon={<ArrowRightAltIcon />} >{strings.paymentInfo.buyNow}</Button>
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
