<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ButtonSize } from "../types/shared";
import { TuipCreate } from "../types/tuipsTypes";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Button from "../atoms/buttons/Button.vue";

const emits = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const tuipsFetchApi = new TuipsFetchApi();

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      emits("update:modelValue", false);
    }
  });
});

async function createPost() {
  if (post.value.length === 0) return;
  const tuip: TuipCreate = {
    content: post.value,
    multimedia: null,
  };
  await tuipsFetchApi.createTuip(tuip);
  post.value = "";
  emits("update:modelValue", false);
}

function validateInput() {
  if (post.value.length > 255) post.value = post.value.slice(0, 255);
}

const post = ref("");
</script>
<template>
  <div
    @click="$emit('update:modelValue', false)"
    class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50"
  ></div>

  <div
    class="fixed top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] z-50 bg-light-background-colors-primary p-4 rounded-md"
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
        <hr
          class="w-full border-light-background-colors-quaternary dark:border-dark-background-color-quaternary"
        />
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
