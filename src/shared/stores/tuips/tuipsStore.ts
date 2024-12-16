import { defineStore } from "pinia";
import { TuipCreate } from "../../types/tuipsTypes";
import { TuipsFetchApi } from "../../services/tuips/tuipsFetchApi";
import { ref } from "vue";

export const useTuipsStore = defineStore("tuipsStore", () => {
  const tuipsFetchApi = new TuipsFetchApi();
  const modalPost = ref(false);

  async function createTuip(tuip: TuipCreate) {
    await tuipsFetchApi.createTuip(tuip);
  }

  return {
    modalPost,
    createTuip
  }
});
