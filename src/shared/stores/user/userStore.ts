import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { CreateUser, LoggedUser } from "../../types/userTypes";
import { UserFetchApi } from "../../services/user/UserFetchApi";
import router from "../../router";

export const useUserStore = defineStore("userStore", () => {
  const sessionToken: Ref<string | null> = ref(null);
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
      localStorage.setItem("DemonToken", token.token);
      sessionToken.value = token.token;
      return true;
    } catch (_) {
      return false;
    }
  }

  async function getLoggedUser() {}

  function reconstruct() {
    localStorage.getItem("DemonToken");
    console.log(localStorage.getItem("DemonToken"));
    sessionToken.value = localStorage.getItem("DemonToken") || null;
  }

  function logout() {
    localStorage.removeItem("DemonToken");
    sessionToken.value = null;
    router.push("/login");
  }

  return {
    loggedUser,
    sessionToken,
    getLoggedUser,
    registerUser,
    authUser,
    reconstruct,
    logout,
  };
});
