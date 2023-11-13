import { useState, useEffect } from 'react';
import countryService from '../services/countries';

const CountryDetail = ({ id }) => {
  const [country, setCountry] = useState({})
  const [weather, setWeather] = useState({})
  

  useEffect(() => {
    countryService
      .getOne(id).then(initialCountry => {
      setCountry(initialCountry)

      const cityName = initialCountry.capital
      countryService
        .getWeather(cityName).then(initialWeather => {
        setWeather(initialWeather)
      })
    })
  }, [id])

  if (!country || Object.keys(country).length === 0 || Object.keys(weather).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country Flag" style={{ maxHeight: 200, maxWidth: 200 }} />
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryDetail







