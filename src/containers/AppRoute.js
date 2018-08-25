import React, { Component } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';

const AppRoute = props => {
  return (

      <div id="router">
          <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route exact path="/login" render={props => <Login {...props} />} />
          </Switch>
      </div>
  )
}

function mapStateToProps(reduxState){
  return {

  }
}

export default withRouter(connect(mapStateToProps, null)(AppRoute))