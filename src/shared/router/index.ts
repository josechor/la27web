import HomeView from "../../homeView/page/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";
import Loggin from "../../notLogged/pages/Loggin.vue";
import Register from "../../notLogged/pages/Register.vue";
import { useUserStore } from "../stores/user/userStore";

const routes = [
  { path: "/", component: HomeView, meta: { requiresAuth: true } }, // Rutas protegidas
  { path: "/login", component: Loggin, meta: { notLogged: true } },
  { path: "/register", component: Register, meta: { notLogged: true } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.sessionToken !== null;
  if (to.meta.notLogged && isAuthenticated) {
    next("/");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
