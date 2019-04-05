<template>
  <div class="home">
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
// @ is an alias to /src
export default {
  name: 'home',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

#nav {
  padding: 30px;
}

#nav a {
  font-size: 1em;
  margin: 5px;
}


</style>
