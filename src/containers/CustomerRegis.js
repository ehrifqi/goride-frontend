import React, { Component } from 'react'

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';
import CustomerRegisForm from './../components/forms/CustomerRegisForm.js';

class CustomerRegis extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <React.Fragment>
        <LandingpageHeader />
        <CustomerRegisForm />
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default CustomerRegis;