<template>
  <!-- <div class="post" v-for="post in posts">
    <div><strong>Name: {{ post.title }}</strong></div>
    <div><strong>Description: {{ post.body }}</strong></div>
  </div> -->

  <!--   v-if     будет полностью удалять то, что не соответствует условию -->
  <!--   v-show   будет просто скрывать -->
  <div v-if="posts.length > 0">
    <h3>Posts list</h3>

    <TransitionGroup name="post-list">
      <PostItem v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
    </TransitionGroup>
  </div>

  <h2 v-else style="color: red">
    List is empty
  </h2>
</template>

<script>
import { TransitionGroup } from 'vue';
import PostItem from './PostItem.vue';

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  components: { PostItem, TransitionGroup }
}
</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-form,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.4s ease;
}
</style>