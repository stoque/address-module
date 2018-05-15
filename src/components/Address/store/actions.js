import axios from 'axios'
import { getLanLon } from '@/helpers/distance'

const setAddressInfo = async ({ commit }, obj) => {
  const zipcode = obj.zipcode
  const url = `https://viacep.com.br/ws/${zipcode}/json/`
  const addressInfo = (await axios.get(url)).data
  commit('SET_ADDRESS_INFO', {
    addressInfo
  })
}

const setAddress = async ({ commit }, address) => {
  await setLatLon(address)
  await setWeather(address)
  commit('SET_ADDRESS', address)
}

const removeAddress = ({ commit }, index) => {
  if (index > -1) {
    commit('REMOVE_ADDRESS', index)
  }
}

const changeAddress = async ({ commit }, obj) => {
  const address = obj.newInfos
  await setLatLon(address)
  await setWeather(address)
  commit('CHANGE_ADDRESS', obj)
}

const setUserLocation = ({ commit }, latlon) => {
  commit('SET_USER_LOCATION', latlon)
}

const setLatLon = async (address) => {
  const fullAddress = `${address.street} ${address.number} ${address.city}`
  const position = await getLanLon(fullAddress)
  address.latitude = position.lat
  address.longitude = position.lon
}

const setWeather = async (address) => {
  const apiKey = '6fa0ae0ea5cef215d411b2adc5db0af2'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${address.latitude}&lon=${address.longitude}&APPID=${apiKey}`
  const data = (await axios.get(apiUrl)).data
  const temp = data.main.temp - 273
  const icon = data.weather[0].icon
  address.weather = {
    temp,
    icon
  }
}

export default {
  setAddressInfo,
  setAddress,
  removeAddress,
  changeAddress,
  setUserLocation
}
