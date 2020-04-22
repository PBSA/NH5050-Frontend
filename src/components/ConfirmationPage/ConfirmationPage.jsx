import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaffleService } from '../../services';
import { StorageUtil } from '../../utility';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';
import { RouteConstants } from '../../constants';
import ProgressBar from '../ProgressBar';
import moment from 'moment';

class ConfirmationPage extends Component {
  state = {
    raffle: {id: 0, raffle_name:'', draw_datetime: moment()},
    progressive: {id: 0, draw_datetime: moment()},
    timeToDraw: '',
    timeToProgressiveDraw: ''
  };

  componentDidMount() {
    RaffleService.getRaffleById(this.props.raffle_id).then((raffle)=>{
      this.setState({raffle});
      RaffleService.getRaffleById(raffle.progressive_draw_id).then((progressive)=>{
        this.setState({progressive});
        this.intervalID = setInterval(
          () => this.tick(),
          1000);
      });
    });
  }

  componentWillUnmount() {
    if(this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  tick = () => {
    this.setState({
      timeToDraw: this.timeToDraw(this.state.raffle.draw_datetime),
      timeToProgressiveDraw: this.timeToDraw(this.state.progressive.draw_datetime)
    });
  }

  navigateToOrder = () => {
    this.props.resetCheckout();
    this.props.navigate(RouteConstants.ORDER_INFO);
    this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  navigateToShare = () => {
    this.props.navigate(RouteConstants.GROW_JACKPOT);
    this.props.setRoute(RouteConstants.GROW_JACKPOT);
  }

  timeToDraw = (drawdate) => {
    if(new Date(drawdate) < new Date(Date.now())) {
      return `0d 0h 0m 0s`
    }

    const diff = moment.duration(moment(drawdate).diff(moment()));
    let days = moment(drawdate).diff(moment(), 'days');
    return `${days}d ${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`;
  }

  addLeadingZeros(num, totalDigitsRequired) {
    var str = num+"";
    while (str.length < totalDigitsRequired) str = "0" + str;
    return str;
  }

  render() {
    const {entries, ticket_sales, totalJackpot, totalProgressive, raffle_id, ticket_sales_id} = this.props;
    const {raffle, progressive, timeToDraw, timeToProgressiveDraw} = this.state;
    let totalPrice = ticket_sales.total_price ? ticket_sales.total_price : ticket_sales.get('total_price');
    return (
      <div className="checkout-container">
        <Card className="confirmation-card" variant="outlined">
          <CardContent className="confirmation-content">
          <ProgressBar activeStep={2}/>
          {this.props.ticketConfirmation !== 'Processing' ? <div className="confirmation">
            <span className="confirmation-header">{strings.confirmationPage.header}</span>
            <span className="confirmation-subtext">{strings.confirmationPage.subtext0}</span>
            <span className="confirmation-subtext">{strings.confirmationPage.subtext01}{totalPrice} {strings.confirmationPage.subtext1}</span>
            <span className="confirmation-subtext">{strings.confirmationPage.subtext2} {raffle.raffle_name}{strings.confirmationPage.goodluck}</span>
            <div className="confirmation-tickets">
              {entries.map((ticket, index) => <span key={index} className="confirmation-tickets-ticket">{`R${this.addLeadingZeros(raffle_id,2)}T${this.addLeadingZeros(ticket_sales_id,4)}E${this.addLeadingZeros(ticket.id === undefined ? ticket.get('id') : ticket.id , 5)}`}</span>)}
            </div>
            <span className="confirmation-subtext">{strings.confirmationPage.subtext3}</span>
            <span className="confirmation-subtext">{strings.confirmationPage.subtext4}</span>
            <span className="confirmation-subtext">{strings.confirmationPage.assistance} <a href="mailto:raffles@seacoastmarines.org" className="confirmation-link">raffles@seacoastmarines.org</a>.</span>
            <span className="confirmation-subtext">{strings.confirmationPage.notmember}</span>
            <span className="confirmation-subtext"><a target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/mcl-nh/" className="confirmation-link">{strings.confirmationPage.join}</a> {strings.confirmationPage.joinsidetext}</span>
            <span className="confirmation-message">{strings.confirmationPage.regards}</span>
            <span className="confirmation-message">{strings.confirmationPage.org}</span>
            <a className="confirmation-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/raffle-rules/">{strings.confirmationPage.rules}</a>
            <a className="confirmation-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/raffle-rules/terms-conditions/">{strings.confirmationPage.terms}</a>
            <div className="confirmation-jackpots">
              <div className="confirmation-jackpots-5050">
                <span className="confirmation-jackpots-header"> {strings.confirmationPage.fundsRaised} </span>
                <span className="confirmation-jackpots-amount"> ${(+totalProgressive * 2).toFixed(2)} </span>
                <span className="confirmation-jackpots-date"> {strings.confirmationPage.fundsRaisedSubText} </span>
              </div>
              <div className="confirmation-jackpots-progressive">
                <span className="confirmation-jackpots-header"> {strings.confirmationPage.progressivejackpot} </span>
                <span className="confirmation-jackpots-amount"> ${totalProgressive} </span>
                <span className="confirmation-jackpots-header"> {timeToProgressiveDraw} </span>
                <span className="confirmation-jackpots-date"> {moment(progressive.draw_datetime).format('MMMM D - h:mm A')} </span>
              </div>
              <div className="confirmation-jackpots-5050">
                <span className="confirmation-jackpots-header"> {strings.confirmationPage.jackpot} </span>
                <span className="confirmation-jackpots-amount"> ${totalJackpot} </span>
                <span className="confirmation-jackpots-header"> {timeToDraw} </span>
                <span className="confirmation-jackpots-date"> {moment(raffle.draw_datetime).format('MMMM D - h:mm A')} </span>
              </div>
            </div>

            <div className="confirmation-buttons">
              <Button className="confirmation-buttons-order" onClick={this.navigateToOrder}>{strings.confirmationPage.orderMore}</Button>
              <Button className="confirmation-buttons-print" onClick={() => window.print()}>{strings.confirmationPage.printThisPage}</Button>
              <Button className="confirmation-buttons-grow" onClick={this.navigateToShare}endIcon={<ArrowRightAltIcon />}>{strings.confirmationPage.growJackpot}</Button>
            </div>
          </div> 
          : <div className="confirmation">
            {strings.confirmationPage.processing}
            </div>}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticketConfirmation: state.getIn(['checkout','ticketPurchaseResponse']),
    entries: state.getIn(['checkout','ticketPurchaseResponse','entries']),
    ticket_sales: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales']),
    ticket_sales_id: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales', 'id']),
    raffle_id: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales', 'raffle_id']),
    totalJackpot: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales', 'total_jackpot']),
    totalProgressive: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales', 'total_progressive_jackpot']),
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setRoute: CheckoutActions.setCheckoutRoute,
    resetCheckout: CheckoutActions.resetCheckout
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
