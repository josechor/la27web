import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Tuip, TuipCreate } from "../../types/tuipsTypes";
import { TuipsFetchApi } from "../../services/tuips/tuipsFetchApi";

export const useTuipsStore = defineStore("tuipsStore", () => {
  const tuipsFetchApi = new TuipsFetchApi();
  const tuips: Ref<Tuip[]> = ref([]);

  const page = ref(1);
  const limit = 20;

  async function getTuips() {
    tuips.value = await tuipsFetchApi.getTuips(page.value, limit);
  }

  async function createTuip(tuip: TuipCreate) {
    await tuipsFetchApi.createTuip(tuip);
  }

  return {
    page, limit, tuips, getTuips, createTuip
  }
});
