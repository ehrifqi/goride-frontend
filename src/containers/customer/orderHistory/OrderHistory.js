import React, { Component } from 'react'
import BookHistoryCard from '../../../components/cards/BookHistoryCard';
import { getMemberBookHistories } from '../../../services/api/v1/bookHistories'
import { connect } from 'react-redux';
import { extractTokenFromRes } from '../../../services/api'
import { reSetToken } from '../../../store/actions/auth'

class OrderHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookHistories: []
    }
  }

  mapBookHistoriesToCardProp = (bookHistories) => {
    if (bookHistories) {
      return bookHistories.map((bookHistory) => {
        return {
          id: bookHistory.id,
          memberId: bookHistory.member_id,
          driverId: bookHistory.driver_id,
          srcLat: bookHistory.src_lat,
          srcLng: bookHistory.src_long,
          dstLat: bookHistory.dest_lat,
          dstLng: bookHistory.dest_long,
          price: bookHistory.price,
          from: bookHistory.from,
          to: bookHistory.to,
          rating: bookHistory.rating,
          orderStatusId: bookHistory.order_status_id,
          priceWithGopay: bookHistory.price_with_gopay,
          price: bookHistory.price,
          createdAt: bookHistory.created_at
        }
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.bookHistories && this.state.bookHistories.length > 0) &&
          <BookHistoryCard
            bookHistories={this.state.bookHistories}
          />
        }
      </React.Fragment>
    )
  }

  componentDidMount() {
    const { member, token } = this.props;
    getMemberBookHistories(member.id, token, undefined,
      (data) => this.props.reSetToken(extractTokenFromRes(data))
    ).then(res => {
      const { book_histories } = res;
      if (book_histories) {
        this.setState({ ...this.state, bookHistories: this.mapBookHistoriesToCardProp(book_histories) })
      }
    });
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
})(OrderHistory);