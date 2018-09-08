import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ORDERSTATUS } from '../../common/data/orderStatus'
import './BookHistoryCard.css'
import { updateRating } from '../../services/api/v1/bookHistories'
import { connect } from 'react-redux'
import { reSetToken } from '../../store/actions/auth'
import { extractTokenFromRes } from '../../services/api'
import { convertZone, formatDate } from '../../services/date';

class CardItem extends Component {
  constructor(props) {
    super(props);
  }

  mapStarsToCardItem = (id, rating, isRatingSet) => {
    return (
      <React.Fragment>
        {this.props.isMember &&
          <React.Fragment>
            {isRatingSet &&
              this.mapSetRatingStarsToCardItem(rating)
            }
            {!isRatingSet &&
              this.mapUnsetRatingStarsToCardItem(id, rating)
            }
          </React.Fragment>
        }

        {!this.props.isMember &&
          this.mapSetRatingStarsToCardItem(rating)
        }
      </React.Fragment>
    )
  }

  mapUnsetRatingStarsToCardItem = (id, rating) => {
    const yellowOrNormalStarClass = (minRating) => {
      return rating >= minRating ? "yellow-star" : "normal-star";
    }

    return (
      <React.Fragment>
        <div style={{ display: 'inline-block' }}>
          <i
            class={`star icon ${yellowOrNormalStarClass(1)}`}
            onClick={(event) => this.props.onStarClick(event, id, 1)}></i>
          <i
            class={`star icon ${yellowOrNormalStarClass(2)}`}
            onClick={(event) => this.props.onStarClick(event, id, 2)}></i>
          <i
            class={`star icon ${yellowOrNormalStarClass(3)}`}
            onClick={(event) => this.props.onStarClick(event, id, 3)}></i>
          <i
            class={`star icon ${yellowOrNormalStarClass(4)}`}
            onClick={(event) => this.props.onStarClick(event, id, 4)}></i>
          <i
            class={`star icon ${yellowOrNormalStarClass(5)}`}
            onClick={(event) => this.props.onStarClick(event, id, 5)}></i>
        </div>
        <div style={{ display: 'inline' }}>
          <button className="ui button green" disabled={rating <= 0} onClick={(event) => this.props.onFinalizeRatingClick(event, id)}>Give Rating</button>
        </div>
      </React.Fragment>
    )
  }

  mapSetRatingStarsToCardItem = (rating) => {
    const yellowOrNormalStarClass = (minRating) => {
      return rating >= minRating ? "yellow-star" : "normal-star";
    }
    return (
      <React.Fragment>
        <div style={{ display: 'inline-block' }}>
          <i class={`star icon ${yellowOrNormalStarClass(1)}`}></i>
          <i class={`star icon ${yellowOrNormalStarClass(2)}`}></i>
          <i class={`star icon ${yellowOrNormalStarClass(3)}`}></i>
          <i class={`star icon ${yellowOrNormalStarClass(4)}`}></i>
          <i class={`star icon ${yellowOrNormalStarClass(5)}`}></i>
        </div>
      </React.Fragment>
    )
  }

  getStatusText = (orderStatusId) => {
    switch (orderStatusId) {
      case ORDERSTATUS.CANCELED_BY_DRIVER:
        return (<span style={{ color: 'red' }}>{"Cancelled by driver"}</span>);
      case ORDERSTATUS.CANCELED_BY_MEMBER:
        return (<span style={{ color: 'red' }}>{"Cancelled by member"}</span>);
      case ORDERSTATUS.ARRIVED:
        return (<span style={{ color: '#27ae60' }}>{"Finished"}</span>);
    }
  }

  render() {
    const { bookHistory } = this.props;
    return (
      <div className="ui cards">
        <div className="card" style={{ width: '100%', boxShadow: '.2rem .2rem .2rem rgba(0,0,0, .5)', border: '1px solid rgba(0,0,0, .2)' }}>
          <div className="content">
            <div className="header">
              {formatDate(convertZone(bookHistory.createdAt), 'LL - hh:mm')}
              <hr />
            </div>
            <section className="rating">
              {bookHistory.orderStatusId === ORDERSTATUS.ARRIVED &&
                <React.Fragment>
                  {this.mapStarsToCardItem(bookHistory.id, bookHistory.rating, bookHistory.isRatingSet)}
                </React.Fragment>
              }
            </section>
            <div style={{ marginBottom: '.5rem' }}>
              <p style={{ fontSize: '.7em' }}><b>Status: {this.getStatusText(bookHistory.orderStatusId)}</b></p>
            </div>
            <div className="description">
              <p style={{ fontSize: '.7em' }}><i className="map pin icon" style={{ color: 'green' }}></i>{bookHistory.from}</p>
            </div>
            <div style={{ transform: 'rotate(90deg)', position: 'absolute', left: '2.1rem' }}>
              ...
            </div>
            <div className="description" style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '.7em' }}><i className="map marker alternate icon" style={{ color: 'red' }}></i>{bookHistory.to}</p>
            </div>
          </div>
          <div className="ui bottom attached button">
            <b>. . .</b>
          </div>
        </div>
      </div>
    )
  }
}

CardItem.propTypes = {
  bookHistory: PropTypes.object.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onFinalizeRatingClick: PropTypes.func.isRequired,
  isMember: PropTypes.bool.isRequired
}


class BookHistoryCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bookHistories: []
    }
  }

  mapDataToCartItems = () => {
    const { bookHistories } = this.state;
    return bookHistories.map((bookHistory) => {
      return (
        <CardItem
          key={bookHistory.id}
          bookHistory={bookHistory}
          onStarClick={this.onStarClick}
          onFinalizeRatingClick={this.onFinalizeRatingClick}
          isMember={this.props.isMember}
        />
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.mapDataToCartItems()}
      </React.Fragment>
    )
  }

  onStarClick = (event, id, rating) => {
    const bookHistories = this.state.bookHistories.map((bookHistory) => {
      if (bookHistory.id !== id)
        return {
          ...bookHistory
        }
      else
        return {
          ...bookHistory,
          rating: rating
        }
    });
    this.setState({ ...this.state, bookHistories: bookHistories })
  }

  onFinalizeRatingClick = (event, id) => {
    const { bookHistories } = this.state
    const selectedBookHistory = bookHistories.filter(bookHistory => bookHistory.id === id)[0];
    updateRating(selectedBookHistory.id, selectedBookHistory.rating, this.props.token,
      (data) => this.props.reSetToken(extractTokenFromRes(data))
    )
      .then(res => {
        //success
        const updatedBookHistories = this.state.bookHistories.map(bookHistory => {
          if (bookHistory.id === id)
            return {
              ...bookHistory,
              isRatingSet: true
            }
          else
            return {
              ...bookHistory
            }
        });
        this.setState({ ...this.state, bookHistories: updatedBookHistories });
      })
  }

  componentDidMount() {
    if (this.props.bookHistories) {
      const bookHistories = this.props.bookHistories.map(bookHistory => {
        return {
          ...bookHistory,
          isRatingSet: bookHistory.rating > 0
        }
      })
      this.setState({ ...this.state, bookHistories: bookHistories })
    }
  }
}


BookHistoryCard.propTypes = {
  bookHistories: PropTypes.array.isRequired,
  isMember: PropTypes.bool.isRequired
  /**
   *  {
        id
        memberId,
        driverId,
        srcLat,
        srcLng,
        dstLat,
        dstLng,
        price,
        from,
        to,
        rating,
        orderStatusId,
        priceWithGopay,
        price,
        createdAt
      }
   */
}

function mapStateToProps(reduxState) {
  return {
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  reSetToken
})(BookHistoryCard);