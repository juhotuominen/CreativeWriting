import React from 'react'
import CountryDetail from './CountryDetail'

const FilterForm = ({ filter }) => {
  if(filter.list.length === 1){
    return <CountryDetail id={ filter.list[0].name.common.toLowerCase() }/>
  }
  else if(filter.list.length < 10){
    return (
      <div>
        <ul>
          {(filter.query === '' ? "" : filter.list.map(country => {
            return <li key={country.name.common}>{country.name.common}</li>
          }))}
        </ul>
      </div>
    )
  }
  else{
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}


export default FilterForm;

