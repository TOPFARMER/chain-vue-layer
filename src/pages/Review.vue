<template>
  <div class="assessments">
    <div class="swicthingPage" v-if="role === 'supervisor'">
      <!-- transition-group 不支持 out-in -->
      <transition name="fade" mode="out-in">
        <div class="signedList">
          <h5>全局已审核评价</h5>
          <ul v-if="acceptedAssessments.length !== 0">
            <li v-for="(data, index) in acceptedAssessments" :key="index">
              <p>
                <strong>教师姓名：</strong>
                {{data.teacherName}} |
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
          <h5>全局已签名评价</h5>
          <ul v-if="signedAssessments.length !== 0">
            <li v-for="(data, index) in signedAssessments" :key="index">
              <p>
                <strong>教师姓名：</strong>
                {{data.teacherName}} |
                <strong>学生姓名：</strong>
                {{data.studentName}}
                <label>
                  <input title="通过" type="checkbox" v-model="checkedAssessments[data._id]">审核通过
                </label>
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

      <p v-show="isVaildPublicKey === false && isChecked > 0" class="alert">密钥文件有误，请重新拖曳</p>
      <div
        v-show="isChecked > 0"
        id="check_key_drop_zone"
        @dragover.stop.prevent="handleDragOver"
        @drop.stop.prevent="handleDrop"
      >{{ keySetStatement }}</div>
    </div>
    <div v-else>您无权进行审查</div>

    <div class="assessNav">
      <a type="button" class="button button-clear">查看区块</a>
      <a
        type="button"
        class="button"
        v-show="role === 'supervisor'"
        :disabled="isChecked === 0 || !isVaildPublicKey"
        @click="genBlocks()"
      >区块打包</a>
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
      actor: null,
      role: this.$store.state.auth.user.role,
      publicKey: this.$store.state.auth.user.publicKey,
      publicKeyFromFile: null,
      isVaildPublicKey: null,
      checkedAssessments: {},
      keySetStatement: "请把密钥文件拖拽到此处"
    };
  },
  created: function() {
    this.findSignedAssessments();
  },
  computed: {
    ...mapState("assessments", {
      areAssessmentsLoading: "isFindPending",
      areAssessmentsUpdating: "isUpdatePending"
    }),
    signedAssessments() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.findInStore({ query: { isSignedByTchr: true } }).data;
    },
    acceptedAssessments() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.findInStore({
        query: { isSignedByTchr: true, isSignedBySup: true }
      }).data;
    },
    isChecked() {
      let count = 0;
      Object.values(this.checkedAssessments).forEach(checked => {
        if (checked) count++;
      });
      return count;
    }
  },
  methods: {
    quit: function() {
      this.logout({}).then(res => {
        console.log(
          `Successful lougout! See more detail: ${JSON.stringify(res)}`
        );
        this.$router.push({ path: "/" });
      });
    },
    checkPublicKey: function() {
      if (this.publicKey === this.publicKeyFromFile) {
        this.isVaildPublicKey = true;
        return true;
      } else {
        this.isVaildPublicKey = false;
        return false;
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
    findSignedAssessments: function() {
      const { Assessment } = this.$FeathersVuex;
      return Assessment.find({
        query: {
          isSignedByTchr: true,
          isSignedBySup: false
        }
      }).data;
    },
    genBlocks: async function() {
      if (!this.isVaildPublicKey) return;
      const assessments = [];
      const { Assessment } = this.$FeathersVuex;
      for (let id in this.checkedAssessments) {
        if (this.checkedAssessments[id]) {
          let {
            _id,
            hash,
            publicKey,
            teacherName,
            studentName,
            contents,
            signature,
            isSignedByTchr,
            isSignedBySup
          } = await Assessment.get(id);

          if (isSignedByTchr) {
            if (!isSignedBySup) {
              const assessment = {
                _id,
                hash,
                publicKey,
                teacherName,
                studentName,
                contents,
                signature
              };
              assessments.push(assessment);
            } else {
              console.log(`Assessment: ${id} had been accepted.`);
            }
          } else {
            console.log(`Assessment: ${id} with no signature.`);
          }
        }
      }
      if (assessments.length > 0) {
        const { Block } = this.$FeathersVuex;
        const assessmentsStr = JSON.stringify(assessments);
        const timestamp = Date.now();
        const publicKey = this.publicKey;
        const hash = ChainUtil.hash(publicKey, assessmentsStr, timestamp);
        const signature = this.actor.sign(hash);
        const newBlock = new Block({
          hash,
          signature,
          publicKey,
          assessments: assessmentsStr,
          timestamp
        });
        newBlock.save();
      } else {
        console.log("No assessments can be wrap up.");
      }
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
  margin: 10px 0 0 0;
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

.signedList h5 {
  margin: 10px auto 5px;
  padding: 0;
  border-bottom: 1px dashed #24936e;
  text-align: right;
}

.signedList p {
  margin: 0;
  padding: 0 0 5px 0;
  text-align: left;
  color: gray;
}

.signedList ul {
  margin: 0 0 0 0;
  padding: 0;
  list-style-type: none;
}

.signedList ul li {
  margin: 5px auto 0px;
  font-size: 0.8em;
  border-bottom: 1px dashed #24936e;
  margin-bottom: 2px;
}

.signedList ul li label {
  font: 0.8em bold;
  float: right;
}

.logout {
  margin: 40px 0 0 0;
  font-size: 0.8em;
}
</style>

