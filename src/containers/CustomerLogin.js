import React, { Component } from 'react'

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';
import CustomerLoginForm from './../components/forms/CustomerLoginForm.js';

class CustomerLogin extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <React.Fragment>
        <LandingpageHeader />
        <CustomerLoginForm />
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default CustomerLogin;