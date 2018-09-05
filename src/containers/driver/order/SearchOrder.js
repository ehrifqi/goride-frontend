import React, { Component } from "react";
import gorideDriverMarker from "./../../../assets/img/markers/goride-driver-marker.png";
import gorideCustomerMarker from "./../../../assets/img/markers/goride-customer-marker.png";
import redMarker from "./../../../assets/img/markers/red-marker.png";
import greenMarker from "./../../../assets/img/markers/green-marker.png";
import { apiCall, extractTokenFromRes } from "../../../services/api";
import {
  trackLocation,
  getCurrentPosition,
  getMapOptions,
  createMarker,
  clearMarkersFromMap,
  mapLocation
} from "../../../services/map";
import { connect } from 'react-redux'
import { getActiveBookByDriver, moveActiveBookToHistory } from '../../../services/api/v1/activeBooks';
import { ORDERSTATUS } from '../../../common/data/orderStatus'

import SearchPanel from './SearchPanel';
import BookDetails from './BookDetails';

import { emitNewBookingDriverCancellation } from '../../../services/socket/emitter/order'

// Redux
import { reSetToken } from '../../../store/actions/auth'
import { setActiveBook, removeActiveBook } from '../../../store/actions/activeBook'

const google = window.google;

const Map = props => {
  return (
    <div className="App" style={{ width: "100%", height: "600px", padding: '1rem 4rem' }}>
      <div id="googleMap" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

class SearchOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      orderMarkers: []
    }
  }
  render() {
    return (
      <section id="driver-search-order">
        <Map />
        {this.props.activeBook === null &&
          <SearchPanel
            putMarkersOnMap={this.putMarkersOnMap}
            onBookingAccepted={this.onBookingAccepted}
          />
        }
        {this.props.activeBook &&
          <BookDetails
            onDriverCancellation={this.onDriverCancellation}
          />
        }
      </section>
    )
  }

  componentDidMount() {
    this.initMap(() => {
      this.trackDriver();

      // GETS DRIVER ACTIVE_BOOK
      getActiveBookByDriver(this.props.driver.id, this.props.token, (data) => {
        this.props.reSetToken(extractTokenFromRes(data))
      }
      )
        .then(res => {
          if (res.active_book) {
            this.props.setActiveBook(res.active_book);
            this.manageBooking();
          }
        });
    });
  }

  onDriverCancellation = (event) => {
    // TODO: 
    /**
     * Update to api (move to history), status: driver cancelled, onsuccess: 
     * remove redux active book
     * emit newbooking:drivercancellation
     * call ManageBooking
     */

    moveActiveBookToHistory(this.props.activeBook.id, ORDERSTATUS.CANCELED_BY_DRIVER, this.props.token, (data) => {
      this.props.reSetToken(extractTokenFromRes(data))
    })
      .then(res => {
        emitNewBookingDriverCancellation(this.props.activeBook);
        this.props.removeActiveBook();
        this.manageBooking();
      })
  }

  trackDriver = () => {
    getCurrentPosition(pos => {
      const { map } = this.state;
      const trackLocationId = trackLocation(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          this.updateDriverPosition(lat, lng);
        }
      );
      this.setState({ ...this.state, trackLocationId: trackLocationId });
    });
  }

  initMap = (afterMapInitCallback) => {
    getCurrentPosition(pos => {
      const mapCanvas = document.getElementById("googleMap");
      const mapOptions = getMapOptions(
        pos.coords.latitude,
        pos.coords.longitude
      );
      const map = new google.maps.Map(mapCanvas, mapOptions);
      this.setState({
        ...this.state,
        map: map,
        directionsDisplay: new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true
        })
      }, () => {
        this.updateDriverPosition(pos.coords.latitude, pos.coords.longitude);
        afterMapInitCallback()
      });
    });
  }

  updateDriverPosition = (lat, lng) => {
    const { map } = this.state;
    map.setCenter(new google.maps.LatLng(lat, lng));
    this.setState({
      ...this.state,
      memberLat: lat,
      memberLng: lng
    });

    createMarker(lat, lng, map, gorideDriverMarker, "Member");
  };

  putMarkersOnMap = (srcLat, srcLng, dstLat, dstLng) => {
    const { map, directionsDisplay } = this.state;
    clearMarkersFromMap(this.state.orderMarkers,
      () => {
        if (srcLat, srcLng, dstLat, dstLng) {
          const markers = []
          createMarker(srcLat, srcLng, map, redMarker, "Member", (marker) => markers.push(marker));
          createMarker(dstLat, dstLng, map, greenMarker, "Member", (marker) => markers.push(marker));
          mapLocation(srcLat, srcLng, dstLat, dstLng, map, directionsDisplay)
          this.setState({ ...this.state, orderMarkers: markers });
        }
      });
  }

  manageBooking = () => {
    const activeBook = this.props.activeBook;
    if (activeBook) {
      this.putMarkersOnMap(activeBook.src_lat, activeBook.src_long, activeBook.dest_lat, activeBook.dest_long);
      switch (activeBook.order_status_id) {
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
    else {
      this.putMarkersOnMap();
      this.setState({
        ...this.state,
        srcLat: undefined,
        srcLng: undefined,
        dstLat: undefined,
        dstLng: undefined,
        from: '',
        to: '',
        distance: undefined,
        price: undefined,
        priceWithGopay: undefined
      })
    }
  }

  onBookingAccepted = () => {
    this.manageBooking();
  }
}

function mapStateToProps(reduxState) {
  return {
    driver: reduxState.currentUser.user,
    activeBook: reduxState.activeBook,
    token: reduxState.currentUser.token
  }
}

export default connect(mapStateToProps, {
  reSetToken,
  setActiveBook,
  removeActiveBook
})(SearchOrder);