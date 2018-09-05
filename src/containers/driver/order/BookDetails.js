import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ORDERSTATUS } from '../../../common/data/orderStatus'
import { show } from '../../../services/api/v1/members'
import { extractTokenFromRes } from '../../../services/api'
import { reSetToken } from '../../../store/actions/auth';

class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberName: '',
      memberEmail: '',
      phoneNumber: '',
      goingToCancel: false
    }
  }
  isCancelButtonDisabled = () => {
    const { activeBook } = this.props;
    if (activeBook) {
      switch (activeBook.order_status_id) {
        case ORDERSTATUS.PENDING:
          return false;
        case ORDERSTATUS.ACCEPTED:
          return false;
        case ORDERSTATUS.PICKED_UP:
          return true;
      }
    }
  }

  render() {
    const { activeBook } = this.props;
    return (
      <div className={`ui green segment`} style={{ border: '1.5px solid #27ae60', margin: '1rem 4rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ display: 'inline-block' }} className="ui header">
            <i className="user circle icon"></i>
            <div className="content">
              {this.state.memberName}
              <div className="sub header">{this.state.memberEmail} ({this.state.phoneNumber})</div>
            </div>
          </h2>
          <div className="item">
            <i className="marker icon"></i>
            <div className="content">
              From: {activeBook.from}
            </div>
          </div>
          <div className="item">
            <i className="marker icon"></i>
            <div className="content">
              To: {activeBook.to}
            </div>
          </div>
          <div className="item">
            <i className="money bill alternate outline icon"></i>
            <div className="content">
              Price: {activeBook.price}
            </div>
          </div>
          <div className="item">
            <i className="location arrow icon"></i>
            <div className="content">
              Distance: {`${activeBook.distance} km`}
            </div>
          </div>
          {!this.state.goingToCancel &&
            <button disabled={this.isCancelButtonDisabled()} className="ui button negative" onClick={() => this.setState({ ...this.state, goingToCancel: true })}>Cancel</button>
          }
          {this.state.goingToCancel &&
            <div>
              <h3>Are you sure you want to cancel this booking?</h3>
              <button className="ui button" style={{ marginRight: '10px' }} onClick={this.props.onDriverCancellation}>Yes, Cancel Order</button>
              <button className="ui button negative" onClick={() => this.setState({ ...this.state, goingToCancel: false })}>No, Keep Order</button>
            </div>
          }
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    if (this.props.activeBook) {
      show(this.props.activeBook.member_id, this.props.token, (data) => this.props.reSetToken(extractTokenFromRes(data)))
        .then(data => {
          if (data.member) {
            this.setState({
              ...this.state,
              memberName: data.member.full_name,
              memberEmail: data.member.email,
              phoneNumber: data.member.phone_number
            })
          }
        })
    }
  }
}

BookDetails.propTypes = {
  onDriverCancellation: PropTypes.func.isRequired
}

function mapStateToProps(reduxState) {
  return {
    activeBook: reduxState.activeBook,
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  reSetToken
})(BookDetails);