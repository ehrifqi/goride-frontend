import React, { Component } from 'react'
import './DriverProfile.css';
import { connect } from 'react-redux'
import { show } from '../../../services/api/v1/drivers'
import { extractTokenFromRes } from '../../../services/api'
import { reSetToken } from '../../../store/actions/auth';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      driver: undefined,
      uneditedDriver: undefined
    }
  }

  onEditProfile = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, editing: true });
  }

  onSaveProfile = (event) => {
    event.preventDefault();
    // Update driver (rails API)
  }

  onCancelEdit = (event) => {
    event.preventDefault();
    const driver = { ...this.state.uneditedDriver }
    this.setState({ ...this.state, editing: false, driver: driver });
  }

  onDriverFieldInputChange = (event) => {
    const driver = { ...this.state.driver };
    driver[event.target.name] = event.target.value;
    this.setState({ ...this.state, driver: driver })
  }

  render() {
    const { editing, driver } = this.state;
    return (
      <form>
        {driver &&
          <div className="form__container">
            <h1 className="title--center">Profile</h1>
            <div className="form-group preview">
              <label>Full Name</label>
              {!editing &&
                <label className="profile-content">{driver.full_name}</label>
              }
              {editing &&
                <input type="text" name="full_name" onChange={this.onDriverFieldInputChange} value={driver.full_name} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Phone Number</label>
              {!editing &&
                <label className="profile-content">{driver.phone_number}</label>
              }
              {editing &&
                <input type="text" name="phone_number" onChange={this.onDriverFieldInputChange} value={driver.phone_number} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Email Address</label>
              {!editing &&
                <label className="profile-content">{driver.email}</label>
              }
              {editing &&
                <input type="text" name="email" onChange={this.onDriverFieldInputChange} value={driver.email} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Birthdate</label>
              {!editing &&
                <label className="profile-content">{driver.birthdate}</label>
              }
              {editing &&
                <input type="date" name="birthdate" onChange={this.onDriverFieldInputChange} value={driver.birthdate} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>License Plate</label>
              {!editing &&
                <label className="profile-content">{driver.license_plate}</label>
              }
              {editing &&
                <input type="text" name="license_plate" onChange={this.onDriverFieldInputChange} value={driver.license_plate} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>License Number</label>
              {!editing &&
                <label className="profile-content">{driver.license_number}</label>
              }
              {editing &&
                <input type="text" name="license_number" onChange={this.onDriverFieldInputChange} value={driver.license_number} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>KTP Number</label>
              {!editing &&
                <label className="profile-content">{driver.ktp_number}</label>
              }
              {editing &&
                <input type="text" name="ktp_number" onChange={this.onDriverFieldInputChange} value={driver.ktp_number} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Address</label>
              {!editing &&
                <label className="profile-content">{driver.address}</label>
              }
              {editing &&
                <input type="text" name="address" onChange={this.onDriverFieldInputChange} value={driver.address} className="edit-field"></input>
              }
            </div>
            <div className="preview">
              {!editing &&
                <button className={`positive ui button`} onClick={this.onEditProfile}>Edit Profile</button>
              }
              {editing &&
                <div>
                  <button className={`positive ui button`} onClick={this.onSaveProfile}>Save</button>
                  <button className={`negative ui button`} onClick={this.onCancelEdit}>Cancel</button>
                </div>
              }
            </div>
          </div>
        }
      </form>
    )
  }

  componentDidMount = () => {
    const { driver, token } = this.props;
    show(driver.id, token,
      (data) => this.props.reSetToken(extractTokenFromRes(data))
    )
      .then(res => {
        console.log(res)
        if (res.driver) {
          this.setState({ ...this.state, driver: res.driver, uneditedDriver: res.driver })
        }
      })
  }
}

function mapStateToProps(reduxState) {
  return {
    driver: reduxState.currentUser.user,
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  reSetToken
})(Profile)