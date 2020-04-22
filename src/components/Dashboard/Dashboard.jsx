import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import MetaTags from 'react-meta-tags';
import JackpotDisplayWidget from './JackpotDisplayWidget'
var parse = require('html-react-parser');

class Dashboard extends Component {
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

  render() {
    const {raffle, navigate, setRoute, organization} = this.props;
    return (
      <div className="dashboard">
        {raffle.id ?
        <>
          {/* <MetaTags>
            <meta property="og:title" content="New Hampshire Marine Corps League 50-50/50 Raffle" />
            <meta property="og:description" content={raffle.raffle_description} />
            <meta property="og:image" content={raffle.image_url} />
            <meta property="og:url" content={process.env.NODE_ENV === 'development' ? process.env.DEV_BASE_ROUTE : process.env.PRODUCTION_BASE_ROUTE} /> 
            <meta name="twitter:title" content="New Hampshire Marine Corps League 50-50/50 Raffle" />
            <meta name="twitter:description" content={raffle.raffle_description} />
            <meta name="twitter:image" content={raffle.image_url} />
          </MetaTags> */}
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
