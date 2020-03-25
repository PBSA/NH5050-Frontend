import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import marineCorpsLogo from '../../assets/images';

class Header extends Component {
  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.DASHBOARD);
  }

  render() {
    return (
      <AppBar className="header" position="static">
        <Toolbar className="header-wrapper">
          <div className="header-socials-wrapper">
            <img className="header-icon" onClick={this.navgiateToOrderInfo} src={marineCorpsLogo} alt="" />
            <div className="header-text">
              <span>New Hampshire Marine Corps League</span>
              <span>50/50 Progressive Raffle</span>
            </div>
          </div>
          <div className="header-socials">
            <span className="header-socials-text">SHARE</span>
            <FacebookIcon className="header-socials-icon" fontSize="large" color="primary" />
            <TwitterIcon className="header-socials-icon" fontSize="large" color="primary" />
            <InstagramIcon className="header-socials-icon" fontSize="large" color="primary" />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Header);
