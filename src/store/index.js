import { createStore } from 'vuex'

export default createStore({
  state: {
    // value
    likes: 1,
    isAuth: false,
  },
  getters: {
    // computed
    doubleLikes(state) {
      return state.likes * 2
    },
  },
  mutations: {
    // change state
    incrementLikes(state) {
      state.likes += 1
    },
    decrementLikes(state) {
      state.likes -= 1
    },
  },
  actions: {
    // func with side effects + mutations
  },
  modules: {
    // pieces of store (mobx like stores)
  },
})
