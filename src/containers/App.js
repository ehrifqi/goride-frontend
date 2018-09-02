import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import AppRoute from "./AppRoute";
import { configureStore } from "../store";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import { setCurrentUser, reSetToken } from "../store/actions/auth";

const store = configureStore();

if (localStorage.token) {
  try {
    store.dispatch(
      setCurrentUser(jwtDecode(localStorage.token), localStorage.token, true)
    );
  } catch (err) {
    store.dispatch(setCurrentUser({}, ""));
  }
}

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
