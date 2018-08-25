import React, { Component } from 'react'

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';
import DriverLoginForm from './../components/forms/DriverLoginForm.js';

class DriverLogin extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <React.Fragment>
        <LandingpageHeader />
        <DriverLoginForm />
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default DriverLogin;