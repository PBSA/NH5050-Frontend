import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigateActions } from '../redux/actions';
import { RouteConstants } from '../constants';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isLoggedIn) {
        this.props.navigate(RouteConstants.ADMIN);
      }
    }

    render() {
      return this.props.isLoggedIn ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({ isLoggedIn: state.getIn(['profiles', 'isLoggedIn']) });

  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      navigate: NavigateActions.navigateToDashboard,
    },
    dispatch,
  );

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
