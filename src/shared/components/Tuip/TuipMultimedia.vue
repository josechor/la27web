<script lang="ts" setup>
import { PropType } from "vue";
import { TuipInterface } from "../../types/tuipsTypes";
import {
  validImageTypes,
  validVideoTypes,
} from "../../constants/validMultimediaTypes";
import Video from "../../atoms/Video.vue";
import Image from "../../atoms/Image.vue";
import { useMultimediaStore } from "../../stores/multimedia/multimediaStore";
defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
  customClass: {
    type: String,
    default: "max-h-[300px]",
  },
});

const multimediaStore = useMultimediaStore();
const { openModal } = multimediaStore;

function multimediaIsVideo(multimedia: string) {
  return validVideoTypes.includes(multimedia.split(".").pop() || "");
}

function multimediaIsImage(multimedia: string) {
  return validImageTypes.includes(multimedia.split(".").pop() || "");
}

function handleClickImage(multi: string) {
  openModal(multi);
}
</script>
<template>
  <div
    class="flex items-stretch justify-start rounded-lg overflow-hidden border border-background-colors-tertiary w-fit"
    :class="{
      'h-[200px]': tuip.tuipMultimedia.length > 1,
    }"
  >
    <div class="flex flex-row overflow-auto w-full">
      <template v-for="multimedia in tuip.tuipMultimedia">
        <Video
          ref="video"
          v-if="multimediaIsVideo(multimedia)"
          :src="multimedia"
          controls
          :class="customClass"
        ></Video>
        <Image
          v-if="multimediaIsImage(multimedia)"
          @click="handleClickImage(multimedia)"
          :src="multimedia"
          errorsrc="default-image.webp"
          :class="customClass"
        />
      </template>
    </div>
  </div>
</template>
