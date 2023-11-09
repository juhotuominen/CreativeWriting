import { useState, useEffect } from 'react';
import countryService from '../services/countries';

const CountryDetail = (id) => {
  const [country, setCountry] = useState({});

  useEffect(() => {
    countryService.getOne(id.id).then(initialCountry => {
      setCountry(initialCountry);
    });
  }, [id.id]);

  if (!country || Object.keys(country).length === 0) {
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
      <img src={country.flags.png} alt="Country Flag" style={{maxHeight: 200, maxWidth: 200}} />
    </div>
  );
};

export default CountryDetail;
