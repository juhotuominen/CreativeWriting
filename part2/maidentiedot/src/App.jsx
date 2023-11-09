import { useState, useEffect } from 'react'

import FilterForm from './components/FilterForm';
import countryService from './services/countries'

function App() {

  const [filter, setFilter] = useState({
    query: '',
    list: []
  })

  const [countries, setCountries] = useState('')
  
  useEffect(() => {
    countryService
      .getAll()
        .then(initialCountries=> {
        setCountries(initialCountries)
      })
  }, [])
  
  
  const handleFilterChange = (e) => {
    const results = countries.filter(country => {
        if (e.target.value === "") return countries
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilter({
        query: e.target.value,
        list: results
    })
}



  return (
    <div>
      <form>
        filter countries: <input onChange={handleFilterChange} value={filter.query} type="search"/>
      </form>
      <FilterForm filter={filter} />
    </div>
  )
}

export default App
