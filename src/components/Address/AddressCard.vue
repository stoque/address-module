<template>
  <div>
    <div class="address-card">
      <div class="info-wrapper">
        <p class="street">{{ address.street }}, {{  address.number  }} {{ address.complement }}</p>
        <p class="neighborhood">{{ address.neighborhood }}</p>
        <p class="city">{{ address.city }} - {{ address.state }}</p>
      </div>

      <div class="distance-wrapper">
        <p class="text">Aprox. {{ formatedDistance }} de distância</p>
        <a class="link" :href="mapRouteSrc" target="_blank">Clique para abrir a rota</a>
      </div>

      <div class="weather-wrapper">
        <p class="title">Temperatura:</p>
        <p class="temp">{{ formatedTemp }}</p>
        <img class="icon" :src="iconSrc">
        {{ user.latitude }} {{ user.longitude }}
      </div>

      <div class="actions-wrapper">
        <button class="btn btn-primary" @click="edit = edit ? false : true">Alterar</button>
        <button class="btn btn-danger" @click="remove">Remover</button>
      </div>
    </div>

    <transition name="fade">
      <form @submit.prevent="change" v-if="edit" class="form-edit">
        <h4>Alteração de endereço</h4>
        <div class="form-group">
          <label for="address">Endereco</label>
          <input
            class="form-control"
            v-model="newInfos.street"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="address">Número</label>
          <input
            class="form-control"
            v-model="newInfos.number"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="address">Complemento</label>
          <input
            class="form-control"
            v-model="newInfos.complement"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="address">Bairro</label>
          <input
            class="form-control"
            v-model="newInfos.neighborhood"
            type="text"
          >
        </div>
        <div class="form-group">
          <label for="address">Cidade</label>
          <input
            class="form-control"
            v-model="newInfos.city"
            type="text"
          >
        </div>
        <button class="btn btn-primary btn-block">Enviar</button>
      </form>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getDistance } from '@/helpers/distance'

export default {
  created () {
    this.calculeDistance()
  },
  updated () {
    this.calculeDistance()
  },
  data () {
    return {
      edit: false,
      newInfos: {
        street: this.address.street,
        number: this.address.number,
        complement: this.address.complement,
        neighborhood: this.address.neighborhood,
        city: this.address.city
      },
      position: {
        latitude: this.address.latitude,
        longitude: this.address.longitude
      },
      distance: null
    }
  },
  computed: {
    ...mapState('Address', ['user']),
    formatedDistance () {
      const distance = this.distance
      return distance ? distance.toFixed() + ' km' : ''
    },
    formatedTemp () {
      const temp = this.address.weather.temp.toFixed(1)
      return `${temp} °С`
    },
    userLocation () {
      return this.user.location
    },
    iconSrc () {
      return `https://openweathermap.org/img/w/${this.address.weather.icon}.png`
    },
    mapRouteSrc () {
      const userLocation = this.userLocation
      const lat = this.address.latitude
      const lon = this.address.longitude
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${lat},${lon}&travelmode=driving`
    }
  },
  props: ['address', 'index'],
  methods: {
    ...mapActions('Address', [
      'removeAddress',
      'changeAddress'
    ]),
    remove () {
      this.removeAddress(this.index)
    },
    change () {
      const { address } = this
      const newInfos = this.newInfos
      this.changeAddress({address, newInfos})
      this.edit = false
    },
    calculeDistance () {
      const address = this.address
      this.distance = getDistance(address.latitude, address.longitude, this.userLocation.latitude, this.userLocation.longitude)
    }
  }
}
</script>

<style lang="sass" scoped>
.address-card,
.form-edit
  background: #fff
  border-left: 4px solid #2980b9
  color: #7f8c8d
  padding: 20px

.address-card
  border-radius: 4px 4px 0 0

.form-edit
  border-radius: 0 0 4px 4px

.address-card
  padding: 20px
  transition: box-shadow 0.4s ease-in-out, border-left 0.1s

  > .info-wrapper
    margin: 0 0 10px 0

    > .street
      font-size: 20px
      font-weight: bold

  > .distance-wrapper
    > .link
      color: #3498db
      text-decoration: underline

  > .weather-wrapper
    display: flex
    align-items: center

    > .title
      margin: 0 10px 0 0

  > .actions-wrapper
    margin: 10px 0 0
</style>
