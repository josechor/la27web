import { defineStore } from "pinia";
import { TuipCreate } from "../../types/tuipsTypes";
import { TuipsFetchApi } from "../../services/tuips/tuipsFetchApi";

export const useTuipsStore = defineStore("tuipsStore", () => {
  const tuipsFetchApi = new TuipsFetchApi();

  async function createTuip(tuip: TuipCreate) {
    await tuipsFetchApi.createTuip(tuip);
  }

  return {
    createTuip
  }
});
