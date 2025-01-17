import { defineStore } from "pinia";
import { Ref, ref } from 'vue';

export const useMultimediaStore = defineStore("multimediaStore", () => {
    const isOpenModal = ref(false);
    const multimedia: Ref<string> = ref('');

    function openModal(multi: string) {
        isOpenModal.value = true;
        multimedia.value = multi;
    }

    return { multimedia, isOpenModal, openModal }
})
