<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { ButtonSize } from "../types/shared";
import { TuipCreate } from "../types/tuipsTypes";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Button from "../atoms/buttons/Button.vue";
import { useTuipsStore } from "../stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";
import { UserFetchApi } from "../services/user/UserFetchApi";
import { ISectasFollowed } from "../../sectas/types/types";
import TuipMultimedia from "./Tuip/TuipMultimedia.vue";
import router from "../router";
import Icon from "../atoms/Icon.vue";

const emits = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const tuipsFetchApi = new TuipsFetchApi();
const userFetchApi = new UserFetchApi();

const tuipsStore = useTuipsStore();
const { quotingPost, responsePost } = storeToRefs(tuipsStore);

const sectasOptions = ref<{ label: string; value: string }[]>([]);

let textArea: HTMLElement | null = document.getElementById("postTextArea");
onMounted(async () => {
  document.body.style.overflow = "hidden";
  textArea = document.getElementById("postTextArea");
  const response = await userFetchApi.getFollowedSectas();
  sectasOptions.value = response.map((secta: ISectasFollowed) => ({
    label: secta.sectaName,
    value: secta.sectaId.toString(),
  }));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
  window.removeEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

const creatingPost = ref(false);
async function createPost() {
  if (post.value.length === 0 && files.value.length === 0) return;
  creatingPost.value = true;
  const tuip: TuipCreate = {
    content: post.value,
    multimedia: files.value,
    quoting: quotingPost.value?.tuipId || null,
    parent: responsePost.value?.tuipId || null,
    secta: null,
  };

  await tuipsFetchApi.createTuip(tuip);
  creatingPost.value = false;
  post.value = "";
  files.value = [];
  closeModal();
}

function closeModal() {
  post.value = "";
  quotingPost.value = null;
  router.go(-1);
  emits("update:modelValue", false);
}

function validateInput() {
  if (!textArea) return;
  textArea.style.height = "56px";
  let scHeight = textArea.scrollHeight;
  textArea.style.height = `${scHeight}px`;
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
  const maxFiles = 2;
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

function handleClickCreatePost() {
  createPost();
}
</script>
<template>
  <div
    @click="closeModal"
    class="fixed top-0 left-0 h-screen w-screen bg-slate-600 bg-opacity-50 z-[120]"
  ></div>

  <div
    class="fixed top-0 w-full h-screen max-h-screen overflow-y-auto lg:h-fit lg:top-[20%] lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[600px] z-[121] bg-background-colors-primary p-5 lg:rounded-xl tuip"
    style="overflow: auto"
  >
    <div
      @click="closeModal"
      class="translate-x-1 translate-y-[-15px] p-2 text-xl font-bold cursor-pointer w-fit mb-[-10px]"
    >
      X
    </div>
    <section v-if="responsePost" class="flex gap-4 w-full mb-1 relative">
      <img
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
        class="h-[40px] w-[40px] rounded-full z-10"
      />
      <div
        class="absolute w-[2px] top-0 left-[20px] h-full z-0 bg-background-colors-tertiary"
      ></div>
      <div class="flex flex-col gap-0.5">
        <header class="flex flex-row gap-1 items-end">
          <span class="font-bold text-sm">{{ responsePost.demonName }}</span>
          <span class="font-light text-xs text-text-color-secondary"
            >@{{ responsePost.userName }} ¤
            {{ getDate(responsePost.tuipCreatedAt) }}</span
          >
        </header>
        <section>
          <span class="text-sm">{{ responsePost.tuipContent }}</span>
          <TuipMultimedia
            v-if="responsePost.tuipMultimedia.length"
            custom-class="max-h-[200px]"
            :tuip="responsePost"
          />
        </section>
        <section class="my-2">
          <span class="text-text-color-tertiary text-sm"
            >Respondiendo a
            <strong class="text-text-color-primary"
              >@{{ responsePost.userName }}</strong
            ></span
          >
        </section>
      </div>
    </section>
    <section class="flex gap-4 justify-around w-full">
      <div class="w-full flex gap-2 flex-col">
        <div class="flex flex-row gap-2">
          <img
            src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
            alt="user"
            class="h-[40px] w-[40px] rounded-full"
          />
          <div class="flex flex-col gap-2 w-full">
            <textarea
              id="postTextArea"
              v-model="post"
              placeholder="Que te cuentas?"
              @input="validateInput"
              class="text-white bg-transparent p-0 w-full border-0 text-xl"
            />
            <div class="flex flex-nowrap overflow-x-scroll">
              <div v-for="(file, index) in files" class="relative">
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
                <div
                  @click="removeFile(index)"
                  class="absolute w-6 h-6 top-1 right-1 rounded-full cursor-pointer bg-background-colors-secondary flex items-center justify-center"
                >
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="quotingPost"
          class="px-2 py-3 border rounded-lg border-background-colors-quaternary z-10"
        >
          <header class="flex flex-row gap-1">
            <img
              src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
              alt="user"
              class="h-[20px] w-[20px] rounded-full"
            />
            <div class="flex items-end gap-1 translate-y-[-3px]">
              <span class="font-bold text-sm truncate">{{
                quotingPost.demonName
              }}</span>
              <span class="font-light text-xs text-text-color-secondary"
                >@{{ quotingPost.userName }} ¤
                {{ getDate(quotingPost.tuipCreatedAt) }}</span
              >
            </div>
          </header>
          <section class="w-full">
            <span class="text-sm">{{ quotingPost.tuipContent }}</span>
            <TuipMultimedia
              v-if="quotingPost.tuipMultimedia.length"
              class="w-full"
              custom-class="max-h-[200px] w-full object-cover"
              :tuip="quotingPost"
            />
          </section>
        </div>
        <div class="flex justify-between gap-4 ml-[44px]">
          <div>
            <label for="file" title="Subir multimedia" class="cursor-pointer">
              <Icon
                name="imageIcon"
                :width="32"
                :height="32"
                stroke="#b061c2"
                :stroke-width="2.5"
              />
            </label>
            <input
              type="file"
              accept="image/*, video/*"
              capture="environment"
              class="hidden"
              name="file"
              id="file"
              multiple
              @change="handleFiles"
            />
          </div>
          <div class="flex gap-2 items-center min-w-fit">
            <span class="text-xs">{{ post.length }}/255</span>
            <Button
              @click="handleClickCreatePost()"
              :disabled="
                (post.length === 0 && files.length === 0) || creatingPost
              "
              :size="ButtonSize.small"
              :text="creatingPost ? 'Publicando...' : 'Publicar'"
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
  white-space: pre-wrap;
}
</style>
