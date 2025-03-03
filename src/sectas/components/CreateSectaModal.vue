<script lang="ts" setup>
import { computed, onMounted, onUnmounted, Ref, ref } from "vue";
import Button from "../../shared/atoms/buttons/Button.vue";
import { FetchSectasApi } from "../services/fetchSectasApi";
import { ICustomFile } from "../../shared/services/tuips/types";

const emits = defineEmits(["update:modelValue", "createSecta"]);

const name = ref("");
const description = ref("");

const fileRef: Ref<ICustomFile | null> = ref(null);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

function handleFiles(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    fileRef.value = file as ICustomFile;
    fileRef.value.preview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

function closeModal() {
  name.value = "";
  description.value = "";
  fileRef.value = null;
  console.log("closeModal");
  emits("update:modelValue", false);
}

async function createSecta() {
  const fetchSectasApi = new FetchSectasApi();
  try {
    await fetchSectasApi.createSecta({
      sectaName: name.value,
      sectaDescription: description.value,
      sectaPicture: fileRef.value,
      sectaBanner: null,
    });
    emits("createSecta");
    closeModal();
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  window.addEventListener("keydown", eventHandler);
});

onUnmounted(() => {
  window.removeEventListener("keydown", eventHandler);
});

function eventHandler(e: KeyboardEvent) {
  if (e.key === "Escape") {
    closeModal();
  }
  if (e.key === "Enter") {
    createSecta();
  }
}

const createSectaDisabled = computed(() => {
  return name.value.length === 0 || description.value.length === 0;
});
</script>
<template>
  <div
    @click="closeModal"
    class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"
  ></div>
  <div
    class="fixed top-[5%] left-1/2 transform -translate-x-1/2 w-[600px] z-50 bg-background-colors-primary p-4 rounded-md"
  >
    <h2 class="text-2xl font-bold mb-6">Crear secta</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-4">
        <input
          v-model="name"
          type="text"
          class="p-2 border-b h-[35px] border-background-colors-quaternary  outline-none rounded"
          placeholder="Nombre de la secta"
        />
        <textarea
          v-model="description"
          class="p-2 border-b h-[200px] border-background-colors-quaternary  outline-none rounded"
          placeholder="Descripción de la secta"
        ></textarea>
      </div>
      <div class="flex flex-col gap-4">
        <input
          type="file"
          @change="handleFiles"
          placeholder="Imagen de la secta"
        />
        <img
          v-if="fileRef && fileRef.type.startsWith('image/')"
          :src="fileRef.preview"
          alt="Imagen subida"
          class="h-[150px] w-[150px] object-cover"
          accept=".jpg,.jpeg,.png,.gif"
          a
        />
      </div>
      <div></div>
      <div class="flex flex-row justify-end gap-4">
        <Button @click="closeModal" text="Cancelar" class="w-[100px]" />
        <Button
          @click="createSecta"
          :disabled="createSectaDisabled"
          text="Crear"
          class="w-[100px]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
