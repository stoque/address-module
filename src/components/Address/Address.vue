<template>
  <div class="address">
    <h1>Address</h1>

    <address-form/>
  </div>
</template>

<script>
import AddressForm from './AddressForm'

export default {
  components: {
    AddressForm
  }
}
</script>

<style lang="sass" scoped>
.address
  max-width: 600px
  margin: 20px auto
</style>
