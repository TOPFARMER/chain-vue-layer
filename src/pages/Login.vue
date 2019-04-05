<template>
  <form class="keyInfo">
    <fieldset>
      <input type="email" name="email" placeholder="邮箱">
      <input type="password" name="password" placeholder="密码">
    </fieldset>
    <a type="button" @click="forwardStep()" class="button button-clear">OK</a>
  </form>
</template>


<script>
export default {
  name: "signUpForm",
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>

.keyInfo {
  width: 450px;
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

