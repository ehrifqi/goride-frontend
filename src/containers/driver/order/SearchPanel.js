import React, { Component } from 'react'
import loaderGif from '../../../assets/gif/loading.gif'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getActiveBookByMember, setDriver } from '../../../services/api/v1/activeBooks'
import { extractTokenFromRes } from '../../../services/api';
import { reSetToken } from '../../../store/actions/auth'

import { setActiveBook } from '../../../store/actions/activeBook'

// Socket
import {
  subscribeToNewBookingAccepted,
  subscribeToNewBookingCustomer,
  removeAllSubscriber
} from '../../../services/socket/subscriber/order'

import {
  emitNewBookingAccepted
} from '../../../services/socket/emitter/order'
import { ORDERSTATUS } from '../../../common/data/orderStatus'

const BookDetails = props => {
  const { book } = props;
  return (
    <div className={`ui green segment`} style={{ border: '1.5px solid #27ae60', margin: '1rem 4rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 className="ui center aligned icon header title title--center">
          <i className="circular users icon" style={{ fill: '#27ae60' }}></i>
          New order just came in!
        </h2>
        <div className="item">
          <i className="marker icon"></i>
          <div className="content">
            From: {book.from}
          </div>
        </div>
        <div className="item">
          <i className="marker icon"></i>
          <div className="content">
            To: {book.to}
          </div>
        </div>
        <div className="item">
          <i className="money bill alternate outline icon"></i>
          <div className="content">
            Price: {book.price}
          </div>
        </div>
        <div className="item">
          <i className="location arrow icon"></i>
          <div className="content">
            Distance: {`${book.distance} km`}
          </div>
        </div>
        <button className="ui button green" onClick={props.onAccept}>Accept Booking</button>
        <button className="ui button negative" onClick={props.onDecline}>Decline</button>
      </div>
    </div>
  )
}

BookDetails.propTypes = {
  book: PropTypes.object.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired
}

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      newBook: undefined,
      canAcceptBooking: true
    }
  }

  getPlaceholder() {
    if (!this.state.active) {
      return (
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          Search For Order
        </h2>
      )
    }
    else {
      return (
        <h2 className="ui center aligned icon header">
          <div style={{ display: 'block', textAlign: 'center' }}>
            <img src={loaderGif} alt="Loading" style={{ width: '20rem', zIndex: '1' }} />
          </div>
          <div style={{ display: 'block', textAlign: 'center' }}>
            <p>Looking For Orders</p>
          </div>
        </h2>
      )
    }
  }

  onBtnActiveClick = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, active: true });
    subscribeToNewBookingCustomer(this.props.driver.id, (newBook) => {
      if (this.state.canAcceptBooking)
        this.gotNewBook(newBook);
    })
  }

  onBtnInactiveClick = (event) => {
    event.preventDefault();
    this.unsubscribeFromAll();
    this.setState({ ...this.state, canAcceptBooking: true, newBook: undefined, active: false });
  }

  render() {
    return (
      <React.Fragment>
        <div className={`ui segment`} style={{ border: '1.5px solid #27ae60', backgroundColor: '#ECF0F1', margin: '1rem 4rem' }}>
          {this.getPlaceholder()}
          <div style={{ textAlign: 'center' }}>
            <button className="ui button green" disabled={this.state.active} onClick={this.onBtnActiveClick}>Active</button>
            <button className="ui button negative" disabled={!this.state.active} onClick={this.onBtnInactiveClick}>InActive</button>
          </div>
        </div>

        {this.state.newBook &&
          <BookDetails
            book={this.state.newBook}
            onAccept={this.onBookingAccept}
            onDecline={this.onBookingDecline}
          />
        }
      </React.Fragment>
    )
  }

  gotNewBook = (book) => {
    this.props.putMarkersOnMap(book.src_lat, book.src_long, book.dest_lat, book.dest_long);
    this.setState({ ...this.state, newBook: book, canAcceptBooking: false });
  }

  onBookingAccept = () => {
    /**
     * Call api, check has book been taken?
     * If no, update driver id as api then emit booking accepted
     */
    getActiveBookByMember(this.state.newBook.member_id, this.props.token, (data) => {
      this.props.reSetToken(extractTokenFromRes(data))
    })
      .then(activeBook => {
        if (activeBook && !activeBook.driver_id) {
          this.props.setActiveBook({ ...activeBook.active_book, driver_id: this.props.driver.id, order_status_id: ORDERSTATUS.ACCEPTED });
          emitNewBookingAccepted({ ...activeBook.active_book, driver_id: this.props.driver.id, order_status_id: ORDERSTATUS.ACCEPTED });
          //No driver yet, take order!
          setDriver(this.state.newBook.id, this.props.driver.id, this.props.token, (data) => {
            this.props.reSetToken(extractTokenFromRes(data))
          })
            .then(res => {
              this.props.onBookingAccepted();
            })
            .catch(err => {

            });
        }
      })
  }

  onBookingDecline = () => {
    this.setState({ ...this.state, newBook: undefined, active: true });
    setTimeout(() => {
      this.setState({ ...this.state, canAcceptBooking: true });
    }, 8000);
  }

  unsubscribeFromAll = () => {
    removeAllSubscriber();
  }
}

function mapStateToProps(reduxState) {
  return {
    driver: reduxState.currentUser.user,
    activeBook: reduxState.activeBook,
    token: reduxState.currentUser.token
  }
}

SearchPanel.propTypes = {
  putMarkersOnMap: PropTypes.func.isRequired,
  onBookingAccepted: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  reSetToken,
  setActiveBook
})(SearchPanel);