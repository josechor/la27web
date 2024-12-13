import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { LoggedUser } from "../../types/userTypes";

export const useUserStore = defineStore("userStore", () => {
  const loggedUser: Ref<LoggedUser | null> = ref(null);

  return { loggedUser };
});
