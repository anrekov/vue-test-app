<template>
  <div>
    <!-- 
      v-..-event - директивы для того, чтобы вешать события 
      связано с VDOM, как я понял 
    -->
    <button v-on:click="addLike">Like</button>
    <button @click="addDislike">Dislike</button>

    <div>Likes count: <strong>{{ likes }}</strong></div>
    <div>Dislikes count: <strong>{{ dislikes }}</strong></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
    }
  },
  methods: {
    addLike() {
      this.likes += 1
    },
    addDislike() {
      this.dislikes += 1
    }
  }
} 
</script>

<!-- Flag scoped means that styles will be used only for this component (with unic suffix) -->
<style scoped>

</style>



<template>
  <div>
    <!-- 
      v-..-event - директивы для того, чтобы вешать события 
      связано с VDOM, как я понял 
    -->
    <button v-on:click="addLike">Like</button>
    <button @click="addDislike">Dislike</button>

    <div>Likes count: <strong>{{ likes }}</strong></div>
    <div>Dislikes count: <strong>{{ dislikes }}</strong></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
    }
  },
  methods: {
    addLike() {
      this.likes += 1
    },
    addDislike() {
      this.dislikes += 1
    }
  }
} 
</script>