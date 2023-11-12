import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}
const getOne = (id) => {
    console.log(`${baseUrl}/name/${id}`)
    const request = axios.get(`${baseUrl}/name/${id}`)
    return request.then(response => response.data)
    
}

export default { 
  getAll: getAll,
  getOne: getOne
}