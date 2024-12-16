<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ButtonSize } from "../types/shared";
import { TuipCreate } from "../types/tuipsTypes";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Button from "../atoms/buttons/Button.vue";
import { useTuipsStore } from "../stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";

const emits = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const tuipsFetchApi = new TuipsFetchApi();

const tuipsStore = useTuipsStore();
const { quotingPost } = storeToRefs(tuipsStore);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

async function createPost() {
  if (post.value.length === 0) return;
  const tuip: TuipCreate = {
    content: post.value,
    multimedia: null,
    quoting: quotingPost.value?.tuipId || null,
    secta: null,
    parent: null,
  };
  await tuipsFetchApi.createTuip(tuip);
  post.value = "";
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
</script>
<template>
  <div
    @click="closeModal"
    class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"
  ></div>

  <div
    class="fixed top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] z-50 bg-light-background-colors-primary p-4 rounded-md"
  >
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
          <div></div>
          <div class="flex gap-2 items-center">
            <span class="text-xs">{{ post.length }}/255</span>
            <Button
              @click="createPost"
              :disabled="post.length === 0"
              :size="ButtonSize.small"
              text="Publicar"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
