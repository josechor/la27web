import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../../shared/router";
import { User } from "../../shared/types/userTypes";

export const useEditProfileStore = defineStore("editProfileStore", () => {
    const editProfileModalRef = ref(false);
    const userData = ref<User | null>(null);

    function openModal(user: User) {
        router.push({ name: router.currentRoute.value.name, query: { editProfile: 'true' } })
        userData.value = JSON.parse(JSON.stringify(user));
        editProfileModalRef.value = true;
    }

    return {
        editProfileModalRef,
        openModal,
        userData,
    }
})
