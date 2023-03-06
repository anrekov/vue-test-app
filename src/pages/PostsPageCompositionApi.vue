<template>
  <div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>

    <h1>Posts page</h1>

    <my-input v-focus v-model="searchQuery" />

    <div class="app__btns">
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <PostList :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />

    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'

export default {
  components: { PostForm, PostList },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'By name' },
        { value: 'body', name: 'By description' },
      ],
    }
  },
  setup(props) {
    const {
      posts,
      isPostsLoading,
      totalPages
    } = usePosts(10)

    const { selectedSort, sortedPosts } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      isPostsLoading,
      totalPages,
      selectedSort,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
  }
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
