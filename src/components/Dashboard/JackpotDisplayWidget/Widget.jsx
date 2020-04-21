import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import { Card, CardContent, Button } from '@material-ui/core';
import { RouteConstants } from '../../../constants';
import { RaffleService } from '../../../services';

export default class Widget extends Component {

  state = {
    raffle: {}
  }

  navigateToOrderInfo = () => {
    // this.props.navigate(RouteConstants.ORDER_INFO);
    // this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  formatDate = (drawDate) => {
    //format date to output in the following format: October 29, 2019, hh:mm
    let date, formattedDate;
    date = new Date(drawDate);
    const twelveHourOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const twentyFourHourOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    
    formattedDate = date.toLocaleDateString('en-ZA', twentyFourHourOptions);

    return formattedDate;
  }

  getRaffles = () => {
    //get current raffle data
    RaffleService.getRaffle(1).then((raffle) => {
      this.sortDraws(raffle);
    }).catch((err) => {
      console.log(err);
    });
  }

  sortDraws = (draws) => {
    const sortedDraws = draws.filter((draw) => {
      return (new Date(draw.draw_datetime) > new Date(Date.now()) && new Date(draw.start_datetime) < new Date(Date.now()) && draw.draw_type === "5050");
    });

    if(!sortedDraws[0]) {
      return;
    }

    this.setState({raffle: sortedDraws[0]});
  }

  componentDidMount() {
    this.getRaffles();
  }
  
  render() {
    const { raffle } = this.state;
    console.log('raffle: ', raffle);
    return (
      <div className="widget-buy">
        <Card>
          <CardContent className="widget-buy-container">
            <span className="widget-buy-header">Funds Raised</span>
            <span className="widget-buy-content">${(+raffle.total_progressive_jackpot * 2).toFixed(2)}</span>
            <span className="widget-buy-header">Grand Prize</span>
            <span className="widget-buy-content">${raffle.total_progressive_jackpot}</span>
            <span className="widget-buy-header">Next 50-50/50 Jackpot</span>
            <span className="widget-buy-content">${raffle.total_jackpot}</span>
            <span className="widget-buy-header">Next Draw</span>
            <span className="widget-buy-content-sm">{this.formatDate(raffle.draw_datetime)}</span>
            <Button className="widget-buy-button" variant="outlined" size="medium" onClick={this.navigateToOrderInfo}>
              Buy Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}