const SET_ADDRESS_INFO = (state, obj) => {
  state.addressInfo = obj.addressInfo
  state.addressInfo = {
    street: obj.addressInfo.logradouro,
    neighborhood: obj.addressInfo.bairro,
    city: obj.addressInfo.localidade,
    state: obj.addressInfo.uf
  }
}

const SET_ADDRESS = (state, obj) => {
  const address = obj
  state.addressList.push(address)
}

const REMOVE_ADDRESS = (state, index) => {
  state.addressList.splice(index, 1)
}

const CHANGE_ADDRESS = (state, obj) => {
  obj.address.street = obj.newInfos.street
  obj.address.neighborhood = obj.newInfos.neighborhood
  obj.address.number = obj.newInfos.number
  obj.address.complement = obj.newInfos.complement
  obj.address.city = obj.newInfos.city
  obj.address.latitude = obj.newInfos.latitude
  obj.address.longitude = obj.newInfos.longitude
}

const SET_USER_LOCATION = (state, position) => {
  state.user.location = {
    latitude: position.latitude,
    longitude: position.longitude
  }
}

export default {
  SET_ADDRESS_INFO,
  SET_ADDRESS,
  REMOVE_ADDRESS,
  CHANGE_ADDRESS,
  SET_USER_LOCATION
}
