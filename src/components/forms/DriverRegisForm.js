import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { registerDriver } from '../../store/actions/auth';
import { connect } from 'react-redux'
import { addError, removeError } from '../../store/actions/error'

import './Form.css';
class DriverRegisForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullname: '',
      phoneNumber: '',
      licencePlate: '',
      licenseNumber: '',
      ktpNumber: '',
      address: '',
      birthdate: '',
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
    this.props.registerDriver({
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.fullname,
      phone_number: this.state.phoneNumber,
      birthdate: this.state.birthdate,
      license_plate: this.state.licensePlate,
      phone_number: this.state.phoneNumber,
      license_number: this.state.licenseNumber,
      ktpNumber: this.state.ktpNumber,
      address: this.state.address
    })
      .then(res => {
        this.setState({ ...this.state, loading: false });
        this.props.history.push('/driver')
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
          <h1 className="title--center">Driver Registration</h1>
          <div>
            {error.message && (
              <div className="alert alert-danger col-sm-6 error-box error-box--center" role="alert">
                <p>{error.message}</p>
              </div>)}
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Email</label>
            <input type="text" name="email" placeholder="Email" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Password</label>
            <input type="password" name="password" placeholder="Password" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Full name</label>
            <input type="text" name="fullname" placeholder="Full name" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Birthdate</label>
            <input type="date" name="birthdate" placeholder="Birthdate" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Phone number</label>
            <input type="text" name="phoneNumber" placeholder="Phone number" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">License plate</label>
            <input type="text" name="licensePlate" placeholder="License plate" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">License number</label>
            <input type="text" name="licenseNumber" placeholder="License number" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">KTP number</label>
            <input type="text" name="ktpNumber" placeholder="KTP number" className="col-sm-4 form-control" onChange={this.onInputChange} />
          </div>
          <div className="form-group row justify-content-md-center">
            <label className="col-sm-2">Address</label>
            <textarea type="text" name="address" placeholder="Address" className="col-sm-4 form-control" onChange={this.onInputChange} />
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

export default connect(mapStateToProps, { registerDriver, addError, removeError })(DriverRegisForm);