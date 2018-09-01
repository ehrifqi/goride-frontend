import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './LandingpageFooter.css';
import gojekLogo from './../../assets/img/gojek-logo.png';
import PropTypes from 'prop-types';

const LandingpageFooter = props => {
  const absoluteFooterClass = (props.isAbsolute !== undefined && props.isAbsolute === false) ? "" : "footer--absolute";
  return (
    <footer className={`footer ${absoluteFooterClass}`}>
      <div className="footer__title">
        <span>Powered by </span>
        <img src={gojekLogo} alt="goride logo" className="footer__img" />
      </div>
      <p>© Copyright 2018</p>
    </footer>
  )
}

LandingpageFooter.propTypes = {
  isAbsolute: PropTypes.bool
}

export default LandingpageFooter