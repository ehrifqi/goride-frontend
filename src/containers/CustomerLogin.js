import React, { Component } from 'react'

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';
import CustomerLoginForm from './../components/forms/CustomerLoginForm.js';

class CustomerLogin extends Component{
  constructor(props){
    super(props);
  }

  onLogin = (event) => {
    event.preventDefault();
  }
  render(){
    return (
      <React.Fragment>
        <LandingpageHeader />
        <CustomerLoginForm 
          onLogin={this.onLogin}
        />
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default CustomerLogin;