import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { Config } from '../../utility';
import JackpotDisplayWidget from './JackpotDisplayWidget'
var parse = require('html-react-parser');

class Dashboard extends Component {
  displayImage = () => {
    if(this.props.raffle.image_url) {
      return <img className="dashboard-panel-img" src={this.props.raffle.image_url} alt=""/>;
      
    } else {
      return <CircularProgress color="secondary"/>;
    }
  }

  render() {
    const {raffle, navigate, setRoute, organization} = this.props;
    return (
      <div className="dashboard">
        {Config.isMaintenance ?
        <article>
          <h1>We&rsquo;ll be back soon!</h1>
          <div>
            <p>The app is currently unavailable for maintenance. Please check back in a few hours. We apologize for the inconvenience. If you have any questions please contact <a href="mailto:raffles@seacoastmarines.org">raffles@seacoastmarines.org</a></p>
            <p>&mdash; The Team</p>
          </div>
        </article>
        : raffle.id ?
        <>
          <div className="dashboard-panel">
            {this.displayImage()}
            <p className="dashboard-panel-text">
              {parse(raffle.raffle_description)}
            </p>
          </div>
          <JackpotDisplayWidget raffle={raffle} navigate={navigate} setRoute={setRoute} organization={organization}/>
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
