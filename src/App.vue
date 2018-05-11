<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass">
@import '../node_modules/bootstrap/scss/bootstrap.scss'

*,
*:before,
*:after
  box-sizing: border-box
  margin: 0
  padding: 0

</style>
