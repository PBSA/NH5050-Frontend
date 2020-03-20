import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { hot } from 'react-hot-loader/root';
import { StylesProvider } from '@material-ui/core/styles';
import Header from './Header';
import '../assets/styles/common.scss';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <ConnectedRouter history={this.props.history}>
        <StylesProvider injectFirst>
          <Header />
        </StylesProvider>
      </ConnectedRouter>
    );
  }
}

export default hot(App);
