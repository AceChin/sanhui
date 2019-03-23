import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import user from './user'
import administrator from './administrator'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    home,
    ...user,
    administrator,
  ]
})
