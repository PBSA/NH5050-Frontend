import React, { Component } from 'react';
import {
  Card, CardContent, TextField, Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
import { AdminActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';
import { RouteConstants } from '../../constants';
import { UserService } from '../../services';

class AdminLogin extends Component {
  state = {
    username: '',
    password: '',
    errorText: ''
  };

  doLogin = async(e) => {
    e.preventDefault();

    if(this.state.username === '') {
      this.setState({errorText: 'Username not entered'});
      return;
    } else if(this.state.password === '') {
      this.setState({errorText: 'Password not entered'})
      return;
    }

    try{
      await UserService.login({
        email: this.state.username,
        password: this.state.password,
      });
      this.props.setLoggedIn(true);
      this.props.navigate(RouteConstants.ADMIN);
    } catch(err) {
      this.setState({errorText: 'Username or password is incorrect'});
    }
  }

  componentDidMount() {
    if(this.props.isLoggedIn) {
      this.props.navigate(RouteConstants.ADMIN);
    }
  }

  render() {
    const { errorText, username, password } = this.state;
    return (
      <Card className="login" variant="outlined">
        <CardContent>
          <form className="login-form" onSubmit={this.doLogin}>
            {errorText !== '' ? <Alert className="login-form-alert" severity="error">{errorText}</Alert> : null}
            <div className="login-form-info">
              <div className="login-form-headers-wrapper">
                <span className="login-form-headers">{strings.adminLogin.title}</span>
              </div>
              <TextField
                className="login-form-info-input"
                label={strings.adminLogin.username}
                variant="outlined"
                value={username}
                onChange={(e) => this.setState({username: e.target.value})}
              />
              <TextField
                className="login-form-info-input"
                label={strings.adminLogin.password}
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => this.setState({password: e.target.value})}
              />
              <div className="login-form-button-wrapper">
                <Button
                  className="login-form-button"
                  type="submit"
                >
                  {strings.adminLogin.signIn}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['admin', 'isLoggedIn']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setLoggedIn: AdminActions.setLoggedIn
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);