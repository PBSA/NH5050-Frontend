import React, { Component } from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RaffleService } from '../../services';
import { NavigateActions } from '../../redux/actions';
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
    RaffleService.getRaffleById(this.props.ticketConfirmation.ticket_sales.raffle_id).then((raffle)=>{
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
    this.props.navigate(RouteConstants.ORDER_INFO);
  }

  navigateToShare = () => {
    this.props.navigate(RouteConstants.GROW_JACKPOT);
  }

  timeToDraw = (drawdate) => {
    const diff = moment.duration(moment(drawdate).diff(moment()));
    return `${diff.days()}d ${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`;
  }

  addLeadingZeros(num, totalDigitsRequired) {
    var str = num+"";
    while (str.length < totalDigitsRequired) str = "0" + str;
    return str;
  }

  render() {
    let entries, ticket_sales, totalJackpot, totalProgressive;
    const {raffle, progressive, timeToDraw, timeToProgressiveDraw} = this.state;
    if(this.props.ticketConfirmation !== 'Processing') {
      entries = this.props.ticketConfirmation.entries;
      ticket_sales = this.props.ticketConfirmation.ticket_sales;
      totalJackpot = ticket_sales.total_jackpot;
      totalProgressive = ticket_sales.total_progressive_jackpot;
    }
    
    return (
      <Card className="confirmation-card" variant="outlined">
        <CardContent>
        <ProgressBar activeStep={2}/>
        {this.props.ticketConfirmation !== 'Processing' ? <div className="confirmation">
          <span className="confirmation-header">{strings.confirmationPage.header}</span>
          <span className="confirmation-subtext">{strings.confirmationPage.subtext1}</span>
          <span className="confirmation-subtext">{strings.confirmationPage.subtext2} {raffle.raffle_name}{strings.confirmationPage.goodluck}</span>
          <div className="confirmation-tickets">
            {entries.map((ticket, index) => <span key={index} className="confirmation-tickets-ticket">{`R${this.addLeadingZeros(raffle.id,2)}T${this.addLeadingZeros(ticket_sales.id,4)}E${this.addLeadingZeros(ticket.id, 5)}`}</span>)}
          </div>

          <div className="confirmation-jackpots">
            <div className="confirmation-jackpots-5050">
              <span className="confirmation-jackpots-header"> {strings.confirmationPage.jackpot} </span>
              <span className="confirmation-jackpots-amount"> ${totalJackpot} </span>
              <span className="confirmation-jackpots-header"> {timeToDraw} </span>
              <span className="confirmation-jackpots-date"> {strings.confirmationPage.drawn} {moment(raffle.draw_datetime).format('ha ddd, MMM D, YYYY')} </span>
            </div>
            <div className="confirmation-jackpots-progressive">
              <span className="confirmation-jackpots-header"> {strings.confirmationPage.progressivejackpot} </span>
              <span className="confirmation-jackpots-amount"> ${totalProgressive} </span>
              <span className="confirmation-jackpots-header"> {timeToProgressiveDraw} </span>
              <span className="confirmation-jackpots-date"> {strings.confirmationPage.drawn} {moment(progressive.draw_datetime).format('ha ddd, MMM D, YYYY')} </span>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ticketConfirmation: state.getIn(['checkout','ticketPurchaseResponse']),
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage);
