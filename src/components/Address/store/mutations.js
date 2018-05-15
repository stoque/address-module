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
  const newAddress = obj.newInfos
  const address = obj.address
  for (const prop in newAddress) {
    address[prop] = newAddress[prop]
  }
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
