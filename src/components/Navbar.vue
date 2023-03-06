<template>
  <div class="navbar">
    <div @click="$router.push('/')" style='cursor: pointer'>Vue 3</div>

    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Post</MyButton>
      <MyButton @click="$router.push('/about')" style="margin-left: 20px">About</MyButton>
      <MyButton @click="$router.push('/store')" style="margin-left: 20px">Posts + Store</MyButton>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>