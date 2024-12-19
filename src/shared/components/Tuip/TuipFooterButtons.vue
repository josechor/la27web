<script lang="ts" setup>
import { PropType, ref, watch } from "vue";
import { TuipInterface } from "../../types/tuipsTypes";
import { useTuipsStore } from "../../stores/tuips/tuipsStore";
import { TuipsFetchApi } from "../../services/tuips/tuipsFetchApi";
import Icon from "../../atoms/Icon.vue";
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

const tuipsStore = useTuipsStore();
const { openPostModalWithQuoting, openPostModalWithResponse } = tuipsStore;

function handleClickCitar(tuip: TuipInterface) {
  openPostModalWithQuoting(tuip);
}

function handleClickResponse(tuip: TuipInterface) {
  openPostModalWithResponse(tuip);
}

let loadingLike = false;

async function handleClickLike(e: Event) {
  if (loadingLike) return;
  loadingLike = true;
  const fetchTuipApi = new TuipsFetchApi();
  if (tuipRef.value.youLiked) {
    await fetchTuipApi.removeLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = false;
    tuipRef.value.likesCount--;
  } else {
    efect(e);
    await fetchTuipApi.setLike(tuipRef.value.tuipId);
    tuipRef.value.youLiked = true;
    tuipRef.value.likesCount++;
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
</script>
<template>
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
        src="../../../shared/utils/images/antorcha.png"
        class="w-[16px] h-[16px]"
      />
      {{ tuip.likesCount }}
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
</template>
