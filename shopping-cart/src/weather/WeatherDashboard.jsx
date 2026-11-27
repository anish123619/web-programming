import { useState, useEffect } from 'react';

// weather_code -> [icon, description]
const WEATHER_CODES = {
  0: ['☀️', 'Clear sky'],
  1: ['🌤️', 'Mainly clear'],
  2: ['⛅', 'Partly cloudy'],
  3: ['☁️', 'Overcast'],
  45: ['🌫️', 'Fog'],
  48: ['🌫️', 'Freezing fog'],
  51: ['🌦️', 'Light drizzle'],
  53: ['🌦️', 'Drizzle'],
  55: ['🌦️', 'Heavy drizzle'],
  61: ['🌧️', 'Light rain'],
  63: ['🌧️', 'Rain'],
  65: ['🌧️', 'Heavy rain'],
  66: ['🌧️', 'Freezing rain'],
  67: ['🌧️', 'Heavy freezing rain'],
  71: ['🌨️', 'Light snow'],
  73: ['🌨️', 'Snow'],
  75: ['❄️', 'Heavy snow'],
  77: ['❄️', 'Snow grains'],
  80: ['🌦️', 'Light showers'],
  81: ['🌧️', 'Showers'],
  82: ['⛈️', 'Violent showers'],
  85: ['🌨️', 'Snow showers'],
  86: ['🌨️', 'Heavy snow showers'],
  95: ['⛈️', 'Thunderstorm'],
  96: ['⛈️', 'Thunderstorm with hail'],
  99: ['⛈️', 'Thunderstorm with heavy hail'],
};

function describe(code) {
  return WEATHER_CODES[code] || ['🌡️', 'Unknown'];
}

function WeatherDashboard() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState({ city: 'Seoul' }); // what to look up
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs again whenever `search` changes
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      setWeather(null);

      try {
        let lat, lon, placeName;

        if (search.city) {
          // Step 1: city name -> coordinates
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search.city)}&count=1`,
            { signal: controller.signal }
          );
          if (!geoRes.ok) throw new Error('Could not look up the city');
          const geo = await geoRes.json();
          if (!geo.results || geo.results.length === 0) {
            throw new Error(`City "${search.city}" not found`);
          }
          const place = geo.results[0];
          lat = place.latitude;
          lon = place.longitude;
          placeName = place.country ? `${place.name}, ${place.country}` : place.name;
        } else {
          // Coordinates came from the "Use my location" button
          lat = search.lat;
          lon = search.lon;
          placeName = 'Your location';
        }

        // Step 2: coordinates -> weather
        const url =
          'https://api.open-meteo.com/v1/forecast' +
          `?latitude=${lat}&longitude=${lon}` +
          '&current=temperature_2m,wind_speed_10m,weather_code';
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Could not load the weather');
        const data = await res.json();

        setWeather({
          placeName,
          temperature: data.current.temperature_2m,
          wind: data.current.wind_speed_10m,
          code: data.current.weather_code,
        });
        setLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') return; // an old request was cancelled
        setError(err.message);
        setLoading(false);
      }
    }

    load();
    return () => controller.abort(); // cancel the old request
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    const city = input.trim();
    if (!city) return;
    setSearch({ city });
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setError('Your browser does not support location');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => setSearch({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setError('Could not get your location. Did you allow access?')
    );
  }

  return (
    <div className="weather">
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="City name, e.g. Busan"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleLocate}>Use my location</button>
      </form>

      {loading && <p className="gh-status">Loading...</p>}
      {error && <p className="gh-error">{error}</p>}

      {weather && !loading && (
        <div className="weather-card">
          <h3>{weather.placeName}</h3>
          <div className="weather-icon">{describe(weather.code)[0]}</div>
          <p className="weather-desc">{describe(weather.code)[1]}</p>
          <p className="weather-temp">{weather.temperature} °C</p>
          <p>Wind: {weather.wind} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;