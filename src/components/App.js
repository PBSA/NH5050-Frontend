import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader/root';
import { StylesProvider } from '@material-ui/core/styles';
import Header from './Header';
import routes from '../routes';
import { RouteConstants } from '../constants';
import { NavigateActions } from '../redux/actions';
import '../assets/styles/common.scss';

class App extends Component {
  componentDidMount() {
    const isKnownPath = () => {
      const routeValues = Object.values(RouteConstants);
      if (routeValues.indexOf(this.props.path) !== -1) {
        return true;
      }

      return false;
    };

    if (!isKnownPath() || this.props.path === RouteConstants.ROOT) {
      // Change the browser navigation to root.
      this.props.navigate(RouteConstants.DASHBOARD);
    }
  }

  render() {
    console.log(this.props);
    return (
      <ConnectedRouter history={this.props.history}>
        <StylesProvider injectFirst>
          <Header />
          {routes}
        </StylesProvider>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.getIn(['router', 'location', 'pathname']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
