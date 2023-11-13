import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const iconUrl = `https://openweathermap.org/img/wn/`
const apiKey = import.meta.env.VITE_API_KEY;

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}
const getOne = (id) => {
  const request = axios.get(`${baseUrl}/name/${id}`)
  return request.then(response => response.data)
}

const getWeather = (cityName) => {
  const request = axios.get(`${weatherUrl}` + `${cityName}` + `&appid=${apiKey}&units=metric`)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll,
  getOne: getOne,
  getWeather: getWeather,
}