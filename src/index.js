
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/App';
import configureStore, { history } from './redux/store/configureStore';
import { Config } from './utility';
// Initialize store
const trackingId = Config.googleAnalyticsKey; // Google Analytics tracking ID
ReactGA.initialize(trackingId);
const store = configureStore();

// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('content'),
  );
};

render();
