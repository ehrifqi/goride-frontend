import React, { Component } from "react";
import gorideDriverMarker from "./../../../assets/img/markers/goride-driver-marker.png";
import gorideCustomerMarker from "./../../../assets/img/markers/goride-customer-marker.png";
import { apiCall } from "../../../services/api";
import {
  trackLocation,
  getCurrentPosition,
  clearLocationTrack,
  getMapOptions,
  createMarker,
  position,
  clearMarkersFromMap,
  getDistanceInMeter,
  geocodeLatLng
} from "../../../services/map";

import MapInputs from "./MapInputs";

// GOOGLE MAPS API
const google = window.google;

/**
 * srcLat: -6.1931677,
      srcLng: 106.7895492,
      dstLat: -6.2002502,
      dstLng: 106.785473,
 */

const Map = props => {
  return (
    <div className="App" style={{ width: "100%", height: "600px" }}>
      <div id="googleMap" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

class OrderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Order details
      from: "",
      to: "",
      distance: undefined,
      price: undefined,
      priceWithGopay: undefined,
      srcLat: undefined,
      srcLng: undefined,
      dstLat: undefined,
      dstLng: undefined,
      orderMarkers: [],

      map: undefined,
      directionsDisplay: new google.maps.DirectionsRenderer(),

      //MapInputs
      isFromFocus: false,
      isToFocus: false,
      callPlaceApiTimer: undefined,
      fromSuggestions: undefined,
      toSuggestions: undefined,

      // Map Tracker
      trackLocationId: undefined,

      // MemberMap
      memberLat: undefined,
      memberLng: undefined,
      memberMarker: undefined,

      // DriverMap
      driverLat: undefined,
      driverLng: undefined
    };
  }

  onInputChange = event => {
    const targetName = event.target.name;
    const value = event.target.value;
    const timer = setTimeout(() => {
      apiCall("get", `/map/get_place_suggestions?query=${value}`)
        .then(places => {
          switch (targetName) {
            case "from":
              this.setState({
                ...this.state,
                fromSuggestions: places.place_suggestions
              });
              break;
            case "to":
              this.setState({
                ...this.state,
                toSuggestions: places.place_suggestions
              });
              break;
          }
          this.setState({ ...this.state, callPlaceApiTimer: undefined });
        })
        .catch(err => { });
    }, 1000);
    if (this.state.callPlaceApiTimer !== undefined) {
      clearTimeout(this.state.callPlaceApiTimer);
    }
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      callPlaceApiTimer: timer
    });
  };

  onInputFocus = event => {
    this.setState({ ...this.state, isFromFocus: false, isToFocus: false });
    switch (event.target.name) {
      case "from":
        this.setState({ ...this.state, isFromFocus: true });
        break;
      case "to":
        this.setState({ ...this.state, isToFocus: true });
        break;
    }
  };

  clearInput = name => {
    switch (name) {
      case "from":
        this.setState({ ...this.state, from: '', srcLat: undefined, srcLng: undefined }, this.updateOrderDetails);
        break;
      case "to":
        this.setState({ ...this.state, to: '', dstLat: undefined, dstLng: undefined }, this.updateOrderDetails);
        break;
    }
  };

  updateOrderDetails = () => {
    const { srcLat, srcLng, dstLat, dstLng, map } = this.state;
    if (srcLat && srcLng && dstLat && dstLng) {
      getDistanceInMeter(srcLat, srcLng, dstLat, dstLng, true, true, distance => {
        apiCall("get", `/map/get_price?distance=${distance / 1000}`)
          .then(res => {
            this.setState({
              ...this.state,
              distance: distance,
              price: res.price,
              priceWithGopay: res.price_with_gopay
            });
          })
          .catch(err => { });
      }
      );
    }

    clearMarkersFromMap(this.state.orderMarkers,
      () => {
        const markers = []
        createMarker(srcLat, srcLng, map, gorideCustomerMarker, "Member", (marker) => markers.push(marker));
        createMarker(dstLat, dstLng, map, gorideCustomerMarker, "Member", (marker) => markers.push(marker));
        this.setState({ ...this.state, isFromFocus: false, isToFocus: false, orderMarkers: markers });
      });
  }

  // mapLocation = (srcLat, srcLng, dstLat, dstLng) => {
  //   var directionsService = new google.maps.DirectionsService();
  //   const { map, directionsDisplay } = this.state;
  //   const start = new google.maps.LatLng(srcLat, srcLng);
  //   const end = new google.maps.LatLng(dstLat, dstLng);

  //   const calcRoute = () => {
  //     var request = {
  //       origin: start,
  //       destination: end,
  //       travelMode: google.maps.TravelMode.DRIVING
  //     };

  //     const makeMarker = (position, icon, title) => {
  //       return new google.maps.Marker({
  //         position: position,
  //         map: this.state.map,
  //         icon: icon,
  //         title: title
  //       });
  //     };

  //     const addMarkers = orderMarkers => {
  //       this.setState({
  //         ...this.state,
  //         orderMarkers: [...this.state.orderMarkers, ...orderMarkers]
  //       });
  //     };

  //     const removeAllMarkersFromMap = () => {
  //       const { map, orderMarkers } = this.state;
  //       for (let i = 0; i < orderMarkers.length; i++) {
  //         orderMarkers[i].setMap(null);
  //       }
  //       this.setState({ ...this.state, orderMarkers: [] });
  //     };

  //     directionsService.route(request, function (response, status) {
  //       if (status == google.maps.DirectionsStatus.OK) {
  //         directionsDisplay.setDirections(response);
  //         const leg = response.routes[0].legs[0];
  //         removeAllMarkersFromMap();
  //         const markers = [];
  //         markers.push(
  //           makeMarker(leg.start_location, gorideCustomerMarker, "title")
  //         );
  //         markers.push(
  //           makeMarker(leg.end_location, gorideDriverMarker, "title")
  //         );
  //         addMarkers(markers);
  //         directionsDisplay.setMap(map);
  //       }
  //     });
  //   };
  //   calcRoute();
  //   google.maps.event.addDomListener(window, "load", calcRoute);
  // };

  onSuggestionItemClick = (name, lat, lng, fromOrTo) => {
    switch (fromOrTo) {
      case "from":
        this.setState(
          { ...this.state, from: name, srcLat: lat, srcLng: lng },
          () => this.updateOrderDetails()
        );
        break;
      case "to":
        this.setState(
          { ...this.state, to: name, dstLat: lat, dstLng: lng },
          () => this.updateOrderDetails()
        );
        break;
    }
  };

  render() {
    return (
      <section id="member-order">
        <Map />
        <MapInputs
          onInputChange={this.onInputChange}
          clearInput={name => this.clearInput(name)}
          onSuggestionItemClick={this.onSuggestionItemClick}
          from={this.state.from}
          to={this.state.to}
          onInputFocus={this.onInputFocus}
          isFromFocus={this.state.isFromFocus}
          isToFocus={this.state.isToFocus}
          fromSuggestions={this.state.fromSuggestions}
          toSuggestions={this.state.toSuggestions}
          distance={this.state.distance}
          price={this.state.price}
          priceWithGopay={this.state.priceWithGopay}
        />
      </section>
    );
  }

  updateMemberPosition = (lat, lng) => {
    const { map } = this.state;
    map.setCenter(new google.maps.LatLng(lat, lng));
    this.setState({
      ...this.state,
      memberLat: lat,
      memberLng: lng
    });

    createMarker(lat, lng, map, gorideCustomerMarker, "Member");
  };

  onMapClick = event => {
    geocodeLatLng(event.latLng, (id, formatted_address, lat, lng) => {
      if (this.state.isFromFocus) {
        this.setState(
          { ...this.state, from: formatted_address, srcLat: lat, srcLng: lng },
          () => this.updateOrderDetails()
        );
      } else if (this.state.isToFocus) {
        this.setState(
          { ...this.state, to: formatted_address, dstLat: lat, dstLng: lng },
          () => this.updateOrderDetails()
        );
      }
    });
  };

  componentDidMount() {
    // GETS MEMBER INITIAL POSITION, ON SUCCESS -> STARTS TRACKING
    getCurrentPosition(pos => {
      const mapCanvas = document.getElementById("googleMap");
      const mapOptions = getMapOptions(
        pos.coords.latitude,
        pos.coords.longitude
      );
      const map = new google.maps.Map(mapCanvas, mapOptions);
      const trackLocationId = trackLocation(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          this.updateMemberPosition(lat, lng);
        }
      );
      map.addListener("click", this.onMapClick);
      this.setState({
        ...this.state,
        map: map,
        trackLocationId: trackLocationId,
        directionsDisplay: new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true
        })
      });
      this.updateMemberPosition(pos.coords.latitude, pos.coords.longitude);
    });
    // this.mapLocation(-6.2002502, 106.785473, -6.1931677, 106.7895492);
  }

  componentWillUnmount() {
    const { trackLocationId } = this.state;

    if (trackLocationId) clearLocationTrack(this.state.trackLocationId);
  }
}

export default OrderPanel;
