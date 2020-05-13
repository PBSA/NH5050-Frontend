import React, { Component } from 'react';
import { Card, CardContent, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteConstants } from '../../../constants';
import { Config } from '../../../utility';
import strings from '../../../assets/locales/strings';
import Geocode from "react-geocode";

Geocode.setApiKey(Config.googleAPIKey);
Geocode.setLanguage("en");

export default class JackpotDisplayWidget extends Component {
  state = {
    errorText: ''
  }

  navigateToOrderInfo = (e) => {
    e.preventDefault();
    const {navigate, setRoute} = this.props;
    if(Config.isGeofencingEnabled) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.geocodeLookupAndNavigate(position.coords.latitude, position.coords.longitude);
        },
        () => {
          this.setState({
            errorText: strings.dashboard.errors.locationerror
          });
        });
      } else {
        this.setState({
          errorText: strings.dashboard.errors.locationerror
        });
      }
    } else {
      navigate(RouteConstants.ORDER_INFO);
      setRoute(RouteConstants.ORDER_INFO);
    }
  }

  geocodeLookupAndNavigate = (lat, long) => {
    const {navigate, setRoute} = this.props;
    Geocode.fromLatLng(lat, long).then(
      response => {
        const addresses = response.results[0].address_components;
        if(addresses.length > 0) {
          if(addresses.find((address) => address.short_name === Config.usState)) {
            this.setState({
              errorText: ''
            });
            navigate(RouteConstants.ORDER_INFO);
            setRoute(RouteConstants.ORDER_INFO);
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
    const { errorText } = this.state;
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
            {errorText !== '' ? <Alert severity="error">{errorText}</Alert> 
            : <Button className="widget-buy-button" variant="outlined" size="medium" onClick={this.navigateToOrderInfo}>
                Buy Now
              </Button>
            }
          </CardContent>
        </Card>
      </div>
    );
  }
}
