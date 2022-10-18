function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 14.569366908826524, lng: 75.50921803038591 }, 
    mapId: "3502faf1968bd0b4",
  });
  // Set LatLng and title text for the markers. The first marker (Mukka Beach)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  const tourStops = [
    {
      position: { lat: 13.04842558809294, lng: 74.83565185599305 }, 
      title: "Mukka Beach",
      loc: "https://goo.gl/maps/RcXQmxjeUSVdifzX8",
      img:"https://lh5.googleusercontent.com/p/AF1QipO1IIsTy23XCmTEHmttHbxpUnvDMFEmmcNRX_ML=w408-h306-k-no",
    },
    {
      position: { lat: 13.143393375311181, lng: 74.9935803171578 }, 
      title: "Sammilan Shetty's Butterfly Park",
      loc:"https://goo.gl/maps/Ud9qF8sKXFfxKfPp6",
      img:"https://lh5.googleusercontent.com/p/AF1QipPG-WFCRc0aIREpvBE1BQ8qig2E84iVAthT3xRX=w421-h240-k-no",
    },
    
  ];
  // Create an info window to share between markers.
  const infoWindow = new google.maps.InfoWindow();
  

  // Create the markers.
  tourStops.forEach(({ position, title }, i) => {
    const pinView = new google.maps.marker.PinView({
      glyph: `${i + 1}`,
    });
    const marker = new google.maps.marker.AdvancedMarkerView({
      position,
      map,
      title: `${i + 1}. ${title}`,
      content: pinView.element,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent("<center><div style = 'width:250px;min-height:40px'><img src='" + tourStops[i].img + "' style='width:100%'><br><h3><b>" + marker.title + "</b></h3></div><a href = '" + tourStops[i].loc + "' target = '_blank'><button style ='border: 2px solid #2196F3; background-color: white; color: dodgerblue; padding: 7px 14px; font-size: 16px; cursor: pointer; border-radius: 25px; cursor: pointer;'> Get Direction </button></a></center>");
      infoWindow.open(marker.map, marker);
    });
  });

  const locationButton = document.createElement("button");

  locationButton.textContent = "Your Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

window.initMap = initMap;