<template>
  <div class="User">
    <div id="nav">
      <router-link class="button" :disabled="$route.path === '/user/assess'" to="/user/assess">评价</router-link>
      <router-link class="button" :disabled="$route.path === '/user/review'" to="/user/review">审查</router-link>
    </div>
    <h5 v-if="$route.path === '/user'">欢迎用户：{{user.name}}</h5>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      user: this.$store.state.auth.user
    };
  },
  methods: {}
};
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
