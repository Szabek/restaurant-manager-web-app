import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './axiosDefaults'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import { ValidationProvider, extend, localize } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate'
import pl from 'vee-validate/dist/locale/pl.json'
import * as rules from 'vee-validate/dist/rules'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CoreuiVue)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

localize('pl', pl)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('auth/SET_USER_DATA', userData)
    }
  },
  render: h => h(App)
}).$mount('#app')
