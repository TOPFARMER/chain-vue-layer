<template>
  <div class="assessments">
    <div class="swicthingPage">
      <!-- transition-group 不支持 out-in -->
      <transition name="fade" mode="out-in">
        <form v-if="lookAssessments === false" :key="lookAssessments">
          <fieldset>
            <input type="text" placeholder="学生姓名" v-model="assessment.studentName">
            <textarea placeholder="评价内容" v-model="assessment.contents"></textarea>
            <p v-show="isVaildPublicKey === false" class="alert">密钥文件有误，请重新拖曳</p>
            <div
              id="check_key_drop_zone"
              @dragover.stop.prevent="handleDragOver"
              @drop.stop.prevent="handleDrop"
            >{{ keySetStatement }}</div>
          </fieldset>
        </form>

        <div class="assessmentList" v-else :key="lookAssessments">
          <h5>已审核通过评价</h5>
          <ul v-if="acceptedAssessments.length !== 0">
            <li v-for="(data, index) in unsignedAssessments" :key="index">
              <p>
                <strong>学生姓名：</strong>
                {{data.studentName}}
              </p>
              <p>
                <strong>评价内容：</strong>
                {{data.contents}}
              </p>
            </li>
          </ul>
          <div class="empty" v-else>无</div>
          <h5>您的已签名评价</h5>
          <ul v-if="signedAssessments.length !== 0">
            <li v-for="(data, index) in signedAssessments" :key="index">
              <p>
                <strong>学生姓名：</strong>
                {{data.studentName}}
                <a
                  @click="deleteThis(signedAssessments[index])"
                >删除</a>
                <a @click="updateThis(signedAssessments[index])">修改</a>
              </p>
              <p>
                <strong>评价内容：</strong>
                {{data.contents}}
              </p>
            </li>
          </ul>
          <div class="empty" v-else>无</div>

          <h5>您的未签名评价</h5>
          <ul v-if="unsignedAssessments.length !== 0">
            <li v-for="(data, index) in unsignedAssessments" :key="index">
              <p>
                <strong>学生姓名：</strong>
                {{data.studentName}}
                <a
                  @click="deleteThis(unsignedAssessments[index])"
                >删除</a>
                <a @click="updateThis(unsignedAssessments[index])">修改</a>
              </p>
              <p>
                <strong>评价内容：</strong>
                {{data.contents}}
              </p>
            </li>
          </ul>
          <div class="empty" v-else>无</div>
        </div>
      </transition>
    </div>

    <div class="assessNav">
      <a
        @click="genAssessment(); switchPage()"
        v-show="isVaildPublicKey !== true && lookAssessments === false"
        class="button button-clear"
      >上传</a>
      <a
        type="button"
        @click="genAssessment(); switchPage()"
        v-show="isVaildPublicKey === true && lookAssessments === false"
        class="button button-outline"
      >签名并上传</a>
      <a
        type="button"
        @click="switchPage();"
        v-show="lookAssessments === false"
        class="button button-clear"
      >查看评价</a>
      <!-- <a
        @click="getAssessments()"
        v-show="lookAssessments === true"
        class="button button-clear"
      >更新列表</a>-->
      <a
        type="button"
        @click="switchPage()"
        v-show="lookAssessments === true"
        class="button button-clear"
      >新增评价</a>
      <!-- <a
        type="button"
        @click="switchPage()"
        v-show="lookAssessments === true"
        class="button button-clear"
      >查看区块</a>-->
    </div>
    <a class="logout button button-outline" @click="quit()">退出</a>
  </div>
</template>


