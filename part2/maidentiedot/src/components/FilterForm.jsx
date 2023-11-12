import React, { useState } from 'react';
import CountryDetail from './CountryDetail';

const FilterForm = ({ filter }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowClick = (countryName) => {
    setSelectedCountry(countryName);
  };

  if (filter.list.length === 1) {
    return <CountryDetail id={filter.list[0].name.common.toLowerCase()} />;
  } else if (filter.list.length < 10) {
    return (
      <div>
        <ul>
          {filter.query === ''
            ? ''
            : filter.list.map((country) => (
                <li key={country.name.common}>
                  {country.name.common}{' '}
                  <button onClick={() => handleShowClick(country.name.common)}>
                    Show
                  </button>
                </li>
              ))}
        </ul>
        {selectedCountry && (
          <CountryDetail id={selectedCountry.toLowerCase()} />
        )}
      </div>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default FilterForm;


