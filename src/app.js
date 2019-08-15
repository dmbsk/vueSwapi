import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* eslint-disable-next-line no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
