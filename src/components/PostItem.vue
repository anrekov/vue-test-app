<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Name: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>

    <div class="post__btns">
      <MyButton @click='$router.push(`posts/${post.id}`)'>Open</MyButton>
      <MyButton @click='$emit("remove", post)'>Delete</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';

export default {
  components: { MyButton },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
  border-radius: 12px;
}

.post__btns {
  padding: 0 8px;
  display: flex;
}

.post__btns>button:first-child {
  margin-right: 10px;
}
</style>