<script lang="ts" setup>
import { ref, watch } from "vue";

const domain = window.location.href.includes("192.168.1")
  ? import.meta.env.VITE_API_URL
  : import.meta.env.VITE_API_URL_PROD;

const props = defineProps({
  src: {
    type: [String, null],
    required: true,
  },
  errorsrc: {
    type: String,
    default: "default-image.webp",
  },
  alt: {
    type: String,
    default: "Placeholder image",
  },
});

const imgSrc = ref(`${domain}/multimedia/${props.src}`);
const defaultImg = new URL(`../utils/images/${props.errorsrc}`, import.meta.url)
  .href;

const onError = () => {
  imgSrc.value = defaultImg;
};

watch(
  () => props.src,
  () => {
    imgSrc.value = `${domain}/multimedia/${props.src}`;
  }
);
</script>

<template>
  <img :src="imgSrc" :alt="alt" @error="onError" />
</template>
