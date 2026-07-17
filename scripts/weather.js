const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL with coordinates for Aguas Calientes, Ureña, Táchira, Venezuela
// Coordinates: 7.9176° N, -72.4309° W
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=7.9176&lon=-72.4309&units=metric&appid=103a79523007d732c60060e234217768';

// Base del CDN de Meteocons (estilo "fill")
const METEOCONS_BASE = 'https://cdn.jsdelivr.net/gh/basmilius/weather-icons@dev/production/fill/svg';

// Mapeo de códigos de icono de OpenWeatherMap -> nombres de archivo de Meteocons
const meteoconsMap = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'overcast-day',
  '04n': 'overcast-night',
  '09d': 'overcast-drizzle',
  '09n': 'overcast-drizzle',
  '10d': 'partly-cloudy-day-rain',
  '10n': 'partly-cloudy-night-rain',
  '11d': 'thunderstorms-day-overcast',
  '11n': 'thunderstorms-night-overcast',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'fog-day',
  '50n': 'fog-night'
};

// Helper function to convert a string to Title Case
function toTitleCase(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // Display temperature in Celsius, rounded to 0 decimal places
  currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;C`;

  // Get weather icon code and map it to the corresponding Meteocons (fill) file
  const iconCode = data.weather[0].icon;
  const iconFile = meteoconsMap[iconCode] || 'not-available';
  const iconsrc = `${METEOCONS_BASE}/${iconFile}.svg`;

  // Format description in Title Case
  const desc = toTitleCase(data.weather[0].description);

  // Set weather icon properties
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);

  // Set the description text
  captionDesc.textContent = desc;
}

apiFetch();