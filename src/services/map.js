const google = window.google;

exports.getCurrentPosition = (onSuccess, onError = () => { }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

exports.trackLocation = (onSuccess, onError = () => { }) => {
  if ('geolocation' in navigator === false) {
    return onError(new Error('Geolocation is not supported by your browser.'));
  }

  return navigator.geolocation.watchPosition(onSuccess, onError);
};

exports.clearLocationTrack = trackLocationId => { navigator.geolocation.clearWatch(trackLocationId) }

exports.getMapOptions = (lat, lng, zoom = 17) => {
  return { 
    center: new google.maps.LatLng(lat, lng), 
    zoom: zoom }
}

exports.position = (lat, lng) => ({lat: lat, lng: lng})

exports.createMarker = (lat, lng, map, icon=undefined, title="", cb=undefined) => {
  const marker = new google.maps.Marker({
    position: {lat, lng},
    icon: icon,
    map: map,
    title: title
  });

  if(cb)
    cb(marker);
}

exports.clearMarkersFromMap = (markers, cb=undefined) => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

  if(cb)
    cb();
}