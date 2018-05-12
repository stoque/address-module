import Vue from 'vue'
import Vuex from 'vuex'
import Address from '@/components/Address/store'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modules = {
  Address
}

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState()]
})
