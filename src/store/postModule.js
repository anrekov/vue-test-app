import axios from 'axios'

export const postModule = {
  // Better to use with cb
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: 'id',
    sortOptions: [
      { value: 'title', name: 'By name' },
      { value: 'body', name: 'By description' },
    ],
    searchQuery: '',
    page: 1,
    limit: 10,
    totalPages: 0,
  }),

  getters: {
    sortedPosts(state) {
      // return [...state.posts].sort((post1, post2) =>
      //   post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      // )
      return [...state.posts]
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    },
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
  },

  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        )
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', response.data)
      } catch (e) {
        console.error('Error', String(e))
      } finally {
        // state.isPostsLoading = false
        commit('setLoading', false)
      }
    },

    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1)

        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        )
        // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        // this.posts = [...this.posts, ...response.data]
        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        )
        commit('setPosts', [...state.posts, ...response.data])
      } catch (e) {
        console.error('Error', String(e))
      }
    },
  },
  // To use prefix post/...
  namespaced: true,
}
