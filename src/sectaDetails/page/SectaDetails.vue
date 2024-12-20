<script lang="ts" setup>
import { useRoute } from "vue-router";
import { FetchSectasApi } from "../../sectas/services/fetchSectasApi";
import { onMounted, ref, watch } from "vue";
import { ISecta } from "../../sectas/types/types";
import Image from "../../shared/atoms/Image.vue";
import Button from "../../shared/atoms/buttons/Button.vue";
import { ButtonSize } from "../../shared/types/shared";
import Tuip from "../../shared/components/Tuip.vue";
import { TuipInterface } from "../../shared/types/tuipsTypes";
import { TuipsFetchApi } from "../../shared/services/tuips/tuipsFetchApi";

const route = useRoute();
let sectaId = route.params.sectaId;
const fetchSectasApi = new FetchSectasApi();
const secta = ref<ISecta | null>(null);
const tuips = ref<TuipInterface[]>([]);
const tuipsFetchApi = new TuipsFetchApi();

onMounted(() => {
  if (!sectaId) return;
  startSectaProfile();
});

watch(
  () => route.params.username,
  () => {
    sectaId = route.params.sectaId;
    startSectaProfile();
  }
);

async function startSectaProfile() {
  if (!sectaId || typeof sectaId !== "string") {
    console.error("El parámetro sectaId no es válido");
    return;
  }
  secta.value = await fetchSectasApi.getSectaById(Number(sectaId));
  tuips.value = await tuipsFetchApi.getTuips(1, 20, {
    sectaId: secta.value?.sectaId,
  });
}


</script>
<template>
  <div
    v-if="secta"
    class="border border-y-0 border-x-light-background-colors-quaternary dark:border-x-dark-background-color-quaternary w-[65%] min-h-screen"
  >
    <header
      class="border-b border-light-background-colors-quaternary dark:border-dark-background-colors-quaternary"
    >
      <div
        class="flex flex-row gap-10 px-4 py-3 items-center border-b border-light-background-colors-quaternary dark:border-dark-background-colors-quaternary"
      >
        <span @click="$router.push('/sectas')" class="cursor-pointer p-2"
          ><--</span
        >
        <div>
          <h1 class="text-sm font-bold">{{ secta.sectaName }}</h1>
          <p class="text-xs">{{ 0 }} fuegos</p>
        </div>
      </div>
      <div class="py-3 relative">
        <div class="pl-10 z-50 relative">
          <Image :src="secta.sectaPicture" class="w-[120px] h-[120px]" />
        </div>
        <div
          class="absolute top-1/2 -translate-y-1/2 left-0 h-[50px] w-full border-y border-light-background-colors-quaternary dark:border-dark-background-color-quaternary z-10 pl-[180px] flex items-center font-bold text-lg bg-white"
        >
          {{ secta.sectaName }}
        </div>
        <div class="absolute top-[15px] right-[20px]">
          <Button text="Editar secta" :size="ButtonSize.small"></Button>
        </div>
        <div class="absolute top-2/3 translate-y-[5px] left-[180px]">
          <Button text="Seguir" :size="ButtonSize.small"></Button>
        </div>
      </div>
      <div class="p-4">
        <span
          class="text-light-text-color-primary dark:text-dark-text-color-primary"
          >{{ secta.sectaDescription }}</span
        >
        <div class="flex justify-between">
          <span></span>
          <div
            class="px-4 py-1 bg-light-background-colors-tertiary dark:bg-dark-background-color-tertiary rounded-md"
          >
            <span class="text-sm font-bold"
              >{{ 0 }} <span class="text0-sm font-normal"> fieles</span></span
            >
          </div>
        </div>
      </div>
    </header>
    <div>
      <Tuip v-for="tuip in tuips" :key="tuip.tuipId" :tuip="tuip" />
    </div>
  </div>
</template>
