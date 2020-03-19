
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore, { history } from './redux/store/configureStore';
// Initialize store
const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('content'),
  );
};

render();
