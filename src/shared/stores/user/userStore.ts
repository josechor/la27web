import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { CreateUser, LoggedUser } from "../../types/userTypes";
import { UserFetchApi } from "../../services/user/UserFetchApi";
import router from "../../router";

export const useUserStore = defineStore("userStore", () => {
  const userId: Ref<string | null> = ref(null);
  const loggedUser: Ref<LoggedUser | null> = ref(null);
  const userFetchApi = new UserFetchApi();

  async function registerUser(createUser: CreateUser) {
    try {
      await userFetchApi.createUser(createUser);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function authUser(email: string, password: string) {
    try {
      const token = await userFetchApi.authUser(email, password);
      localStorage.setItem("token", token.data);
      userId.value = token.data;
      return true;
    } catch (_) {
      return false;
    }
  }

  async function getLoggedUser() {}

  function reconstruct() {
    localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    userId.value = localStorage.getItem("token") || null;
    console.log(userId.value);
  }

  function logout() {
    localStorage.removeItem("token");
    userId.value = null;
    router.push("/login");
  }

  return {
    loggedUser,
    userId,
    getLoggedUser,
    registerUser,
    authUser,
    reconstruct,
    logout,
  };
});
