import { defineStore } from "pinia";
import { TuipCreate, TuipInterface } from "../../types/tuipsTypes";
import { TuipsFetchApi } from "../../services/tuips/tuipsFetchApi";
import { Ref, ref } from "vue";

export const useTuipsStore = defineStore("tuipsStore", () => {
  const tuipsFetchApi = new TuipsFetchApi();
  const modalPost = ref(false);
  const quotingPost: Ref<TuipInterface | null> = ref(null);

  function openPostModalWithQuoting(tuip: TuipInterface) {
    quotingPost.value = tuip;
    modalPost.value = true;
  }

  async function createTuip(tuip: TuipCreate) {
    await tuipsFetchApi.createTuip(tuip);
  }

  return {
    modalPost,
    createTuip,
    openPostModalWithQuoting,
    quotingPost
  }
});
