import Vue from "vue";
import Router from "vue-router";
import Home from "./layouts/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "",
      component: Home,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("./pages/HelloWorld.vue")
        },
        {
          path: "login",
          name: "login",
          component: () => import("./pages/Login.vue")
        },
        {
          path: "join",
          name: "join",
          component: () => import("./pages/Join.vue")
        }
      ],
      // path: "user",
      // name: "user",
      // component: () => import("./layouts/User.vue"),
      // children: [
      //   {
      //     path: "assess",
      //     name: "assess",
      //     component: () => import("./pages/Assess.vue")
      //   },
      //   {
      //     path: "review",
      //     name: "review",
      //     component: () => import("./pages/Review.vue")
      //   }
      // ]
    }
  ]
});
