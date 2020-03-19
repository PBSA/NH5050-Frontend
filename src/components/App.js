import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { hot } from 'react-hot-loader/root';
import { StylesProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import './App.scss';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ConnectedRouter history={this.props.history}>
          <StylesProvider injectFirst>
            <Button className="button">
              Click Me!
            </Button>
          </StylesProvider>
        </ConnectedRouter>
      </div>
    );
  }
}

export default hot(App);
