// Function to get location data based on the provided IP address
function getLocationData(ipAddress) {
  const apiKey = 'ade16615796e8e44295f8993c369134b'; // Replace with your actual API key
  const url = `http://api.ipstack.com/${ipAddress}?access_key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Error fetching location data:', error));
}

// Function to initialize the map and display the location
function displayMap(latitude, longitude, locationData) {
  // Display map
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([latitude, longitude]).addTo(map);

  // Display location information
  const locationInfo = document.getElementById('location-info');
  locationInfo.innerHTML = `
    <h3>Location Information</h3>
    <p>Country: ${locationData.country_name}</p>
    <p>Region: ${locationData.region_name}</p>
    <p>City: ${locationData.city}</p>
    <p>Latitude: ${latitude}</p>
    <p>Longitude: ${longitude}</p>
  `;
}

// Function to handle the "Get Location" button click
function getLocationByIP() {
  const ipInput = document.getElementById('ip-input');
  const ipAddress = ipInput.value.trim();

  if (!ipAddress) {
    alert('Please enter a valid IP address.');
    return;
  }

  getLocationData(ipAddress)
    .then(locationData => {
      if (!locationData.latitude || !locationData.longitude) {
        alert('Location not found for the provided IP address.');
        return;
      }

      displayMap(locationData.latitude, locationData.longitude, locationData);
    })
    .catch(error => {
      alert('Error fetching location data. Please try again later.');
      console.error('Error fetching location data:', error);
    });
}

// Event listener to trigger the location fetching when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  const getLocationButton = document.getElementById('get-location-button');
  getLocationButton.addEventListener('click', getLocationByIP);
});
