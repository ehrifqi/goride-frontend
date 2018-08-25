import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './CustomerLoginForm.css';
class CustomerLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onInputChange = (event) => {
    this.setState({...this.state, [event.target.name]: event.target.value});
  }

  render() {
    const { onLogin } = this.props;
    return (
      <form>
        <div className="form__container">
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Username</label>
            <input type="text" name="username" placeholder="Username" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Password</label>
            <input type="password" name="password" placeholder="Password" className="col-sm-4 form-control" onChange={this.onInputChange}/>
          </div>
          <div className="row justify-content-md-center">
            <button className="positive ui button" onClick={onLogin}>Login</button>
          </div>
        </div>
      </form>
    )
  }
}

CustomerLoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default CustomerLoginForm;