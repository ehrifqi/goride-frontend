import React, { Component } from 'react'
import './LandingpageHeader.css';
import goride from './../../assets/img/goride.png';

import {withRouter} from 'react-router-dom';

const LandingpageHeader = props => {
  const redirectToHome = () => {
    props.history.push('/');
  }

  return (
    <header className="header">
      <img src={goride} alt="goride logo" className="header__img" onClick={redirectToHome}/>
    </header>
  )
}

export default withRouter(LandingpageHeader);