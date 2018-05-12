<template>
  <ul class="address-list">
    <transition-group name="fade">
      <li
        class="item"
        :key="index"
        v-for="(address, index) in addressList"
      >
        <address-card :address="address" :index="index"/>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
import AddressCard from './AddressCard'

export default {
  components: {
    AddressCard
  },
  computed: {
    ...mapState('Address', ['addressList'])
  }
}
</script>

<style lang="sass" scoped>
.address-list
  display: flex
  flex-wrap: wrap
  flex-direction: column
  justify-content: space-between
  flex-grow: 1

  .item
    width: 100%
    margin: 0 0 20px
</style>
