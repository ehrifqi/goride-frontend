import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ORDERSTATUS } from '../../../common/data/orderStatus'
import loaderGif from '../../../assets/gif/loading.gif'

import { connect } from 'react-redux';
import { apiCall, extractTokenFromRes } from '../../../services/api'
import { reSetToken } from '../../../store/actions/auth';

import { removeActiveBook } from '../../../store/actions/activeBook';

import { emitNewBookingMemberCancellation } from '../../../services/socket/emitter/order'
import { show } from '../../../services/api/v1/drivers'

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goingToCancel: false,
      isPickedUp: false,
      driverName: '',
      driverPhone: '',
      driverLicensePlate: '',
    }
  }

  goingToCancelOrderBtnClick = (event) => {
    event.preventDefault();
    // No driver yet, can cancel immediately
    if (this.props.activeBook.order_status_id == ORDERSTATUS.PENDING) {
      this.props.onOrderCancel(ORDERSTATUS.PENDING, () => this.props.removeActiveBook());
    }
    else {
      this.setState({ ...this.state, goingToCancel: true });
    }
  }

  setGoingToCancelAsFalse = (event) => {
    this.setState({ ...this.state, goingToCancel: false })
  }

  cancelOrder = (event) => {
    this.props.onOrderCancel(ORDERSTATUS.CANCELED_BY_MEMBER, () => {
      emitNewBookingMemberCancellation(this.props.activeBook);
      this.props.removeActiveBook();
    });
  }

  cancelButton = () => {
    switch (this.props.orderStatusId) {
      case ORDERSTATUS.PENDING:
        return (
          <div>
            <button className="ui button negative" style={{ marginTop: '1rem' }} onClick={this.goingToCancelOrderBtnClick}>Cancel Booking</button>
          </div>
        )
      case ORDERSTATUS.ACCEPTED:
        return (
          <div>
            {this.state.goingToCancel == false &&
              <button className="ui button negative" onClick={this.goingToCancelOrderBtnClick}>Cancel Order</button>
            }
          </div>
        )
    }
  }

  getDetailPanel = (statusMessage) => {
    return (
      <React.Fragment>
        <h2 style={{ display: 'inline-block' }} className="ui header">
          <i className="user circle icon"></i>
          <div className="content">
            {this.state.driverName}
            <div className="sub header"><b>{this.state.driverLicensePlate}</b> - {this.state.driverPhone}</div>
          </div>
        </h2>
        <h3>{statusMessage}</h3>
        <div className="item">
          <i className="marker icon"></i>
          <div className="content">
            From: {this.props.activeBook.from}
          </div>
        </div>
        <div className="item">
          <i className="marker icon"></i>
          <div className="content">
            To: {this.props.activeBook.to}
          </div>
        </div>
        <div className="item">
          <i className="money bill alternate outline icon"></i>
          <div className="content">
            Price: {this.props.activeBook.price}
          </div>
        </div>
        <div className="item">
          <i className="location arrow icon"></i>
          <div className="content">
            Distance: {`${this.props.activeBook.distance} km`}
          </div>
        </div>
      </React.Fragment>
    )
  }

  showDetails = () => {
    switch (this.props.orderStatusId) {
      case ORDERSTATUS.PENDING:
        return (
          <h2 className="ui center aligned icon header">
            <div style={{ display: 'block', textAlign: 'center' }}>
              <img src={loaderGif} alt="Loading" style={{ width: '20rem', zIndex: '1' }} />
            </div>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <p>Looking For Driver</p>
            </div>
            {this.cancelButton()}
          </h2>
        )
        break;
      case ORDERSTATUS.ACCEPTED:
        return (
          <div style={{ textAlign: 'center' }}>
            {this.getDetailPanel("Your Driver is picking you up...")}
            {this.cancelButton()}
          </div>
        )
      case ORDERSTATUS.PICKED_UP:
        return (
          <div className={`ui green segment`} style={{ border: '1.5px solid #27ae60', margin: '1rem 4rem' }}>
            <div style={{ textAlign: 'center' }}>
              {this.getDetailPanel("On the way with driver")}
            </div>
          </div>
        )
        break;
      case ORDERSTATUS.CANCELED_BY_DRIVER:
        break;
      case ORDERSTATUS.CANCELED_BY_MEMBER:
        break;
    }
  }
  render() {
    return (
      <React.Fragment>
        {!this.state.goingToCancel &&
          <div className={`ui segment`} style={{ border: '1.5px solid #e67e22', backgroundColor: '#ECF0F1', margin: '1rem 4rem' }}>
            {this.showDetails()}
          </div>
        }
        {this.state.goingToCancel &&
          <div className={`ui segment`} style={{ border: '1.5px solid #e67e22', backgroundColor: '#ECF0F1', margin: '1rem 4rem' }}>
            <div style={{ display: 'block', textAlign: 'center' }}>
              <h3 className="ui header">Our driver would be sad to be cancelled, are you sure?</h3>
              <button className="ui button" style={{ marginRight: '10px' }} onClick={this.cancelOrder}>
                Yes, Cancel Order
              </button>
              <button className="ui button negative" onClick={() => this.setState({ ...this.state, goingToCancel: false })}>No, Keep Order</button>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }

  componentDidMount() {
    // TODO, CALL SHOW DRIVER, SET TO STATE
    const driverId = this.props.activeBook.driver_id
    if (driverId) {
      show(driverId, this.props.token,
        (data) => this.props.reSetToken(extractTokenFromRes(data))
      )
      .then(data => {
        if (data.driver) {
          this.setState({
            ...this.state,
            driverName: data.driver.full_name,
            driverPhone: data.driver.phone_number,
            driverLicensePlate: data.driver.license_plate
          })
        }
      })
    }
  }
}

OrderDetail.propTypes = {
  orderStatusId: PropTypes.number.isRequired,
  onOrderCancel: PropTypes.func.isRequired
}

function mapStateToProps(reduxState) {
  return {
    activeBook: reduxState.activeBook,
    currentUser: reduxState.currentUser,
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  removeActiveBook,
  reSetToken
})(OrderDetail);