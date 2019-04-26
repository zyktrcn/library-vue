import Vue from 'vue'
import Vuex from 'vuex'
import Book from './modules/book'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Book,
    User
  }
})
