import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, Reddit as RedditIcon, WhatsApp as WhatsAppIcon, Mail as MailIcon } from '@material-ui/icons';
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
            <FacebookIcon className="header-socials-fb" fontSize="large" />
            <TwitterIcon className="header-socials-twitter" fontSize="large" />
            <LinkedInIcon className="header-socials-linkedin" fontSize="large" />
            <RedditIcon className="header-socials-reddit" fontSize="large" />
            <WhatsAppIcon className="header-socials-whatsapp" fontSize="large" />
            <MailIcon className="header-socials-mail" fontSize="large" />
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
