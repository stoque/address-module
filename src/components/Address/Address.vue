<template>
  <div class="address">
    <h1 class="title">Address Register</h1>

    <div class="content">
      <address-form/>
      <address-list/>
    </div>
  </div>
</template>

<script>
import AddressForm from './AddressForm'
import AddressList from './AddressList'

export default {
  components: {
    AddressForm,
    AddressList
  }
}
</script>

<style lang="sass" scoped>
.address
  max-width: 1200px
  margin: 20px auto

  > .title
    color: #3498db
    margin: 0 0 20px
    text-align: center

  > .content
    padding: 0 20px

    @media ('min-width: 1024px')
      display: flex
</style>
