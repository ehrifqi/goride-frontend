import React, { Component } from 'react'
import './CustomerProfile.css';
import { connect } from 'react-redux';
import { show } from '../../../services/api/v1/members'
import { extractTokenFromRes } from '../../../services/api'
import { reSetToken } from '../../../store/actions/auth'
import { update } from '../../../services/api/v1/members'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      member: undefined,
      uneditedMember: undefined
    }
  }

  onEditProfile = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, editing: true });
  }

  onMemberFieldInputChange = (event) => {
    const member = { ...this.state.member };
    member[event.target.name] = event.target.value;
    this.setState({ ...this.state, member: member })
  }

  onSaveProfile = (event) => {
    event.preventDefault();
    const { member } = this.state;
    // TODO: Update member (rails API)
    update({
      id: member.id,
      fullName: member.full_name,
      email: member.email,
      phoneNumber: member.phone_number
    }, this.props.token,
      (data) => this.props.reSetToken(extractTokenFromRes(data)))
      .then(res => {
        const updatedMember = { ...this.state.member }
        this.setState({ ...this.state, uneditedMember: updatedMember, member: updatedMember, editing: false })
      })
  }

  onCancelEdit = (event) => {
    event.preventDefault();
    const member = { ...this.state.uneditedMember }
    this.setState({ ...this.state, editing: false, member: member });
  }

  render() {
    const { member, editing } = this.state;
    return (
      <form>
        {member &&
          <div className="form__container">
            <h1 className="title--center">Profile</h1>
            <div className="form-group preview">
              <label>Full Name</label>
              {!editing &&
                <label className="profile-content">{member.full_name}</label>
              }
              {editing &&
                <input type="text" name="full_name" onChange={this.onMemberFieldInputChange} value={member.full_name} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Phone Number</label>
              {!editing &&
                <label className="profile-content">{member.phone_number}</label>
              }
              {editing &&
                <input type="text" name="phone_number" onChange={this.onMemberFieldInputChange} value={member.phone_number} className="edit-field"></input>
              }
            </div>
            <div className="form-group preview">
              <label>Email Address</label>
              {!editing &&
                <label className="profile-content">{member.email}</label>
              }
              {editing &&
                <input type="text" name="email" onChange={this.onMemberFieldInputChange} value={member.email} className="edit-field"></input>
              }
            </div>
            <div className="preview">
              {!editing &&
                <button className={`positive ui button`} onClick={this.onEditProfile}>Edit Profile</button>
              }
              {editing &&
                <div>
                  <button className={`positive ui button`} onClick={this.onSaveProfile}>Save</button>
                  <button className={`button ui negative`} onClick={this.onCancelEdit}>Cancel</button>
                </div>
              }
            </div>
          </div>
        }
      </form>
    )
  }

  componentDidMount() {
    // Pull member details from rails API
    const { member, token } = this.props;
    if (member) {
      console.log(member);
      show(member.id, token,
        (data) => this.props.reSetToken(extractTokenFromRes(data)))
        .then(res => {
          if (res.member) {
            this.setState({ ...this.state, member: res.member, uneditedMember: res.member });
            console.log(res.member);
          }
        })
        .catch(err => err);
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    member: reduxState.currentUser.user,
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  reSetToken
})(Profile)