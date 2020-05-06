import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import { Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteConstants } from '../../../constants';
import { Config } from '../../../utility';
import { RaffleService } from '../../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions, CheckoutActions } from '../../../redux/actions';
import strings from '../../../assets/locales/strings';
import Geocode from "react-geocode";

Geocode.setApiKey(Config.googleAPIKey);
Geocode.setLanguage("en");

class Widget extends Component {

  state = {
    raffle: {},
    loadFailed: false,
    errorText: ''
  }

  formatDate = (drawDate) => {
    //format date to output in the following format: October 29, 2019, hh:mm
    let date, formattedDate;
    date = new Date(drawDate);
    const twelveHourOptions = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    
    formattedDate = date.toLocaleDateString('en-US', twelveHourOptions);

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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geocodeLookupAndNavigate(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.setState({
        errorText: strings.dashboard.errors.locationerror
      });
    }
    this.getRaffles();
  }

  geocodeLookupAndNavigate = (lat, long) => {
    Geocode.fromLatLng(lat, long).then(
      response => {
        const addresses = response.results[0].address_components;
        if(addresses.length > 0) {
          if(addresses.find((address) => address.short_name === 'NH')) {
            this.setState({
              errorText: ''
            });
          } else {
            this.setState({
              errorText: strings.dashboard.errors.outsidenh
            });
          }
        } else {
          this.setState({
            errorText: strings.dashboard.errors.locationerror
          });
        }
      },
      error => {
        this.setState({
          errorText: strings.dashboard.errors.locationerror
        });
      }
    );
  }

  renderWidget = () => {
    const {raffle, errorText} = this.state;
    console.log('raffle: ', raffle);
    if(Object.keys(raffle).length !== 0 && raffle.constructor === Object) {
      return (
        <div className="widget-background">
            <div className="widget-buy-container-padded">
              <span className="widget-buy-header-black">New Hampshire Marine Corps League</span>
              <span className="widget-buy-content">{raffle.raffle_name}</span>
              <span className="widget-buy-header">Funds Raised</span>
              <span className="widget-buy-content">${(+raffle.total_progressive_jackpot * 2).toFixed(2)}</span>
              <span className="widget-buy-header">Grand Prize</span>
              <span className="widget-buy-content">${raffle.total_progressive_jackpot}</span>
              <span className="widget-buy-header">Next 50-50/50 Jackpot</span>
              <span className="widget-buy-content">${raffle.total_jackpot}</span>
              <span className="widget-buy-header">Next Draw</span>
              <span className="widget-buy-content-sm">{this.formatDate(raffle.draw_datetime)}</span>
              {errorText !== '' ? <Alert severity="error">{errorText}</Alert>
              : <a className="widget-redirect" target="_blank" rel="noopener noreferrer" href={`${Config.baseRoute}/order`} onClick={() => this.props.setRoute(RouteConstants.ORDER_INFO)}>
                  <Button className="widget-buy-button" variant="outlined" size="medium">
                    Buy Now
                  </Button>
                </a>
              }
            </div>
        </div>
      );
    } else if(this.state.loadFailed) {
      return (
        <div className="widget-loader">
          <span className="admin-error">There are currently no active raffles, please check back later.</span>
        </div>
      )
    } else {
    this.timer = setTimeout(() => {
      this.setState({loadFailed: true});
    }, 5000);

    return (
      <div className="widget-loader">
        <CircularProgress color="secondary" />
      </div>
    );
    }
  }
  
  render() {
    return (
      this.renderWidget()
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setRoute: CheckoutActions.setCheckoutRoute,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Widget);