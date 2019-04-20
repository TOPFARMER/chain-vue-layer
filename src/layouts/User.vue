<template>
  <div class="User">
    <div id="nav">
      <router-link class="button" :disabled="$route.path === '/assess'" to="/assess">评价</router-link>
      <router-link class="button" :disabled="$route.path === '/review'" to="/review">审查</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "User",
  data() {
    return {};
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
