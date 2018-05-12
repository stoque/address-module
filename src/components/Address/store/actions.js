import axios from 'axios'

const setAddressInfo = async ({ commit }, obj) => {
  const zipcode = obj.zipcode
  const url = `https://viacep.com.br/ws/${zipcode}/json/`
  const addressInfo = (await axios.get(url)).data
  commit('SET_ADDRESS_INFO', {
    addressInfo
  })
}

const setAddress = ({ commit }, obj) => {
  const address = obj
  commit('SET_ADDRESS', address)
}

const removeAddress = ({ commit }, index) => {
  if (index > -1) {
    commit('REMOVE_ADDRESS', index)
  }
}

const changeAddress = ({ commit }, obj) => {
  commit('CHANGE_ADDRESS', obj)
}

export default {
  setAddressInfo,
  setAddress,
  removeAddress,
  changeAddress
}
