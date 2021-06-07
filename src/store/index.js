import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen : true,
    productSort : "date_new",
    productFilter : "",
    showPreloader: true,
    searchProduct: "",
    currentFiltred: []
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
