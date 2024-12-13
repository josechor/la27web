import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { CreateUser, LoggedUser } from "../../types/userTypes";
import { UserFetchApi } from "../../services/user/UserFetchApi";

export const useUserStore = defineStore("userStore", () => {
  const userToken: Ref<string | null> = ref(null);
  const loggedUser: Ref<LoggedUser | null> = ref(null);
  const userFetchApi = new UserFetchApi();

  async function registerUser(createUser: CreateUser) {
    try {
      await userFetchApi.createUser(createUser);
    } catch (error) {
      console.error(error);
    }
  }

  async function authUser(email: string, password: string) {
    try {
      const token = await userFetchApi.authUser(email, password);
      userToken.value = token.token;
      return true;
    } catch (_) {
      return false;
    }
  }

  async function getLoggedUser() {}

  function reconstruct() {
    localStorage.getItem("token");
    userToken.value = localStorage.getItem("token") || null;
  }

  function logout() {
    localStorage.removeItem("token");
    userToken.value = null;
  }

  return {
    loggedUser,
    userToken,
    getLoggedUser,
    registerUser,
    authUser,
    reconstruct,
    logout,
  };
});
