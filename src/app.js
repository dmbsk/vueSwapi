import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.prototype.$apiLink = 'https://swapi.co/api/'
/* eslint-disable-next-line no-new */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
