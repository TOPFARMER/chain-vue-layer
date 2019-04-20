<template>
  <form class="keyInfo">
    <fieldset>
      <input type="email" v-model="email" name="email" placeholder="邮箱">
      <input type="password" v-model="password" name="password" placeholder="密码">
    </fieldset>
    <a type="button" @click="onSubmit()" class="button button-clear">OK</a>
  </form>
</template>


<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "signUpForm",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit() {
      this.authenticate({
        strategy: "local",
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(
          `Successful login! See more detail: ${JSON.stringify(res)}`
        );
        this.$router.push({ path: "/user" });
      });
    },
    // 将全局authenticate映射到当前局部authenticate
    ...mapActions("auth", ["authenticate"])
  }
};
</script>

<style scoped>
.keyInfo {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  padding: 100px 0 0 0;
}

.keyInfo input {
  margin: 14px auto 0px;
}

a {
  margin: 40px 5px;
  font-size: 0.8em;
}
</style>

