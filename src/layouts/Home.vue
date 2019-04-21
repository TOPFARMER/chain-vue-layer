<template>
  <div class="home">
    <h4>学生评价模块演示DEMO</h4>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
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
