import React, { Component } from 'react';
// import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import { NavigateActions } from '../../redux/actions';
// import { RouteConstants } from '../../constants';
// import marineCorpsLogo from '../../assets/images';

class ConfirmationPage extends Component {
  render() {
    console.log('render me baby');
    return (
      <h1>HEY!</h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(ConfirmationPage);