<script>
import { get } from "http";
import { async } from "q";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
const Actor = require("../utils/actor.js");
const ProcessFile = require("../utils/process-file.js");
const ChainUtil = require("../utils");
export default {
  name: "Assess",
  data() {
    return {
      user: this.$store.state.auth.user,
      actor: null,
      lookAssessments: false,
      publicKeyFromFile: null,
      isVaildPublicKey: null,
      updateId: null,
      assessment: {
        hash: null,
        publicKey: this.$store.state.auth.user.publicKey,
        teacherName: this.$store.state.auth.user.name,
        studentName: null,
        contents: null,
        signature: null
      },
      keySetStatement: "请把密钥文件拖拽到此处"
    };
  },
  created: function() {
    this.getAssessments();
  },
  computed: {
    signedAssessments() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.findInStore({
        query: { isSignedByTchr: true, isSignedBySup: false }
      }).data;
    },
    unsignedAssessments() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.findInStore({
        query: { isSignedByTchr: false, isSignedBySup: false }
      }).data;
    },
    acceptedAssessments() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.findInStore({
        query: { isSignedByTchr: true, isSignedBySup: true }
      }).data;
    }
  },
  methods: {
    checkPublicKey: function() {
      if (this.assessment.publicKey === this.publicKeyFromFile) {
        this.isVaildPublicKey = true;
        return true;
      } else {
        this.isVaildPublicKey = false;
        return false;
      }
    },
    switchPage: function() {
      this.lookAssessments = !this.lookAssessments;
    },
    genAssessment: async function() {
      const { Assessment } = this.$FeathersVuex;
      const { publicKey, teacherName, studentName, contents } = this.assessment;
      this.assessment.hash = ChainUtil.hash(
        publicKey,
        teacherName,
        studentName,
        contents
      );
      if (this.isVaildPublicKey) {
        this.assessment.signature = this.actor.sign(this.assessment.hash);
      }
      if (this.updateId) {
        const newAssessment = new Assessment(
          Object.assign({ _id: this.updateId }, this.assessment)
        );
        newAssessment.update();
        this.updateId = null;
      } else {
        const newAssessment = new Assessment(this.assessment);
        newAssessment.save();
      }
    },
    handleDragOver: function(event) {
      ProcessFile.handleDragOver(event);
    },
    handleDrop: function(event) {
      ProcessFile.handleFileDropOn(event).then(keyPair => {
        this.publicKeyFromFile = keyPair.publicKey;
        if (this.checkPublicKey()) {
          this.actor = new Actor(keyPair.publicKey, keyPair.privateKey);
          this.keySetStatement = "密钥与当前用户匹配！";
        }
      });
    },
    getAssessments: function() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.find({
        query: {
          publicKey: this.user.publicKey
        }
      }).data;
    },
    updateThis: function(assessment) {
      const { _id, studentName, contents } = assessment;
      this.updateId = _id;
      this.assessment.hash = null;
      this.assessment.studentName = studentName;
      this.assessment.contents = contents;
      this.assessment.signature = null;
      this.switchPage();
    },
    deleteThis: function(assessment) {
      const { _id } = assessment;
      const { Assessment } = this.$FeathersVuex;
      const deleteAssessment = new Assessment({ _id });
      deleteAssessment.remove();
    },
    quit: function() {
      this.logout({}).then(res => {
        console.log(
          `Successful lougout! See more detail: ${JSON.stringify(res)}`
        );
        this.$router.push({ path: "/" });
      });
    },
    ...mapActions("auth", ["logout"])
  }
};
</script>

<style scoped>
.assessments {
  width: 400px;
  margin: 0 auto;
  padding: 20px 0 0 0;
}

.assessments input {
  margin: 5px auto 5px;
}

#check_key_drop_zone {
  border: 2px dashed #bbb;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  font: 20pt bold "Microsoft YaHei";
  color: #bbb;
}

.empty {
  border: 2px dashed #bbb;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 10px 0 0 0;
  padding: 10px;
  text-align: center;
  font: 20pt bold "Microsoft YaHei";
  color: #bbb;
}

.switchingPage {
  width: 100%;
  padding: 0;
}

.alert {
  margin: 2px;
  color: crimson;
  font-size: 0.7em;
}

.assessNav {
  width: 100%;
  height: 70;
  padding: 15px 0 0 0;
}
.assessNav a {
  margin: auto;
  font-size: 0.7em;
}

.assessmentList h5 {
  margin: 10px auto 5px;
  padding: 0;
  border-bottom: 1px dashed #24936e;
  text-align: right;
}

.assessmentList p {
  margin: 0;
  padding: 0 0 5px 0;
  text-align: left;
  color: gray;
}

.assessmentList ul {
  margin: 0 0 0 0;
  padding: 0;
  list-style-type: none;
}

.assessmentList ul li {
  margin: 5px auto 0px;
  font-size: 0.8em;
  border-bottom: 1px dashed #24936e;
  margin-bottom: 2px;
}

.assessmentList ul li a {
  margin: 1px;
  padding: 2px;
  font: 0.8em bold;
  border: 0.5px solid #24936e;
  float: right;
}

.logout {
  margin: 40px 0 0 0;
  font-size: 0.8em;
}
</style>

