import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/store/modules/auth'
import * as unit from '@/store/modules/unit'
import * as category from '@/store/modules/category'
import * as ingredient from '@/store/modules/ingredient'
import * as table from '@/store/modules/table'
import * as user from  '@/store/modules/user'
import * as dish from '@/store/modules/dish'
import * as order from '@/store/modules/order'
import * as statistic from '@/store/modules/statistic'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
  },
  getters: {
  },
  mutations: {
    toggleSidebarDesktop(state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
      state[variable] = value
    }
  },
  actions: {
  },
  modules: {
    auth,
    unit,
    category,
    ingredient,
    table,
    user,
    dish,
    order,
    statistic
  }
})
