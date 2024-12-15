import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TuipsFetchApi } from "../../services/tuips/TuipsFetchApi";
import { Tuip } from "../../types/tuipsTypes";

export const useTuipsStore = defineStore("tuipsStore", () => {
  const tuipsFetchApi = new TuipsFetchApi();
  const tuips: Ref<Tuip[]> = ref([]);

  const page = ref(1);
  const limit = 20;

  async function getTuips() {
    tuips.value = await tuipsFetchApi.getTuips(page.value, limit);
  }

  return {
    page, limit, tuips, getTuips
  }
});
