<template>
  <div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <h2>{{ $store.state.isAuth ? 'User is authenticated' : 'User is not authenticated' }}</h2>
    <h2>Likes: {{ $store.state.likes }}</h2>
    <h2>Doubled: {{ $store.getters.doubleLikes }}</h2>
    <div>
      <MyButton @click="$store.commit('incrementLikes')">Like</MyButton>
      <MyButton @click="$store.commit('decrementLikes')">Dislike</MyButton>
    </div>

    <br>

    <h1>Posts page</h1>

    <my-input v-focus v-model="searchQuery" />

    <div class="app__btns">
      <MyButton @click="showDialog">
        Add Post
      </MyButton>

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <PostList :posts="sortedAndSearchedPosts" @remove='removePost' v-if="!isPostsLoading" />
    <div v-else>Loading...</div>

    <div class="observer" v-intersection="loadMorePosts" />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  components: { PostForm, PostList },
  data() {
    return {
      posts: [{ id: 1232131232, title: 'sdasd', body: 'dsadsadsd' }],
      dialogVisible: false,
      modificatorValue: '',
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
    }
  },
  methods: {
    createPost(newPost) {
      // problem in newPost, because of proxy
      this.posts.push({ ...newPost })
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Error', String(e));
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Error', String(e));
      }
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      // return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
      return this.posts
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
} 
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0
}

.observer {
  height: 30px;
  background-color: red;
}
</style>