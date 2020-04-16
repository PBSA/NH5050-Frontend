import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigateActions } from '../redux/actions';
import { RouteConstants } from '../constants';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate(prevProps) {
      if (this.props.isLoggedIn !== prevProps.isLoggedIn || this.props.path !== prevProps.path) {
        this.checkAuth();
      }
    }

    checkAuth() {
      if (!this.props.isLoggedIn) {
        this.props.navigate(RouteConstants.ADMIN_LOGIN);
      }
    }

    render() {
      return this.props.isLoggedIn ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: state.getIn(['admin', 'isLoggedIn']),
    path: state.getIn(['router', 'location', 'pathname']),
  });

  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      navigate: NavigateActions.navigate,
    },
    dispatch,
  );

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
