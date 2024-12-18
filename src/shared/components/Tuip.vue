<script lang="ts" setup>
import { onMounted, PropType, Ref, ref, watch } from "vue";
import { TuipInterface } from "../types/tuipsTypes";
import router from "../router";
import { TuipsFetchApi } from "../services/tuips/tuipsFetchApi";
import { useTuipsStore } from "../stores/tuips/tuipsStore";
import Icon from "../atoms/Icon.vue";

const tuipsStore = useTuipsStore();
const { openPostModalWithQuoting, openPostModalWithResponse } = tuipsStore;

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

let loadingLike = false;

async function handleClickLike(e: Event) {
  if (loadingLike) return;
  loadingLike = true;
  const fetchTuipApi = new TuipsFetchApi();
  if (tuipRef.value.youLiked) {
    await fetchTuipApi.removeLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = false;
    tuipRef.value.magradaCount--;
  } else {
    efect(e);
    await fetchTuipApi.setLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = true;
    tuipRef.value.magradaCount++;
  }
  loadingLike = false;
}

async function handleClickLikeParent(e: Event) {
  if (!parent.value) return;
  if (loadingLike) return;
  loadingLike = true;
  const fetchTuipApi = new TuipsFetchApi();
  if (parent.value.youLiked) {
    await fetchTuipApi.removeLike(parent.value.tuipId);
    parent.value.youLiked = false;
    parent.value.magradaCount--;
  } else {
    efect(e);
    await fetchTuipApi.setLike(parent.value.tuipId);
    parent.value.youLiked = true;
    parent.value.magradaCount++;
  }
  loadingLike = false;
}

function efect(e: any) {
  let div = document.createElement("div");
  document.querySelector("body")?.appendChild(div);
  div.style.left = e.pageX + "px";
  div.style.top = e.pageY + "px";
  div.style.position = "absolute";
  const maxElems = 10;
  for (let i = 0; i < maxElems; i++) {
    let span = document.createElement("span");
    span.className = "effect";
    span.style.opacity = "1";
    span.style.transition = "transform 0.45s, opacity 0.45s";
    let newSpan = div.appendChild(span);
    let deg = i * (360 / maxElems) + Math.floor(Math.random() * 15);
    let height = 10 + Math.floor(Math.random() * 5);
    let width = 2 + Math.floor(Math.random() * 1);
    newSpan.style.height = height + "px";
    newSpan.style.width = width + "px";
    newSpan.style.transform = "rotate(" + deg + "deg)";
  }

  setTimeout(() => {
    Array.from(div.querySelectorAll("span")).forEach((el) => {
      let trasY = -50 - Math.floor(Math.random() * 10);
      el.style.transform += "scaleY(0.5) translateY(" + trasY + "px)";
      el.style.opacity = "0";
    });
    setTimeout(() => {
      document.body.removeChild(div);
    }, 400);
  }, 20);
}

function handleClickCitar(tuip: TuipInterface) {
  openPostModalWithQuoting(tuip);
}

function handleClickResponse(tuip: TuipInterface) {
  openPostModalWithResponse(tuip);
}
</script>
<template>
  <div class="w-full cursor-pointer">
    <div
      v-if="parent !== null"
      class="flex gap-4 justify-around w-full px-3 py-2 relative pb-5 tuip"
    >
      <div
        class="w-[2px] bg-light-background-colors-tertiary dark:bg-dark-background-color-tertiary absolute top-[8px] left-[37px] h-full z-0"
      ></div>
      <img
        @click.stop="router.push('/profile/' + parent.userName)"
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
        class="h-[50px] w-[50px] rounded-full cursor-pointer z-10"
      />
      <div class="w-full flex flex-col gap-1">
        <div class="flex gap-2 item-center justify-between">
          <div class="flex gap-2 items-center">
            <div class="flex flex-col gap-0.5">
              <span
                @click.stop="router.push('/profile/' + parent.userName)"
                class="text-xs font-bold cursor-pointer hover:underline"
                >{{ parent.demonName }}</span
              >
              <span
                @click.stop="router.push('/profile/' + parent.userName)"
                class="text-xs font-light cursor-pointer hover:underline"
                >@{{ parent.userName }}</span
              >
            </div>
            <span class="text-sm font-light">
              ¤ {{ getDate(parent.tuipCreatedAt) }}</span
            >
          </div>
        </div>
        <span>{{ parent.tuipContent }}</span>
        <div class="flex w-full m-auto justify-between text-xs mt-3">
          <div
            @click.stop="handleClickResponse(parent)"
            class="flex flex-row gap-0.5 cursor-pointer"
          >
            <Icon name="responseIcon" :width="16" :height="16" />
          </div>
          <div
            @click.stop="handleClickLikeParent"
            :class="{ 'grayscale-[100%]': !parent.youLiked }"
            class="flex flex-row gap-[2px] cursor-pointer"
          >
            <img
              src="../../shared/utils/images/antorcha.png"
              class="w-[16px] h-[16px]"
            />
            {{ parent.magradaCount }}
          </div>
          <Icon
            @click.stop="handleClickCitar(parent)"
            name="quotingIcon"
            :width="16"
            :height="16"
          />
          <div>
            <Icon name="shareIcon" :width="16" :height="16" />
          </div>
        </div>
      </div>
    </div>
    <div
      @click="console.log('hijo')"
      class="flex gap-4 justify-around border border-transparent border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary w-full px-3 py-2 tuip"
    >
      <img
        @click.stop="router.push('/profile/' + tuip.userName)"
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
        class="h-[50px] w-[50px] rounded-full cursor-pointer"
      />
      <div class="w-full flex flex-col gap-1">
        <div class="flex gap-2 item-center justify-between">
          <div class="flex gap-2 items-center">
            <div class="flex flex-col gap-0.5">
              <span
                @click.stop="router.push('/profile/' + tuip.userName)"
                class="text-xs font-bold cursor-pointer hover:underline"
                >{{ tuip.demonName }}</span
              >
              <span
                @click.stop="router.push('/profile/' + tuip.userName)"
                class="text-xs font-light cursor-pointer hover:underline"
                >@{{ tuip.userName }}</span
              >
            </div>
            <span class="text-sm font-light">
              ¤ {{ getDate(tuip.tuipCreatedAt) }}</span
            >
          </div>
        </div>
        <div class="content">{{ tuip.tuipContent }}</div>
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
        <div class="flex w-full m-auto justify-between text-xs mt-3">
          <div
            @click.stop="handleClickResponse(tuip)"
            class="flex flex-row gap-0.5 cursor-pointer"
          >
            <Icon name="responseIcon" :width="16" :height="16" />
          </div>
          <div
            @click.stop="handleClickLike"
            :class="[
              tuipRef.youLiked
                ? 'grayscale-0 hover:grayscale-[40%]'
                : 'grayscale-[100%] hover:grayscale-[60%]',
            ]"
            class="flex flex-row gap-[2px] cursor-pointer"
          >
            <img
              src="../../shared/utils/images/antorcha.png"
              class="w-[16px] h-[16px]"
            />
            {{ tuip.magradaCount }}
          </div>
          <Icon
            @click.stop="handleClickCitar(tuip)"
            name="quotingIcon"
            :width="16"
            :height="16"
          />
          <div>
            <Icon name="shareIcon" :width="16" :height="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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
}
</style>
