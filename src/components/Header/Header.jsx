import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import marineCorpsLogo from '../../assets/images';

const styles = () => ({
  largeIcon: {
    padding: '5px',
    fontSize: '3em',
    cursor: 'pointer',
  },
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar className="header" position="static">
        <Toolbar className="header-wrapper">
          <div className="header-wrapper">
            <img className="header-icon" src={marineCorpsLogo} alt="" />
            <div className="header-text">
              <span>New Hampshire Marine Corps League</span>
              <span>50/50 Progressive Raffle</span>
            </div>
          </div>
          <div className="header-socials">
            <span className="header-socials-text">SHARE</span>
            <FacebookIcon className={classes.largeIcon} fontSize="large" color="primary" />
            <TwitterIcon className={classes.largeIcon} fontSize="large" color="primary" />
            <InstagramIcon className={classes.largeIcon} fontSize="large" color="primary" />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
