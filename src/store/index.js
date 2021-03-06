import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/components/firebaseInit'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOpen : true,
    productSort : "date_new",
    productFilter : "",
    showPreloader: true,
    searchProduct: "",
    currentFiltred: [],
    gridState : "line",
    fields_data: [],
    error: null,
    products: [],
  },
  mutations: {
    SET_FIELDS_TO_STATE: (state, fields_data) => {
      state.fields_data = fields_data
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    GET_FIELDS_FROM_BD({commit}){
      return db.collection('fields').get().then(querySnapshot => {
        var fields = []
        querySnapshot.forEach(doc => {  
          fields = doc.data().fields_setings
        });
        commit('SET_FIELDS_TO_STATE', fields)
      })
    },
    GET_PRODUCTS_FROM_BD({commit}){
      return db.collection('products').get().then(querySnapshot => {
        var products = []
        querySnapshot.forEach(doc => { 
          products.push(doc.data())
        });
        commit('SET_PRODUCTS_TO_STATE', products)
      })
    },
  },
  getters:{
    FIELDS(state){
      return state.fields_data
    },
    PRODUCTS(state){
      return state.products
    },
    error: s => s.error
  },
  modules: {
    auth
  }
})
