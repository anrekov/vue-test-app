<template>
  <div>
    <!-- <h1>{{ $store.state.post.limit }}</h1> -->
    <!-- {{ $store.commit('post/setPosts') }} -->

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <h1>Posts page</h1>

    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearch" />

    <div class="app__btns">
      <MyButton @click="showDialog">
        Add Post
      </MyButton>

      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>

    <PostList :posts="sortedAndSearchedPosts" @remove='removePost' v-if="!isPostsLoading" />
    <div v-else>Loading...</div>

    <div class="observer" v-intersection="loadMorePosts" />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: { PostForm, PostList },
  data() {
    return {
      dialogVisible: false,
      // modificatorValue: '',
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearch: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),

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

    changePage(pageNumber) {
      this.page = pageNumber;
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    }),
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