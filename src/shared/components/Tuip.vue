<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
import { TuipInterface } from "../types/tuipsTypes";
import router from "../router";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";

const props = defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
});

const tuipRef = ref(props.tuip);
watch(
  () => props.tuip,
  (newVal) => {
    tuipRef.value = newVal;
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

let loadingLike = false;

async function handleClickLike() {
  if (loadingLike) return;
  loadingLike = true;
  const fetchTuipApi = new TuipsFetchApi();
  if (tuipRef.value.youLiked) {
    await fetchTuipApi.removeLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = false;
    tuipRef.value.magradaCount--;
  } else {
    await fetchTuipApi.setLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = true;
    tuipRef.value.magradaCount++;
  }
  loadingLike = false;
}
</script>
<template>
  <div
    class="flex gap-4 justify-around border border-transparent border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary w-full px-3 py-2"
  >
    <img
      @click="router.push('/profile/' + tuip.userName)"
      src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
      alt="user"
      class="h-[40px] w-[40px] rounded-full cursor-pointer"
    />
    <div class="w-full flex flex-col gap-2">
      <div class="flex gap-2 item-center justify-start">
          <span
            @click="router.push('/profile/' + tuip.userName)"
            class="text-sm font-bold cursor-pointer hover:underline"
            >{{ tuip.demonName }}</span
          >
          <span
            @click="router.push('/profile/' + tuip.userName)"
            class="text-sm font-light cursor-pointer hover:underline"
            >@{{ tuip.userName }}</span
          >
        <span class="text-sm font-light"> ¤ {{
          getDate(tuip.tuipCreatedAt)
        }}</span>
      </div>
      <span>{{ tuip.tuipContent }}</span>
      <div class="flex w-2/3 m-auto justify-between text-xs">
        <span @click="handleClickLike">{{ tuip.magradaCount }}</span>
        <span>M</span>
        <span>S</span>
      </div>
    </div>
  </div>
</template>
