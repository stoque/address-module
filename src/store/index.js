import Vue from 'vue'
import Vuex from 'vuex'
import Address from '@/components/Address/store'

Vue.use(Vuex)

const modules = {
  Address
}

export default new Vuex.Store({
  modules
})
