import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';
import CustomerLogin from './CustomerLogin';
import DriverLogin from './DriverLogin';
import Register from './Register';
import CustomerRegis from './CustomerRegis';
import DriverRegis from './DriverRegis';

const AppRoute = props => {
  return (

      <div id="router">
          <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route exact path="/login" render={props => <Login {...props} />} />
              <Route exact path="/login/customer" render={props => <CustomerLogin {...props} />} />
              <Route exact path="/login/driver" render={props => <DriverLogin {...props} />} />
              <Route exact path="/register" render={props => <Register {...props} />} />
              <Route exact path="/register/customer" render={props => <CustomerRegis {...props} />} />
              <Route exact path="/register/driver" render={props => <DriverRegis {...props} />} />
          </Switch>
      </div>
  )
}

function mapStateToProps(reduxState){
  return {

  }
}

export default withRouter(connect(mapStateToProps, null)(AppRoute))