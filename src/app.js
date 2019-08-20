import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.prototype.$apiLink = 'https://swapi.co/api/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(Vuex)
