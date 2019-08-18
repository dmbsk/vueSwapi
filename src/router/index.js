import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home'
import Film from '../pages/Film'

Vue.use(Router)

const routes = [
  {
    path: '*',
    component: Home
  },
  {
    path: '/films/:title',
    name: 'film',
    component: Film,
    props: true
  }
]

export default new Router({
  routes
})
