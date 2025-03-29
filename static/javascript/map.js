let map;
let directionsService;
let directionsRenderer;

function toRadians(deg) {
  return deg * Math.PI / 180;
}

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



async function initMap1() {
    // The location of Uluru
    const incline = { lat: 40.4399, lng: -80.0176 };
    const park = {lat: 40.44167, lng: -80.01194}
    const marketSquare = {lat: 40.4417, lng: -80.0031}
    const PPG = {lat: 40.4406, lng: -80.0009}

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    let mapOptions = {
      zoom: 16,
      center: park,
      mapId: "250-WEBDEV",
    };
    map = new Map(document.getElementById('map'), mapOptions);

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
    const marker2 = new AdvancedMarkerElement({
      map,
      position: park,
      title: 'Point State Park',
    });

    const marker3 = new AdvancedMarkerElement({
      map,
      position: marketSquare,
      title: 'Market Square',
    });

    const marker4 = new AdvancedMarkerElement({
      map,
      position: PPG,
      title: 'PPG Place',
    });
}


async function initMap2(mapID, origin, mapCenter, zoomLevel) {
  // The location of Uluru
  const incline = { lat: 40.4399, lng: -80.0176 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  let mapOptions = {
    zoom: zoomLevel,
    center: mapCenter,
    mapId: "250-WEBDEV",
  };
  const mainPin = new PinElement({
    scale: 2.5,
    background: "#D77054",
    borderColor: '#353851',
    glyphColor: '#353851',
  });

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


const successCallback = (position) => {
  const { latitude, longitude } = position.coords;
  const incline = { lat: 40.4399, lng: -80.0176 };

  const MAPCENTER = { 
    lat: (latitude + incline.lat) / 2, 
    lng: (longitude + incline.lng) / 2 
  };

  const distance = haversineDistance(latitude, longitude, incline.lat, incline.lng);
  
  const zoomLevel = calculateZoomLevel(distance);
  initMap2('map2', { lat: latitude, lng: longitude }, MAPCENTER, zoomLevel);
};

const errorCallback = (error) => {
  console.error(error);
}
initMap1();
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);