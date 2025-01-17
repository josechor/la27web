<script lang="ts" setup>
import {
  validImageTypes,
  validVideoTypes,
} from "../constants/validMultimediaTypes";
import Video from "../atoms/Video.vue";
import Image from "../atoms/Image.vue";
import { useMultimediaStore } from "../stores/multimedia/multimediaStore";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";

const multimediaStore = useMultimediaStore();
const { multimedia, isOpenModal } = storeToRefs(multimediaStore);

function multimediaIsVideo(multimedia: string) {
  return validVideoTypes.includes(multimedia.split(".").pop() || "");
}

function multimediaIsImage(multimedia: string) {
  return validImageTypes.includes(multimedia.split(".").pop() || "");
}

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});
</script>
<template>
  <div
    class="fixed h-screen w-screen top-0 left-0 bg-slate-600 bg-opacity-50 z-[125] flex justify-center items-center"
    @click="isOpenModal = false"
  >
    <Video
      v-if="multimediaIsVideo(multimedia)"
      :src="multimedia"
      controls
      class="max-w-[95%] max-h-[90%] lg:max-w-[80%] lg:max-h-[80%]"
    />
    <Image
      v-if="multimediaIsImage(multimedia)"
      :src="multimedia"
      errorsrc="default-image.webp"
      class="max-w-[95%] max-h-[95%] lg:max-w-[80%] lg:max-h-[80%]"
    />
  </div>
</template>
