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

        <div className="register__panel">
          <div className="register-div register-driver">
            <a onClick={redirectToDriverRegistration}>Register as driver</a>
          </div>
          <div className="register-div register-customer">
            <a onClick={redirectToCustomerRegistration}>Register as customer</a>
          </div>
        </div>
      </section>
      <LandingpageFooter />
    </React.Fragment>
  )
}

export default withRouter(Register);