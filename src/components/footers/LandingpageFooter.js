import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './LandingpageFooter.css';
import gojekLogo from './../../assets/img/gojek-logo.png';

const LandingpageFooter = props => {
  return (
    <footer className="footer">
      <div className="footer__title">
        <span>Powered by </span>
        <img src={gojekLogo} alt="goride logo" className="footer__img" />
      </div>
      <p>Copyright 2018</p>
    </footer>
  )
}

export default LandingpageFooter