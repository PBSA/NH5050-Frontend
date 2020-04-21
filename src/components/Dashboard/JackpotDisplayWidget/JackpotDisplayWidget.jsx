import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import { Card, CardContent, Button } from '@material-ui/core';
import { RouteConstants } from '../../../constants';

class JackpotDisplayWidget extends Component {
  
  constructor(props) {
    super(props)

    this.setContentRef = node =>
      (this.contentRef =
        ((!node || !node.contentWindow) && null) ||
        node.contentWindow.document.body)
  }

  navigateToOrderInfo = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
    this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  formatDate = (drawDate) => {
    //format date to output in the following format: October 29, 2019, hh:mm
    let date, formattedDate;
    date = new Date(drawDate);
    const twelveHourOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const twentyFourHourOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    if(this.props.organization.time_format === '24h') {
      formattedDate = date.toLocaleDateString('en-ZA', twentyFourHourOptions);
    } else {
      formattedDate = date.toLocaleDateString('en-US', twelveHourOptions);
    }

    return formattedDate;
  }
  
  render() {
    const { raffle } = this.props;
    return (
      <div className="widget-buy">
        <Card>
          <CardContent className="widget-buy-container">
            <span className="widget-buy-header">Funds Raised</span>
            <span className="widget-buy-content">${+raffle.total_progressive_jackpot * 2}</span>
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

export default JackpotDisplayWidget;