import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Signup from "./components/Signup.vue";
import UserList from "./components/userlist.vue";
import UserDetail from "./components/userDetail.vue";
import HomePage from "./components/homePage.vue";

const routes = [
  {
    path: "/HomePage",
    name: "Homepage",
    component: HomePage,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/userlist",
    name: "UserList",
    component: UserList,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/userdetail/:email",
    name: "UserDetail",
    component: UserDetail,
    props: true,
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("Navigating to:", to.fullPath);
  console.log("Is Authenticated:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.warn("🚫 Access Denied! Redirecting to Login...");
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
