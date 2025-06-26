import React, { useState } from 'react';

const apiKey = '44c589f849cc6e1fa537df3bbc6fc11d';

function WeatherApp() {
  const [place, setPlace] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError('Place not found. Please try again!');
      }
    } catch {
      setError('Something went wrong. Try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="weather-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
        alt="Weather Icon"
        style={{ width: 80, marginBottom: 16, animation: 'popIn 1s' }}
      />
      <div className="weather-title">🌤️ Welcome to ClimateCast!</div>
      <div style={{ marginBottom: 16, color: '#555', fontSize: '1.1rem' }}>
        Enter a place name to get the latest weather:
      </div>
      <input
        className="weather-input"
        type="text"
        value={place}
        onChange={e => setPlace(e.target.value)}
        placeholder="e.g. Mumbai"
        onKeyDown={e => e.key === 'Enter' && fetchWeather()}
        disabled={loading}
      />
      <button
        className="weather-btn"
        onClick={fetchWeather}
        disabled={loading || !place}
        style={{ marginTop: 8 }}
      >
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
      {error && (
        <div className="weather-result" style={{ color: 'red', animation: 'fadeIn 1s' }}>
          {error}
        </div>
      )}
      {weather && (
        <div
          className="weather-result"
          style={{
            marginTop: 32,
            borderRadius: 12,
            background: 'rgba(97,218,251,0.08)',
            padding: 20,
            boxShadow: '0 2px 12px rgba(97,218,251,0.15)',
            animation: 'fadeInDown 1s'
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#21a1f3' }}>
            {weather.name}, {weather.sys.country}
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '10px 0' }}>
            {Math.round(weather.main.temp)}°C
          </div>
          <div style={{ fontSize: '1.2rem', marginBottom: 8 }}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              style={{ verticalAlign: 'middle', width: 60 }}
            />
            <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>
              {weather.weather[0].description}
            </span>
          </div>
          <div style={{ color: '#555', marginTop: 8 }}>
            Humidity: <b>{weather.main.humidity}%</b> | Wind: <b>{weather.wind.speed} m/s</b>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;