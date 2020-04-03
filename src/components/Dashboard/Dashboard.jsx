import React, { Component } from 'react';
import { Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import strings from '../../assets/locales/strings';
import { OrganizationService, RaffleService } from '../../services';

class Dashboard extends Component {
  state = {
    loaded: false,
  }

  navgiateToOrderInfo = () => {
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
    const twelveHourOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'};
    const twentyFourHourOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

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
        <div className="dashboard-panel">
          {this.displayImage()}
          <p className="dashboard-panel-text">
            {raffle.raffle_description}
          </p>
        </div>

        <div className="dashboard-buy">
          <Card>
            <CardContent className="dashboard-buy-container">
              <span className="dashboard-buy-header">Next Draw</span>
              <span className="dashboard-buy-content-sm">{this.formatDate(raffle.draw_datetime)}</span>
              <span className="dashboard-buy-header">Next 5050 jackpot</span>
              <span className="dashboard-buy-content">${raffle.total_jackpot}</span>
              <span className="dashboard-buy-header">Progressive Jackpot</span>
              <span className="dashboard-buy-content">${raffle.total_progressive_jackpot}</span>
              <Button className="dashboard-buy-button" variant="outlined" size="medium" onClick={this.navgiateToOrderInfo}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </div>
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
