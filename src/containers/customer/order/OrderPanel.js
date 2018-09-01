import React, { Component } from 'react'
import gorideDriverMarker from './../../../assets/img/markers/goride-driver-marker.png'
import gorideCustomerMarker from './../../../assets/img/markers/goride-customer-marker.png'
import { apiCall } from '../../../services/api'
import {
  trackLocation, getCurrentPosition, clearLocationTrack, getMapOptions, createMarker, position, clearMarkersFromMap
} from '../../../services/map'

import MapInputs from './MapInputs'

// GOOGLE MAPS API
const google = window.google;

const Map = props => {
  return (
    <div className="App" style={{ width: '100%', height: '600px' }}>
      <div id="googleMap" style={{ width: '100%', height: '100%' }}></div>
    </div>
  )
}

class OrderPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      price: undefined,
      srcLng: -122.144886,
      srcLat: 37.441888,
      dstLng: -122.143019,
      dstLat: 37.441883,
      map: undefined,
      directionsDisplay: new google.maps.DirectionsRenderer(),
      markers: [],

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
    }
  }

  onInputChange = (event) => {
    const targetName = event.target.name;
    const value = event.target.value;
    const timer = setTimeout(() => {
      apiCall('get', `/map/get_place_suggestions?query=${value}`)
        .then(places => {
          switch (targetName) {
            case "from":
              this.setState({ ...this.state, fromSuggestions: places.place_suggestions });
              break;
            case "to":
              this.setState({ ...this.state, toSuggestions: places.place_suggestions });
              break;
          }
          this.setState({ ...this.state, callPlaceApiTimer: undefined });
        })
        .catch(err => {

        })
    }, 1000);
    if (this.state.callPlaceApiTimer !== undefined) {
      clearTimeout(this.state.callPlaceApiTimer);
    }
    this.setState({ ...this.state, [event.target.name]: event.target.value, callPlaceApiTimer: timer });
  }

  mapPlaceSuggestionsToSuggestions = (placeSuggestions) => {
    if (placeSuggestions !== undefined) {
      return placeSuggestions.map(placeSuggestion => ({
        id: placeSuggestion.id,
        header: placeSuggestion.name,
        description: placeSuggestion.formatted_address
      }))
    }
    return undefined
  }

  onInputFocus = (event) => {
    this.setState({ ...this.state, isFromFocus: false, isToFocus: false })
    switch (event.target.name) {
      case "from":
        this.setState({ ...this.state, isFromFocus: true });
        break;
      case "to":
        this.setState({ ...this.state, isToFocus: true });
        break;
    }
  }

  onInputBlur = (event) => {
    switch (event.target.name) {
      case "from":
        this.setState({ ...this.state, isFromFocus: false });
        break;
      case "to":
        this.setState({ ...this.state, isToFocus: false });
        break;
    }
  }

  clearInput = (name) => {
    this.setState({ ...this.state, [name]: '' })
  }

  mapLocation = (srcLat, srcLng, dstLat, dstLng) => {
    var directionsService = new google.maps.DirectionsService();
    const { map, directionsDisplay } = this.state
    const start = new google.maps.LatLng(srcLat, srcLng);
    const end = new google.maps.LatLng(dstLat, dstLng);

    const calcRoute = () => {
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };

      const makeMarker = (position, icon, title) => {
        return new google.maps.Marker({
          position: position,
          map: this.state.map,
          icon: icon,
          title: title
        });
      }

      const addMarkers = (markers) => {
        this.setState({ ...this.state, markers: [...this.state.markers, ...markers] });
      }

      const removeAllMarkersFromMap = () => {
        const { map, markers } = this.state;
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        this.setState({ ...this.state, markers: [] })
      }

      directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          const leg = response.routes[0].legs[0];
          removeAllMarkersFromMap();
          const markers = []
          markers.push(makeMarker(leg.start_location, gorideCustomerMarker, "title"));
          markers.push(makeMarker(leg.end_location, gorideDriverMarker, 'title'));
          addMarkers(markers);
          directionsDisplay.setMap(map);
        }
      });
    }
    calcRoute();
    google.maps.event.addDomListener(window, 'load', calcRoute);
  }

  render() {
    return (
      <section id="member-order">
        <Map />
        <MapInputs
          onInputChange={this.onInputChange}
          clearInput={(name) => this.clearInput(name)}
          from={this.state.from}
          to={this.state.to}
          onInputFocus={this.onInputFocus}
          onInputBlur={this.onInputBlur}
          isFromFocus={this.state.isFromFocus}
          isToFocus={this.state.isToFocus}
          fromSuggestions={this.mapPlaceSuggestionsToSuggestions(this.state.fromSuggestions)}
          toSuggestions={this.mapPlaceSuggestionsToSuggestions(this.state.toSuggestions)}
        />
      </section>
    )
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
  }

  componentDidMount() {
    // GETS MEMBER INITIAL POSITION, ON SUCCESS -> STARTS TRACKING
    getCurrentPosition((pos) => {
      const mapCanvas = document.getElementById("googleMap");
      const mapOptions = getMapOptions(pos.coords.latitude, pos.coords.longitude);
      const map = new google.maps.Map(mapCanvas, mapOptions);
      const trackLocationId = trackLocation(({ coords: { latitude: lat, longitude: lng } }) => {
        this.updateMemberPosition(lat, lng)
      }
      );
      this.setState({
        ...this.state,
        map: map,
        trackLocationId: trackLocationId,
        directionsDisplay: new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true
        })
      });
      this.updateMemberPosition(pos.coords.latitude, pos.coords.longitude)
    });
    const { srcLat, srcLng, dstLat, dstLng } = this.state;
    this.mapLocation(srcLat, srcLng, dstLat, dstLng);
  }

  componentWillUnmount() {
    const { trackLocationId } = this.state;

    if(trackLocationId)
      clearLocationTrack(this.state.trackLocationId)
  }
}

export default OrderPanel;