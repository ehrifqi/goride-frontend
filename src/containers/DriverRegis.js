import React, { Component } from 'react'

import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';
import DriverRegisForm from './../components/forms/DriverRegisForm.js';

class DriverRegis extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <React.Fragment>
        <LandingpageHeader />
        <DriverRegisForm />
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default DriverRegis;