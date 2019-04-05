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
          component: () =>
            import(/* webpackChunkName: "about" */ "./pages/HelloWorld.vue")
        },
        {
          path: "login",
          name: "login",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./pages/Login.vue")
        },
        {
          path: "join",
          name: "join",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "about" */ "./pages/Join.vue")
        }
      ]
    }
  ]
});
