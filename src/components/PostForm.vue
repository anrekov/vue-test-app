<template>
  <form @submit.prevent>
    <h4>Create a post</h4>

    <!-- @input - different ways to change value -->
    <!-- v-bind:value="title" -->
    <!-- <input class="input" type="text" placeholder="name" v-bind:value="post.title" @input="inputTitle" />

    <input class="input" type="text" placeholder="description" v-bind:value="post.body"
      @input="post.body = $event.target.value" /> -->

    <!-- New way to connect input and state -->
    <!-- <my-input placeholder="name" v-model="post.title" /> -->
    <my-input v-focus placeholder="name" v-model:myCustomValue="post.title" v-model="post.title" />
    <my-input placeholder="description" v-model="post.body" />

    <MyButton class="btn" style="align-self: flex-end; margin-top: 15px;" @click="createPost">Create</MyButton>
  </form>
</template>

<script>
// import MyButton from './UI/MyButton.vue'

export default {
  // components: { MyButton },
  data() {
    return {
      post: {
        title: "",
        body: ""
      }
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post.title = "";
      this.post.body = "";
    },
    inputTitle(event) {
      this.post.title = event.target.value;
    }
  },
  watch: {
    post: {
      handler(newValue) {
        console.log('newValue', newValue)
      },
      deep: true
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
