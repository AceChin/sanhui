import Vue from 'vue'
import Vuex from 'vuex'

// import app from './modules/app'
import user from './modules/user'
import getters from "./getters"

Vue.use(Vuex)

var store = new Vuex.Store({
  modules:{
    app:app,
    user:user
  },
  getters
})
export default store
