<template>
  <div class="app">
    <my-dialog v-model:show="dialogVisible">
      <!-- <PostForm /> -->
      <post-form @create="createPost" />
    </my-dialog>

    <h1>Posts page</h1>

    <my-input v-model="searchQuery" />

    <div class="app__btns">
      <MyButton @click="showDialog">
        Add Post
      </MyButton>

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <!-- Modificators for model -->
    <!-- <input type="text" v-model.trim="modificatorValue" /> -->
    <!-- <input type="text" v-model.number="modificatorValue" /> -->
    <!-- <input type="text" v-model="modificatorValue" /> -->

    <!-- <PostList v-bind:posts="posts" /> -->
    <!-- <PostList :posts="posts" @remove='removePost' v-if="!isPostsLoading" /> -->
    <!-- <PostList :posts="sortedPosts" @remove='removePost' v-if="!isPostsLoading" /> -->
    <PostList :posts="sortedAndSearchedPosts" @remove='removePost' v-if="!isPostsLoading" />
    <div v-else>Loading...</div>

    <!-- With Pagination -->
    <!-- <div class="page__wrapper">
      <div class="page" v-for="pageNumber in totalPages" :key="pageNumber"
        :class="{ 'current-page': page === pageNumber }" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </div>
    </div> -->

    <!-- With infinity scroll -->
    <div class="observer" ref="observer" />
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
      // this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts()

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const cb = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }

    const observer = new IntersectionObserver(cb, options)

    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      console.log('this.posts', this.posts);
      console.log('this.selectedSort', this.selectedSort);
      // console.log('QQ', this.posts[0]?.[this.selectedSort]?.localeCompare(this.posts[1]?.[this.selectedSort]))
      // TODO Doesn't work!!!
      // return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
      return this.posts
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    //   selectedSort(newValue) {
    //     this.posts.sort((post1, post2) => post1[newValue]?.localeCompare(post2[newValue]));
    //   }
    // page() { // pagination
    //   this.fetchPosts()
    // }
  }
} 
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0
}

/* .page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
} */

.observer {
  height: 30px;
  background-color: red;
}
</style>