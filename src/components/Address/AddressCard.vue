<template>
  <div>
    <div class="address-card">
      <p class="street">{{ address.street }}, {{  address.number  }} {{ address.complement }}</p>
      <p class="neighborhood">{{ address.neighborhood }}</p>
      <p class="city">{{ address.city }} - {{ address.state }}</p>

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

export default {
  data () {
    return {
      edit: false,
      newInfos: {
        street: this.address.street,
        number: this.address.number,
        complement: this.address.complement,
        neighborhood: this.address.neighborhood,
        city: this.address.city
      }
    }
  },
  computed: {
    ...mapState('Address', ['addressList'])
  },
  props: ['address', 'index'],
  methods: {
    ...mapActions('Address', [
      'setAddressInfo',
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
  padding: 20px
  transition: box-shadow 0.4s ease-in-out, border-left 0.1s

  > .actions-wrapper
    margin: 10px 0 0
</style>
