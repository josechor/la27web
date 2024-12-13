import HomeView from "../../dashboard/page/HomeView.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import Loggin from "../../notLogged/pages/Loggin.vue";
import Register from "../../notLogged/pages/Register.vue";
import { useUserStore } from "../stores/user/userStore";

const routes = [
  { path: "/", component: HomeView, meta: { requiresAuth: true } }, // Rutas protegidas
  { path: "/login", component: Loggin },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

// Añadimos el guard global
router.beforeEach((to, _, next) => {
  const userStore = useUserStore(); 
  const isAuthenticated = !!userStore.loggedUser?.token; 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next(); 
  }
});

export default router;
