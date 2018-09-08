import React, { Component } from 'react'
import './DriverProfile.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            member: undefined
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

    render() {
        const { editing } = this.state;
        return (
            <form>
                <div className="form__container">
                    <h1 className="title--center">Profile</h1>
                    <div className="form-group preview">
                        <label>Full Name</label>
                        { !editing &&
                            <label className="profile-content">Name Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="full_name" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>Phone Number</label>
                        { !editing &&
                            <label className="profile-content">Number Goes Here</label>
                        }
                        { editing && 
                            <input type="text" name="phone_number" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>Email Address</label>
                        { !editing &&
                            <label className="profile-content">Email Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="email" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>Birthdate</label>
                        { !editing &&
                            <label className="profile-content">Birthdate Goes Here</label>
                        }
                        { editing &&
                            <input type="date" name="birthdate" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>License Plate</label>
                        { !editing &&
                            <label className="profile-content">Plate Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="license_plate" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>License Number</label>
                        { !editing &&
                            <label className="profile-content">License Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="license_number" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>KTP Number</label>
                        { !editing &&
                            <label className="profile-content">KTP Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="ktp_number" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="form-group preview">
                        <label>Address</label>
                        { !editing &&
                            <label className="profile-content">Address Goes Here</label>
                        }
                        { editing &&
                            <input type="text" name="address" value="" className="edit-field"></input>
                        }
                    </div>
                    <div className="preview">
                        { !editing &&
                            <button className={`positive ui button`} onClick={this.onEditProfile}>Edit Profile</button>
                        }
                        { editing &&
                            <button className={`positive ui button`}>Save</button>
                        }
                    </div>
                </div>
            </form>
        )
    }
}

export default Profile