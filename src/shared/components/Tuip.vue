<script lang="ts" setup>
import { onMounted, PropType, Ref, ref, watch } from "vue";
import { TuipInterface } from "../types/tuipsTypes";
import router from "../router";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Image from "../atoms/Image.vue";

import TuipFooterButtons from "./Tuip/TuipFooterButtons.vue";
import TuipHeader from "./Tuip/TuipHeader.vue";
import TuipMultimedia from "./Tuip/TuipMultimedia.vue";
import { textParse } from "../utils/functions/textParse";

const tuipsFetchApi = new TuipsFetchApi();

const props = defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
});

const tuipRef = ref(props.tuip);

const quoting: Ref<TuipInterface | null> = ref(null);
const parent: Ref<TuipInterface | null> = ref(null);
onMounted(async () => {
  if (tuipRef.value.quoting) {
    quoting.value = await tuipsFetchApi.getTuipById(tuipRef.value.quoting);
  }
  if (tuipRef.value.parent) {
    parent.value = await tuipsFetchApi.getTuipById(tuipRef.value.parent);
  }
});

watch(
  () => props.tuip,
  async (newVal) => {
    tuipRef.value = newVal;
    if (tuipRef.value.quoting) {
      quoting.value = await tuipsFetchApi.getTuipById(tuipRef.value.quoting);
    }
    if (tuipRef.value.parent) {
      parent.value = await tuipsFetchApi.getTuipById(tuipRef.value.parent);
    }
  }
);

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
  <div class="w-full cursor-pointer">
    <div
      v-if="parent !== null"
      class="flex gap-4 justify-around w-full px-3 py-2 relative pb-7 tuip"
    >
      <div
        class="w-[2px] bg-background-colors-tertiary absolute top-[8px] left-[37px] h-full z-0"
      ></div>
      <Image
        @click.stop="router.push('/profile/' + parent.userName)"
        :src="parent.profilePicture"
        errorsrc="default-image.webp"
        class="h-[50px] w-[50px] rounded-full cursor-pointer z-50"
        role="button"
      />
      <div class="w-full flex flex-col gap-1">
        <TuipHeader :tuip="parent" />
        <div class="content" v-html="textParse(parent.tuipContent)"></div>
        <TuipMultimedia v-if="parent.tuipMultimedia.length" :tuip="parent" />
        <TuipFooterButtons :tuip="parent" />
      </div>
    </div>
    <div
      @click="console.log('hijo')"
      class="flex gap-4 justify-around border border-transparent border-b-background-colors-quaternary w-full px-3 py-2 tuip"
    >
      <Image
        @click.stop="router.push('/profile/' + tuip.userName)"
        :src="tuip.profilePicture"
        errorsrc="default-image.webp"
        class="h-[50px] w-[50px] rounded-full cursor-pointer object-cover"
        role="button"
      />
      <div class="w-full flex flex-col gap-1">
        <TuipHeader :tuip="tuip" />
        <p class="content" v-html="textParse(tuip.tuipContent)"></p>
        <TuipMultimedia v-if="tuip.tuipMultimedia.length" :tuip="tuip" />
        <div
          v-if="quoting"
          class="px-2 py-3 border rounded-xl border-background-colors-quaternary mt-4"
        >
          <header class="flex flex-row gap-1 items-center">
            <Image
              :src="quoting.profilePicture"
              errorsrc="default-image.webp"
              class="h-[20px] w-[20px] rounded-full object-cover"
              role="button"
            />
            <div class="flex items-end gap-1 translate-y-[-2px]">
              <span class="font-bold text-sm">{{ quoting.demonName }}</span>
              <span class="font-light text-text-color-secondary text-xs"
                >@{{ quoting.userName }} ¤
                {{ getDate(quoting.tuipCreatedAt) }}</span
              >
            </div>
          </header>
          <div class="content" v-html="textParse(quoting.tuipContent)"></div>
          <TuipMultimedia
            v-if="quoting.tuipMultimedia.length"
            :tuip="quoting"
          />
        </div>
        <TuipFooterButtons :tuip="tuip" />
      </div>
    </div>
  </div>
</template>

<style scoped>
span.effect {
  display: block;
  width: 2px;
  height: 10px;
  border-radius: 4px;
  background: rgba(150, 47, 6, 0.5);
  box-shadow: 0 0 4px rgba(238, 76, 11, 0.5);
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform-origin: center bottom;
  transition: transform 0.2s, opacity 0.45s;
  transition-timing-function: ease-out;
}

.likeButton:hover {
  transition: filter 0.2s;
}

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
