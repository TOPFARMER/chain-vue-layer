<template>
  <div id="signInForm">
    <div class="switchingPage">
      <!-- 多元素过渡 1.必须全部包含在transition内部 2.必须全部bind key -->
      <!-- 第一页 -->
      <transition name="fade" mode="out-in">
        <div class="sexAndRole" v-if="sign_up_step === 1" :key="sign_up_step">
          <h5>
            <strong>您的身份是？</strong>
          </h5>
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
          <h5>
            <strong>您的性别是？</strong>
          </h5>
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

        <!-- 第二页 -->
        <form class="personalInfo" v-else-if="sign_up_step === 2" :key="sign_up_step">
          <h5>
            <strong>填写您的个人信息：</strong>
          </h5>
          <fieldset v-if="user.role === 'student'">
            <input type="text" v-model.lazy="user.name" placeholder="姓名">
            <input type="tel" v-model.lazy="user.tel" placeholder="电话">
            <input type="text" v-model.lazy="user.institution" placeholder="院校">
            <input type="text" v-model.lazy="user.faculty" placeholder="学院">
            <input type="number" v-model.lazy="user.grade" placeholder="年级">
            <input type="number" v-model.lazy="user.c1ass" placeholder="班级">
            <!-- <textarea v-model.lazy="user.intro" placeholder="个人简介"></textarea> -->
          </fieldset>
          <fieldset v-else-if="user.role === 'teacher'">
            <input type="text" v-model.lazy="user.name" placeholder="姓名">
            <input type="tel" v-model.lazy="user.tel" placeholder="电话">
            <input type="text" v-model.lazy="user.institution" placeholder="院校">
            <input type="text" v-model.lazy="user.faculty" placeholder="学院">
          </fieldset>
        </form>

        <!-- 第三页 -->
        <form class="keyInfo" v-else-if="sign_up_step === 3" :key="sign_up_step">
          <h5>
            <strong>填写您的注册邮箱以及密码：</strong>
          </h5>
          <fieldset>
            <input type="email" v-model.lazy="user.email" placeholder="注册邮箱">
            <input type="password" v-model.lazy="user.password" placeholder="注册密码">
            <input type="password" v-model.lazy="rePassword" placeholder="重复输入密码">
          </fieldset>
        </form>

        <div class="genKeyPair" v-else-if="sign_up_step === 4" :key="sign_up_step">
          <h5>
            <strong>已极速为您生成密钥对！</strong>
          </h5>
          <img src="../assets/key.png" alt="密钥" class="key">
          <p>
            别担心，这一切都将在您的本地生成
            <br>服务器不会知道您的私人密钥
          </p>
          <p class="regenerate">
            没有收到密钥？ 👉
            <a
              @click="sendThisToMe(actor.genSecret(),
              `key-${actor.account.substring(0, 8)}.json`);"
            >重新生成</a>
          </p>
        </div>

        <!-- 最后一页 -->
        <div class="checkKeyPair" v-else>
          <h5>
            <strong>还差一步，即可开启</strong>
          </h5>
          <p>
            我们需要确认你是否收到了正确的密钥
            <br>别担心，确认工作仍在您本地进行
            <br>服务器不会知道您的私人密钥
            <br>同时请妥善保管您的密钥
          </p>

          <p class="regenerate">
            以后每次签名确认，都须经过这种方式
            <br>请把文件拖拽到下方位置
          </p>

          <!-- <input type="file" id="checkKeyfile" name="files[]" /> 按钮方式 -->
          <div
            id="check_key_drop_zone"
            @dragover.stop.prevent="handleDragOver"
            @drop.stop.prevent="handleDrop"
          >请把密钥文件拖拽到此处</div>
        </div>
      </transition>
    </div>

    <div class="stepBtn">
      <p v-show="isVaildPublicKey === false" class="regenerate">
        密钥文件有误，请重新拖曳
        <br>或试试👇
      </p>
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
        v-show="sign_up_step === 5 && (isVaildPublicKey !== true)"
        class="button button-clear"
      >重新生成</a>
      <a
        type="button"
        @click="register()"
        v-show="sign_up_step === 5 && (isVaildPublicKey === true)"
        class="button button-outline"
      >大功告成</a>
    </div>
  </div>
</template>

<script>
const Actor = require("../utils/actor");
const ProcessFile = require("../utils/process-file.js");

export default {
  name: "signInForm",
  data() {
    return {
      rePassword: undefined,
      rePublicKey: undefined,
      sign_up_step: 1,
      actor: undefined,
      isVaildPublicKey: undefined,
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
        intro: "暂无"
      }
    };
  },
  methods: {
    forwardStep: function() {
      if (this.sign_up_step < 5) {
        this.sign_up_step++;
        if (this.sign_up_step === 4) {
          this.genKeyPair();
        }
      }
    },
    backwardStep: function() {
      if (this.sign_up_step > 1) {
        return this.sign_up_step--;
      }
    },
    sendThisToMe: function(file, name) {
      ProcessFile.quickDownload(file, name);
    },
    genKeyPair: function() {
      this.actor = new Actor();
      this.user.publicKey = this.actor.account;
      this.sendThisToMe(
        this.actor.genSecret(),
        `key-${this.actor.account.substring(0, 8)}.json`
      );
    },
    handleDragOver: function(event) {
      ProcessFile.handleDragOver(event);
    },
    handleDrop: function(event) {
      ProcessFile.handleFileDropOn(event).then(keyPair => {
        console.log(keyPair);
        this.rePublicKey = keyPair.publicKey;
        this.checkPublicKey();
      });
    },

    checkPwd: function() {},
    checkPublicKey: function() {
      if (this.rePublicKey === this.user.publicKey) {
        this.isVaildPublicKey = true;
      } else {
        this.isVaildPublicKey = false;
      }
    },
    sendToFeathers() {
      
    }
  }
};
</script>



<style scoped>
#signInForm {
  width: 400px;
  height: 500px;
}

.stepBtn {
  width: 100%;
  height: 70;
  padding: 15px 0 0 0;
}

.switchingPage {
  width: 100%;
  height: calc(100%-100px);
  padding: 0;
}

.sexAndRole {
  width: 400px;
  height: calc(100%-100px);
  padding: 40px 0 0 0;
}

.personalInfo {
  width: 400px;
  height: calc(100%-100px);
}

.keyInfo {
  width: 400px;
  height: calc(100%-100px);
  padding: 40px 0 0 0;
}

.personalInfo input,
.keyInfo input {
  width: 400px;
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

stepBtn a {
  margin: auto;
  font-size: 0.7em;
}

.genKeyPair,
.checkKeyPair {
  width: 100%;
  height: calc(100%-100px);
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

.regenerate {
  font-size: 0.7em;
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

#check_key_drop_zone {
  border: 2px dashed #bbb;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;
  font: 20pt bold "Microsoft YaHei";
  color: #bbb;
}
</style>

