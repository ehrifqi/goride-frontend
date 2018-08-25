import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

// CSS
import './Home.css';

// IMG
import gojekAttributesImg from './../assets/img/gojek-attribute.jpg';
import bnccMarker from './../assets/img/bncc-marker.png';

// Components
import LandingpageHeader from './../components/headers/LandingpageHeader';
import LandingpageFooter from './../components/footers/LandingpageFooter';

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      interval: undefined
    }
  }

  mapTextToBanner = () => {
    const text = 'An ojek for every need';
    const textArr = text.split('');
    let displayText = '';
    let currentIndex = 0;
    const INTERVAL = 150;

    const interval = setInterval(() => {
      if (currentIndex === textArr.length - 1)
        clearInterval(interval);
      this.setState({ ...this.state, text: this.state.text + textArr[currentIndex] })
      currentIndex += 1;
    }, INTERVAL)
    this.setState({ ...this.state, interval: interval });
  }

  render() {
    return (
      <div className="banner">
        <div className="banner__text">
          <h1 className="banner__paragraph">{this.state.text}<img src={bnccMarker} style={{ marginTop: '-80px' }} /></h1>
        </div>
      </div>)
  }

  componentDidMount() {
    this.mapTextToBanner();
  }

  componentWillUnmount() {
    if (this.state.interval !== undefined)
      clearInterval(this.state.interval);
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
  }

  redirectToLoginPage = () => {
    this.props.history.push('/login');
  }

  redirectToRegisterPage = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <React.Fragment>
        <LandingpageHeader />
        <Banner />
        <section id="about-gojek" className="aboutus">
          <h1 className="title--center aboutus__title">Welcome to go-ride</h1>
          <div className="aboutus__panel">
            <img src={gojekAttributesImg} alt="" className="abousus__img" />
            <div className="aboutus__text-panel">
              <p className="paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem obcaecati sapiente suscipit quibusdam animi inventore modi. Sint vero blanditiis vitae modi, maxime ex nihil hic id consequuntur, temporibus voluptatem reprehenderit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptatibus sapiente vel fuga optio qui ut ad voluptas facere architecto laborum quibusdam earum est, error, fugiat tempore inventore aspernatur enim.</p>
            </div>
          </div>
        </section>
        <section className="section-btn">
          <button className="ui positive button btn-login" onClick={this.redirectToLoginPage}>Login</button>
          <button className="ui orange button btn-register" onClick={this.redirectToRegisterPage}>Register</button>
        </section>
        <LandingpageFooter />
      </React.Fragment>
    )
  }
}

export default withRouter(Home);