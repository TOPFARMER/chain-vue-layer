<template>
  <div>
    <div id="nav">
      <router-link class="button" :disabled="$route.path === '/join'" to="/join">注册</router-link>
      <router-link class="button" :disabled="$route.path === '/login'" to="/login">登陆</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HelloWorld"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 20px 0;
}
</style>
