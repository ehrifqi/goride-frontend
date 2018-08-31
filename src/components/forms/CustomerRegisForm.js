import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { registerMember } from '../../store/actions/auth';
import { connect } from 'react-redux'
import { addError, removeError } from '../../store/actions/error'

import './Form.css';
class CustomerRegisForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
      phoneNumber: '',
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
    this.props.registerMember({
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.fullname,
      phone_number: this.state.phoneNumber
    })
      .then(res => {
        this.setState({ ...this.state, loading: false });
        this.props.history.push('/customer')
      })
      .catch(err => {
        this.setState({ ...this.state, loading: false });
        this.props.addError(err.data.message);
      });
  }

  render() {
    const { error } = this.props;

    const loadingBtnClass = this.state.loading ? " loading disabled " : "";

    return (
      <form>
        <div className="form__container">
          <h1 className="title--center">Customer Registration</h1>
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
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Full Name</label>
            <input type="text" name="fullname" placeholder="Full name" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-1">Phone number</label>
            <input type="text" name="phoneNumber" placeholder="Phone number" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="row justify-content-md-center">
            <button className={`positive ui button ${loadingBtnClass}`} onClick={this.onLogin}>Register</button>
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

export default connect(mapStateToProps, { registerMember, addError, removeError })(CustomerRegisForm);