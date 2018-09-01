import React, { Component } from 'react'
import './LandingpageHeader.css';
import goride from './../../assets/img/goride.png';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const LandingpageHeader = props => {
  const redirectToHome = () => {
    props.history.push('/');
  }

  return (
    <header className="header">
      <img src={goride} alt="goride logo" className="header__img" onClick={props.redirectToHome || redirectToHome}/>
    </header>
  )
}

LandingpageHeader.propTypes = {
  redirectToHome: PropTypes.func
}

export default withRouter(LandingpageHeader);