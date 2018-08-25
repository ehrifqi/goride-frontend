import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './Login.css';

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';

import loginAsDriverImg from './../assets/img/login-as-driver.jpg';
import loginAsCustomerImg from './../assets/img/login-as-customer.jpg';

const Login = props => {
  const redirectToDriverLogin = () => {
    props.history.push('/login/driver');
  }

  const redirectToCustomerLogin = () => {
    props.history.push('/login/customer');
  }

  return (
    <React.Fragment>
      <LandingpageHeader />
      <section className="section-login">

        <div className="login__panel">
          <div className="login-div login-driver">
            <a onClick={redirectToDriverLogin}>Login as driver</a>
          </div>
          <div className="login-div login-customer">
            <a onClick={redirectToCustomerLogin}>Login as customer</a>
          </div>
        </div>
      </section>
      <LandingpageFooter />
    </React.Fragment>
  )
}

export default withRouter(Login);