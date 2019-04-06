import Vue from 'vue'
import App from './App.vue'
import router from './router'

// const feathers = require("@feathersjs/client");
// const io = require("socket.io-client");

// const client = feathers();
// const socket = io('http://192.168.178.157:3030');


client.configure(feathers.socketio(socket));
// Use localStorage to store our login token
client.configure(feathers.authentication({
  storage: window.localStorage
}));

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
