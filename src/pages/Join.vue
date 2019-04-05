<template>
  <div id="signInForm">
    <div class="switchingPage">
      <!-- 多元素过渡 1.必须全部包含在transaction内部 2.必须全部bind key -->

      <transition name="fade" mode="out-in">
        <div class="genKeyPair" v-if="sign_up_step === 4" :key="sign_up_step">
          <h5><strong>正在为您生成签名密钥对，请稍候</strong></h5>
          <img src="../assets/key.png" alt="密钥" class="key">
          <p>
            别担心，这一切都将在您的本地生成
            <br>服务器不会知道您的私人密钥
          </p>
          
        </div>

        <form class="keyInfo" v-else-if="sign_up_step === 3" :key="sign_up_step">
          <h5><strong>填写您的注册邮箱以及密码：</strong></h5>
          <fieldset>
            <input type="email" v-model.lazy="user.email" placeholder="注册邮箱">
            <input type="password" v-model.lazy="user.password" placeholder="注册密码">
            <input type="password" v-model.lazy="password_checked" placeholder="重复输入密码">
          </fieldset>
        </form>

        <form class="personalInfo" v-else-if="sign_up_step === 2" :key="sign_up_step">
          <!-- <h5><strong>填写你的个人信息：</strong></h5> -->
          <fieldset>
            <input type="text" v-model.lazy="user.name" placeholder="姓名">
            <input type="tel" v-model.lazy="user.tel" placeholder="电话">
            <input type="text" v-model.lazy="user.institution" placeholder="院校">
            <input type="text" v-model.lazy="user.faculty" placeholder="学院">
            <input type="number" v-model.lazy="user.grade" placeholder="年级">
            <input type="number" v-model.lazy="user.c1ass" placeholder="班级">
            <textarea v-model.lazy="user.intro" placeholder="个人简介"></textarea>
          </fieldset>
        </form>

        <div class="sexAndRole" v-else :key="sign_up_step">
          <h5><strong>您的身份是？</strong></h5>
          <div class="role">
            <label for="teacher" class="label-inline">
              <input id="teacher" type="radio" name="role" value="teacher" v-model="user.role">
              教师
            </label>
            <label for="student" class="label-inline">
              <input id="student" type="radio" name="role" value="student" v-model="user.role">
              学生
            </label>
          </div>
          <h5><strong>您的性别是？</strong></h5>
          <div class="sex">
            <label for="male" class="label-inline">
              <input id="male" type="radio" name="sex" value="male" v-model="user.sex">
              男
            </label>
            <label for="female" class="label-inline">
              <input id="female" type="radio" name="sex" value="female" v-model="user.sex">
              女
            </label>
          </div>
        </div>
      </transition>
    </div>

    <div class="stepBtn">
      <a
        type="button"
        @click="backwardStep()"
        v-show="sign_up_step === 2 || sign_up_step === 3"
        class="button button-clear"
      >上一步</a>
      <a
        type="button"
        @click="forwardStep()"
        v-show="sign_up_step !== 5"
        class="button button-clear"
      >下一步</a>
      <a
        type="button"
        @click="backwardStep()"
        v-show="sign_up_step === 6 || false"
        class="button button-clear"
      >重新生成</a>
      <a
        type="button"
        @click="register()"
        v-show="sign_up_step === 6"
        class="button button-outline"
      >大功告成</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "signInForm",
  data() {
    return {
      password_checked: undefined,
      sign_up_step: 1,
      user: {
        email: undefined,
        password: undefined,
        role: undefined,
        publicKey: undefined,
        name: undefined,
        sex: undefined,
        tel: undefined,
        institution: undefined,
        faculty: undefined,
        grade: undefined,
        // class为关键字，使用c1ass代替
        c1ass: undefined,
        intro: undefined
      }
    };
  },
  methods: {
    forwardStep: function() {
      if (this.sign_up_step < 5) {
        this.sign_up_step++;
      }
    },
    backwardStep: function() {
      if (this.sign_up_step > 1) {
        return this.sign_up_step--;
      }
    },
    checkPwd() {},
    checkPublicKey() {}
  }
};
</script>



<style scoped>
#signInForm {
  width: 450px;
  height: 500px;
}

.stepBtn {
  width: 100%;
  height: 100px;
}

.switchingPage {
  width: 100%;
  height: 400px;
  padding: 0;
}

.sexAndRole {
  width: 100%;
  height: 400px;
  padding: 100px 0 0 0;
}

.personalInfo {
  width: 100%;
  height: 400px;
}

.keyInfo {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  padding: 100px 0 0 0;
}

.personalInfo input textarea,
.keyInfo input {
  margin: 14px auto 0px;
}

.sexAndRole input {
  display: inline;
  margin: 5px;
}

.sexAndRole label {
  margin: 0 25px 50px 0;
}

.sexAndRole h5 {
  margin: 5px;
}

a {
  margin: 40px 5px;
  font-size: 0.7em;
}

.genKeyPair {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  padding: 10px;
}

img {
  margin: 30px;
  width: 15rem;
  height: 15rem;
  vertical-align: calc(-0.12109375em);
}

.key {
  display: inline-block;
  animation: key 0.33s infinite alternate;
}

@keyframes key {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(3deg);
  }
  67% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

