import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import './Register.css';

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';

const Register = props => {
  const redirectToDriverRegistration = () => {
    props.history.push('/register/driver');
  }

  const redirectToCustomerRegistration = () => {
    props.history.push('/register/customer');
  }

  return (
    <React.Fragment>
      <LandingpageHeader />
      <section className="section-login">

        <div className="register-title">
          <h2>Register As</h2>
        </div>
        <div className="register__panel">
          <div className="register-div register-driver">
            <a onClick={redirectToDriverRegistration}>Driver</a>
          </div>
          <div className="register-div register-customer">
            <a onClick={redirectToCustomerRegistration}>Customer</a>
          </div>
        </div>
      </section>
      <LandingpageFooter />
    </React.Fragment>
  )
}

export default withRouter(Register);