<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { METHODS } from "http";
export default {
  name: "app",
  components: {},
  created: function() {
    window.onbeforeunload = function(e) {
      e = e || window.event;
      return "关闭提示";
    };
  }
  // created: function() {
  //   //在页面加载时读取localStorage里的状态信息
  //   localStorage.getItem("userMsg") &&
  //     this.$store.replaceState(
  //       Object.assign(
  //         this.$store.state,
  //         JSON.parse(localStorage.getItem("userMsg"))
  //       )
  //     );
  //   this.reloadUser();

  //   //在页面刷新时将vuex里的信息保存到localStorage里
  //   window.addEventListener("beforeunload", () => {
  //     localStorage.setItem("userMsg", JSON.stringify(this.$store.state));
  //   });
  // },
  // methods: {
  //   reloadUser: function() {
  //     const accessToken = this.$store.state.auth.accessToken;
  //     if (accessToken) {
  //       this.authenticate({
  //         strategy: "jwt",
  //         accessToken
  //       }).then(res => {
  //         console.log(
  //           `Successful login! See more detail: ${JSON.stringify(res)}`
  //         );
  //       });
  //     }
  //   },
  //   ...mapActions("auth", ["authenticate"])
  // }
};
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

body {
  background-color: #eeeeee;
  font-family: "Microsoft YaHei", Helvetica, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}
body,
html {
  margin: 0;
  height: 100%;
}

#app {
  text-align: center;
  color: #2c3e50;
}
</style>
