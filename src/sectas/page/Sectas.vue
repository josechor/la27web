<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { FetchSectasApi } from "../services/fetchSectasApi";
import { ISecta } from "../types/types";
import SectaPreview from "../components/SectaPreview.vue";
import CreateSectaModal from "../components/CreateSectaModal.vue";

const fetchSectasApi = new FetchSectasApi();

const sectas = ref<ISecta[]>([]);
const openModal = ref(false);

onMounted(async () => {
  sectas.value = await fetchSectasApi.getSectas();
});

function handleClickCreate() {
  openModal.value = true;
}

async function handleEventCreateSecta() {
  sectas.value = await fetchSectasApi.getSectas();
}
</script>
<template>
  <section
    class="border border-y-transparent border-x-light-background-colors-quaternary dark:border-x-dark-background-color-quaternary w-[65%] min-h-screen"
  >
    <header
      class="flex flex-row gap-4 border-b border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary px-2 py-4 items-center"
    >
      <div
        @click="$router.push('/')"
        role="button"
        class="flex items-center gap-2 p-4 whitespace-nowrap"
      >
        <--
      </div>
      <input
        type="text"
        class="w-full p-2 border-b h-[45px] border-light-background-colors-quaternary dark:border-dark-background-color-quaternary outline-none rounded-full"
        placeholder="Buscar sectas"
      />
      <div
        @click="handleClickCreate"
        role="button"
        class="flex items-center gap-2 p-4 whitespace-nowrap"
      >
        +
      </div>
    </header>
    <section class="flex flex-col gap-2">
      <template v-for="secta in sectas" :key="secta.sectaId">
        <SectaPreview :secta="secta" />
        <hr
          class="bg-light-background-colors-quaternary dark:bg-dark-background-color-quaternary h-[2px]"
        />
      </template>
    </section>
    <CreateSectaModal
      v-if="openModal"
      v-model="openModal"
      @create-secta="handleEventCreateSecta"
    />
  </section>
</template>
