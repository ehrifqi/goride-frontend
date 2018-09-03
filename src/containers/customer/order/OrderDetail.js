import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ORDERSTATUS } from '../../../common/data/orderStatus'
import loaderGif from '../../../assets/gif/loading.gif'

import { connect } from 'react-redux';
import { apiCall, extractTokenFromRes } from '../../../services/api'

import { removeActiveBook } from '../../../store/actions/activeBook';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goingToCancel: false
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

  cancelButton = () => {
    switch (this.props.orderStatusId) {
      case ORDERSTATUS.PENDING:
        return (
          <div>
            <button className="ui button negative" style={{ marginTop: '1rem' }} onClick={this.goingToCancelOrderBtnClick}>Cancel Booking</button>
          </div>
        )
        break;
      case ORDERSTATUS.ACCEPTED:
        return (
          <button className="ui button negative">Cancel Order</button>
        )
        break;
    }
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
        break;
      case ORDERSTATUS.PICKED_UP:
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
              <button className="ui button" style={{ marginRight: '10px' }}>Yes, Cancel Order</button>
              <button className="ui button negative">No, Keep Order</button>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

OrderDetail.propTypes = {
  orderStatusId: PropTypes.number.isRequired,
  onOrderCancel: PropTypes.func.isRequired
}

function mapStateToProps(reduxState) {
  return {
    activeBook: reduxState.activeBook,
    currentUser: reduxState.currentUser
  }
}

export default connect(mapStateToProps, {
  removeActiveBook
})(OrderDetail);