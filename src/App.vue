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

p
  margin: 0

ul,
li
  list-style: none

body
  background: #ecf0f1

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.list-complete-item
  transition: all 1s
  display: inline-block
  margin-right: 10px

.list-complete-enter, .list-complete-leave-to
  opacity: 0
  transform: translateY(30px)

.list-complete-leave-active
  position: absolute
</style>
