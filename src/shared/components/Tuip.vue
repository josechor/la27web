<script lang="ts" setup>
import { onMounted, PropType, Ref, ref, watch } from "vue";
import { TuipInterface } from "../types/tuipsTypes";
import router from "../router";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import Button from "../atoms/buttons/Button.vue";
import { ButtonSize } from "../types/shared";
import { useTuipsStore } from "../stores/tuips/tuipsStore";

const tuipsStore = useTuipsStore();
const { openPostModalWithQuoting } = tuipsStore;

const tuipsFetchApi = new TuipsFetchApi();

const props = defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
});

const tuipRef = ref(props.tuip);

const quoting: Ref<TuipInterface | null> = ref(null);
onMounted(async () => {
  if (tuipRef.value.quoting) {
    quoting.value = await tuipsFetchApi.getTuipById(tuipRef.value.quoting);
  }
});

watch(
  () => props.tuip,
  async (newVal) => {
    tuipRef.value = newVal;
    if (tuipRef.value.quoting) {
      quoting.value = await tuipsFetchApi.getTuipById(tuipRef.value.quoting);
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

function handleClickCitar() {
  openPostModalWithQuoting(tuipRef.value);
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
      <div class="flex gap-2 item-center justify-between">
        <div class="flex gap-2 items-center">
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
          <span class="text-sm font-light">
            ¤ {{ getDate(tuip.tuipCreatedAt) }}</span
          >
        </div>
        <Button
          @click="handleClickCitar"
          text="citar"
          :size="ButtonSize.extraSmall"
        />
      </div>
      <span>{{ tuip.tuipContent }}</span>
      <div
        v-if="quoting"
        class="px-2 py-3 border rounded-md border-light-background-colors-quaternary dark:border-dark-background-color-quaternary"
      >
        <header class="flex flex-row gap-1">
          <img
            src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
            alt="user"
            class="h-[20px] w-[20px] rounded-full"
          />
          <span class="font-bold text-sm">{{ quoting.demonName }}</span>
          <span class="font-light text-sm"
            >@{{ quoting.userName }} ¤
            {{ getDate(quoting.tuipCreatedAt) }}</span
          >
        </header>
        <section>
          <span>{{ quoting.tuipContent }}</span>
        </section>
      </div>
      <div class="flex w-2/3 m-auto justify-between text-xs">
        <div
          class="flex flex-row gap-[2px] cursor-pointer"
          :class="{ 'grayscale-[100%]': !tuipRef.youLiked }"
          @click="handleClickLike"
        >
          <img
            src="../../shared/utils/images/antorcha.png"
            class="w-[16px] h-[16px]"
          />
          {{ tuip.magradaCount }}
        </div>
        <span>M</span>
        <span>S</span>
      </div>
    </div>
  </div>
</template>
