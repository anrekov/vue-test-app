import { createStore } from 'vuex'

import { postModule } from './postModule'

export default createStore({
  modules: {
    // pieces of store (mobx like stores)
    post: postModule,
  },
})
