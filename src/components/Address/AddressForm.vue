<template>
  <div>
    <form @submit.prevent="addAddress" class="address-form">
      <div class="form-group">
        <label for="zipcode">CEP:</label>
        <input
          class="form-control"
          :class="zipcodeInputClass"
          id="zipcode"
          @keydown="$v.zipcode.$touch()"
          @keyup="getAddressInfo()"
          placeholder="Digite o CEP"
          type="text"
          v-mask="'##.###-###'"
          v-model="zipcode"
        >
      </div>

      <div class="address-complement" v-show="!$v.zipcode.$invalid && addressInfo.street">
        <div class="infos-wrapper">
          <p class="address">{{ addressInfo.street }},</p>
          <p class="neighborhood">{{ addressInfo.neighborhood }},</p>
          <p class="city">{{ addressInfo.city }} - {{ addressInfo.state }}</p>
        </div>

        <div class="form-group">
          <label for="number">Número:</label>
          <input
            class="form-control"
            :class="{'is-invalid': $v.number.$error, 'is-valid': !$v.number.$error && $v.number.$dirty}"
            id="number"
            @keydown="$v.number.$touch()"
            type="text"
            v-model="number"
          >
        </div>

        <div class="form-group">
          <label for="complement">Complemento:</label>
          <input
            class="form-control"
            id="complement"
            type="text"
            v-model="complement"
          >
        </div>

        <button
          class="btn btn-primary btn-block"
          :disabled="!isFormValid"
        >
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      zipcode: '',
      number: null,
      complement: null
    }
  },
  computed: {
    ...mapState('Address', ['addressInfo']),
    isFormValid () {
      return !this.$v.$invalid
    },
    cleanZipcode () {
      return this.zipcode.replace(/[.-]/g, '')
    },
    zipcodeInputClass () {
      const form = this.$v
      if (form.zipcode.$dirty && (form.zipcode.$invalid || !this.addressInfo.street)) {
        return 'is-invalid'
      } else if (form.zipcode.$dirty) {
        return 'is-valid'
      }
    }
  },
  validations: {
    zipcode: {
      required,
      minLength: minLength(10)
    },
    number: {
      required
    }
  },
  methods: {
    ...mapActions('Address', ['setAddressInfo', 'setAddress']),
    getAddressInfo () {
      if (this.$v.zipcode) {
        this.setAddressInfo({ zipcode: this.cleanZipcode })
      }
    },
    addAddress () {
      if (this.isFormValid) {
        this.addressInfo.number = this.number
        this.addressInfo.complement = this.complement ? this.complement : ''
        this.clearForm()
        this.setAddress(this.addressInfo)
      }
    },
    clearForm () {
      this.zipcode = ''
      this.street = ''
      this.number = ''
      this.complement = ''
      this.$v.$reset()
    }
  }
}
</script>

<style lang="sass" scoped>

.address-form
  margin: 0 auto 20px auto
  max-width: 600px

  @media ('min-width: 1024px')
    width: 400px
    margin: 0 40px 0 0

  > .address-complement
    > .infos-wrapper
      margin: 0 0 1rem

      > .address
        font-size: 14px
        font-weight: bold

      > .neighborhood,
      > .city
        font-size: 12px
</style>
