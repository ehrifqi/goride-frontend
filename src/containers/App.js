import React, { Component } from 'react';
import logo from '../logo.svg';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import AppRoute from './AppRoute';
import { configureStore } from '../store'
import { Provider } from 'react-redux'

const store = configureStore();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <AppRoute />
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;