import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { signInDriver } from '../../store/actions/auth'
import { addError, removeError } from '../../store/actions/error'
import { connect } from 'react-redux';

import './DriverLoginForm.css';
class DriverLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  onInputChange = (event) => {
    this.props.removeError();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  onLogin = (event) => {
    this.setState({ ...this.state, loading: true });
    event.preventDefault();
    this.props.signInDriver({
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {

      })
      .catch(err => {
        this.props.addError(err.data.message);
      })
      .finally(() => {
        this.setState({ ...this.state, loading: false });
      });
  }

  render() {
    const { error } = this.props;

    const loadingBtnClass = this.state.loading ? " loading disabled " : "";
    return (
      <form>
        <div className="form__container">
          <h1 className="title--center">Driver Login</h1>
          <div>
            {error.message && (
              <div className="alert alert-danger col-sm-5 error-box error-box--center" role="alert">
                <p>{error.message}</p>
              </div>)}
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Email</label>
            <input type="text" name="email" placeholder="Email" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Password</label>
            <input type="password" name="password" placeholder="Password" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="row justify-content-md-center">
            <button className={`positive ui button ${loadingBtnClass}`} onClick={this.onLogin}>Login</button>
          </div>
        </div>
      </form>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error
  }
}

export default connect(mapStateToProps, { signInDriver, addError, removeError })(DriverLoginForm);