<script lang="ts" setup>
import { PropType } from "vue";
import { TuipInterface } from "../../types/tuipsTypes";
import { validImageTypes, validVideoTypes } from "../../constants/validMultimediaTypes";
import Video from "../../atoms/Video.vue";
import Image from "../../atoms/Image.vue";
defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
});

function multimediaIsVideo(multimedia: string) {
  return validVideoTypes.includes(multimedia.split(".").pop() || "");
}

function multimediaIsImage(multimedia: string) {
  return validImageTypes.includes(multimedia.split(".").pop() || "");
}
</script>
<template>
  <div
    class="flex items-stretch justify-start rounded-md overflow-hidden border border-light-background-colors-tertiary dark:bg-dark-background-color-tertiary w-fit"
    :class="{
      'h-[200px]': tuip.tuipMultimedia.length > 1,
    }"
  >
    <div class="flex flex-row overflow-auto">
        <template v-for="multimedia in tuip.tuipMultimedia">
          <Video
            v-if="multimediaIsVideo(multimedia)"
            :src="multimedia"
            controls
            class="max-h-[300px]"
          ></Video>
          <Image
            v-if="multimediaIsImage(multimedia)"
            :src="multimedia"
            errorsrc="default-image.webp"
            class="max-h-[300px]"
          />
        </template>
    </div>
  </div>
</template>