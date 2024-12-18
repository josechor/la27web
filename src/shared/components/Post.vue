<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { ButtonSize } from "../types/shared";
import { TuipCreate } from "../types/tuipsTypes";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Button from "../atoms/buttons/Button.vue";
import { useTuipsStore } from "../stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";
import Icon from "../atoms/Icon.vue";

const emits = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const tuipsFetchApi = new TuipsFetchApi();

const tuipsStore = useTuipsStore();
const { quotingPost, responsePost } = storeToRefs(tuipsStore);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

async function createPost() {
  if (post.value.length === 0 && files.value.length === 0) return;
  const tuip: TuipCreate = {
    content: post.value,
    multimedia: files.value,
    quoting: quotingPost.value?.tuipId || null,
    parent: responsePost.value?.tuipId || null,
    secta: null,
  };
  await tuipsFetchApi.createTuip(tuip);
  post.value = "";
  files.value = [];
  closeModal();
}

function closeModal() {
  post.value = "";
  quotingPost.value = null;
  emits("update:modelValue", false);
}

function validateInput() {
  if (post.value.length > 255) post.value = post.value.slice(0, 255);
}

const post = ref("");

function getDate(date: string) {
  const actualDate = new Date().getTime();
  const d = new Date(date).getTime();

  const diff = actualDate - d;
  const seconds = diff / 1000;
  if (seconds < 60) return `Menos de un minuto`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutos`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} horas`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} días`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} semanas`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} meses`;
  return `${Math.floor(seconds / 31536000)} años`;
}

interface CustomFile extends File {
  preview?: string;
}

const files: Ref<CustomFile[]> = ref([]);

const handleFiles = (event: any) => {
  const maxFiles = 4;
  const selectedFiles = event.target.files;
  const remainingSlots = maxFiles - files.value.length;

  // Limitar a los slots disponibles
  const validFiles: CustomFile[] = Array.from(selectedFiles).slice(
    0,
    remainingSlots
  ) as File[];

  validFiles.forEach((file) => {
    const preview = URL.createObjectURL(file); // Crear un URL temporal para la previsualización
    // @ts-ignore
    files.value.push({ file, preview, type: file.type });
  });

  // Limitar al máximo permitido
  if (files.value.length > maxFiles) {
    files.value = files.value.slice(0, maxFiles);
  }
};

const removeFile = (index: number) => {
  // @ts-ignore
  URL.revokeObjectURL(files.value[index]);
  files.value.splice(index, 1);
};
</script>
<template>
  <div
    @click="closeModal"
    class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"
  ></div>

  <div
    class="fixed top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] z-50 bg-light-background-colors-primary p-4 rounded-md tuip"
  >
    <section v-if="responsePost" class="flex gap-4 w-full mb-1 relative">
      <img
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
        class="h-[40px] w-[40px] rounded-full z-10"
      />
      <div
        class="absolute w-[2px] top-0 left-[20px] h-full z-0 bg-light-background-colors-tertiary dark:bg-dark-background-color-tertiary"
      ></div>
      <div class="flex flex-col gap-0.5">
        <header class="flex flex-row gap-1 items-center">
          <span class="font-bold text-sm">{{ responsePost.demonName }}</span>
          <span class="font-light text-sm"
            >@{{ responsePost.userName }} ¤
            {{ getDate(responsePost.tuipCreatedAt) }}</span
          >
        </header>
        <section>
          <span>{{ responsePost.tuipContent }}</span>
        </section>
        <section class="my-2">
          <span
            class="text-light-text-color-tertiary dark:text-dark-text-color-tertiary"
            >Respondiendo a
            <strong
              class="text-light-text-color-primary dark:text-dark-text-color-primary"
              >@{{ responsePost.userName }}</strong
            ></span
          >
        </section>
      </div>
    </section>
    <section class="flex gap-4 justify-around w-full">
      <img
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
        class="h-[40px] w-[40px] rounded-full"
      />
      <div class="w-full flex gap-2 flex-col">
        <textarea
          v-model="post"
          placeholder="Que te cuentas?"
          @input="validateInput"
          @keydown.enter.prevent="createPost"
        />
        <div class="flex flex-nowrap overflow-x-scroll">
          <div v-for="file in files" class="relative">
            <img
              v-if="file.type.startsWith('image/')"
              :src="file.preview"
              alt="Imagen subida"
              class="h-[200px] object-cover"
            />
            <!-- Previsualización de video -->
            <video
              v-if="file.type.startsWith('video/')"
              controls
              class="h-[200px] object-cover"
            >
              <source :src="file.preview" :type="file.type" />
              Tu navegador no soporta videos.
            </video>
            <Icon
              @click="removeFile"
              :width="24"
              :height="24"
              name="searchIcon"
              class="absolute top-0 right-0 cursor-pointer"
            />
          </div>
        </div>
        <div
          v-if="quotingPost"
          class="px-2 py-3 border rounded-md border-light-background-colors-quaternary dark:border-dark-background-color-quaternary"
        >
          <header class="flex flex-row gap-1">
            <img
              src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
              alt="user"
              class="h-[20px] w-[20px] rounded-full"
            />
            <span class="font-bold text-sm">{{ quotingPost.demonName }}</span>
            <span class="font-light text-sm"
              >@{{ quotingPost.userName }} ¤
              {{ getDate(quotingPost.tuipCreatedAt) }}</span
            >
          </header>
          <section>
            <span>{{ quotingPost.tuipContent }}</span>
          </section>
        </div>
        <div class="flex justify-between gap-4">
          <div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.mkv,.webm"
              multiple
              @change="handleFiles"
            />
          </div>
          <div class="flex gap-2 items-center">
            <span class="text-xs">{{ post.length }}/255</span>
            <Button
              @click="createPost"
              :disabled="post.length === 0 && files.length === 0"
              :size="ButtonSize.small"
              text="Publicar"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tuip {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

.tuip div {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}
</style>
