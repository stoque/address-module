import axios from 'axios'

const getDistance = (lat1, lon1, lat2, lon2) => {
  const radius = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = radius * c
  return distance
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}

const getLanLon = async (address) => {
  const API_KEY = '9e1401d3feee8e'
  const url = `https://locationiq.org/v1/search.php?key=${API_KEY}&q=${address}&format=json`
  return (await axios.get(url)).data[0]
}

export {
  getDistance,
  getLanLon
}
