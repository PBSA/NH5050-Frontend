import React, { Component } from 'react';
import { Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import strings from '../../assets/locales/strings';
import { OrganizationService, RaffleService } from '../../services';
import MetaTags from 'react-meta-tags';
var parse = require('html-react-parser');

class Dashboard extends Component {
  navigateToOrderInfo = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
    this.props.setRoute(RouteConstants.ORDER_INFO);
  }

  displayImage = () => {
    if(this.props.raffle.image_url) {
      return <img className="dashboard-panel-img" src={this.props.raffle.image_url} alt=""/>;
      
    } else {
      return <CircularProgress color="secondary"/>;
    }
      // else {
      //   return <PanoramaIcon className="dashboard-panel-icon" fontSize="large" />;
      // }
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
    const {raffle} = this.props;
    return (
      <div className="dashboard">
        {raffle.id ?
        <>
          <MetaTags>
            <meta property="og:title" content="New Hampshire Marine Corps League 50-50/50 Raffle" />
            <meta property="og:description" content={raffle.raffle_description} />
            <meta property="og:image" content={raffle.image_url} />
            <meta property="og:url" content={process.env.NODE_ENV === 'development' ? process.env.DEV_BASE_ROUTE : process.env.PRODUCTION_BASE_ROUTE} />
            <meta name="twitter:title" content="New Hampshire Marine Corps League 50-50/50 Raffle" />
            <meta name="twitter:description" content={raffle.raffle_description} />
            <meta name="twitter:image" content={raffle.image_url} />
          </MetaTags>
          <div className="dashboard-panel">
            {this.displayImage()}
            <p className="dashboard-panel-text">
              {parse(raffle.raffle_description)}
            </p>
          </div>

          <div className="dashboard-buy">
            <Card>
              <CardContent className="dashboard-buy-container">
                <span className="dashboard-buy-header">Funds Raised</span>
                <span className="dashboard-buy-content">${(+raffle.total_progressive_jackpot * 2).toFixed(2)}</span>
                <span className="dashboard-buy-header">Grand Prize</span>
                <span className="dashboard-buy-content">${raffle.total_progressive_jackpot}</span>
                <span className="dashboard-buy-header">Next 50-50/50 Jackpot</span>
                <span className="dashboard-buy-content">${raffle.total_jackpot}</span>
                <span className="dashboard-buy-header">Next Draw</span>
                <span className="dashboard-buy-content-sm">{this.formatDate(raffle.draw_datetime)}</span>
                <Button className="dashboard-buy-button" variant="outlined" size="medium" onClick={this.navigateToOrderInfo}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
        : <h3>Thanks for playing. There are currently no active raffles, please check back later.</h3>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    organization: state.getIn(['checkout', 'organization']),
    raffle: state.getIn(['checkout', 'raffle'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setRoute: CheckoutActions.setCheckoutRoute,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
