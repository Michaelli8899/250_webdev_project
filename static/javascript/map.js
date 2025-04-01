
// Reference: https://developers.google.com/maps/documentation/javascript/load-maps-js-api
let map;

// convert degrees to radians
function toRadians(deg) {
  return deg * Math.PI / 180;
}

// Haversine formula to calculate distance between two points on the Earth
// given their latitude and longitude
// Reference: https://en.wikipedia.org/wiki/Haversine_formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Function to calculate zoom level based on distance
// Reference: https://stackoverflow.com/questions/9356724/google-map-api-zoom-range
function calculateZoomLevel(distance) {
  const distanceMeters = distance * 1000;

  const mapElement = document.getElementById('map2');
  const mapWidth = mapElement ? mapElement.offsetWidth : 800;
  
  const WORLD_DIM = { width: 256, height: 256 };
  const earthCircumference = 40075016.686;
  const ZOOM_MAX = 21;
  
  const resolutionAtZoom0 = earthCircumference / WORLD_DIM.width;
  
  const paddingFactor = 1.2;
  let zoom = Math.log2((mapWidth * resolutionAtZoom0) / (distanceMeters * paddingFactor));
  
  zoom = Math.min(Math.max(zoom, 0), ZOOM_MAX);
  console.log(zoom);
  return Math.floor(zoom);
}


// Function to initialize the map
// Reference: https://developers.google.com/maps/documentation/javascript/load-maps-js-api
// Reference: https://developers.google.com/maps/documentation/javascript/examples/streetview-overlays

async function initMap1() {
    // The location of incline
    const incline = { lat: 40.440354, lng: -80.016899 };
    // center on the park to display downtown pittsburgh on map
    const park = {lat: 40.44167, lng: -80.01194}

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    let mapOptions = {
      zoom: 16,
      center: park,
      mapId: "250-WEBDEV",
    };
    // set map
    map = new Map(document.getElementById('map'), mapOptions);

    // set street view
    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById("map"),
      {
        position: incline,
        pov: {
          heading: 240,
          pitch: 10,
        },
      },
    );

    // set the map to street view
    map.setStreetView(panorama);

    const mainPin = new PinElement({
      scale: 2.5,
      background: "#D77054",
      borderColor: '#353851',
      glyphColor: '#353851',
    });

    const marker = new AdvancedMarkerElement({
      map,
      position: incline,
      title: 'THE INCLINE!',
      content: mainPin.element,
    });

}

// Function to initialize the map
// Reference: https://developers.google.com/maps/documentation/javascript/load-maps-js-api
async function initMap2(mapID, origin, mapCenter, zoomLevel) {
  // The location of incline
  const incline = { lat: 40.4399, lng: -80.0176 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  // set map options
  let mapOptions = {
    zoom: zoomLevel,
    center: mapCenter,
    mapId: "250-WEBDEV",
  };

  // customize pin
  const mainPin = new PinElement({
    scale: 2.5,
    background: "#D77054",
    borderColor: '#353851',
    glyphColor: '#353851',
  });

  // initialize map and markers
  map = new Map(document.getElementById(mapID), mapOptions);
  const marker = new AdvancedMarkerElement({
    map,
    position: origin,
    title: 'HERE YOU ARE!',
    
  });
  const marker2 = new AdvancedMarkerElement({
    map,
    position: incline,
    title: 'Incline',
    content: mainPin.element,
  });
}

// Reference: https://www.youtube.com/watch?v=916M64DuRnk
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
const successCallback = (position) => {
  // get the current location of the user
  const { latitude, longitude } = position.coords;
  // incline coordinates
  const incline = { lat: 40.4399, lng: -80.0176 };

  // find the center between two points
  const MAPCENTER = { 
    lat: (latitude + incline.lat) / 2, 
    lng: (longitude + incline.lng) / 2 
  };

  // calculate the distance between the two points
  const distance = haversineDistance(latitude, longitude, incline.lat, incline.lng);
  
  // calculate the zoom level based on the distance
  const zoomLevel = calculateZoomLevel(distance);

  // initialize map if success
  initMap2('map2', { lat: latitude, lng: longitude }, MAPCENTER, zoomLevel);
};

// error detection
const errorCallback = (error) => {
  console.error(error);
}
// initialize map
initMap1();

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);