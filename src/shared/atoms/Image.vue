
<script lang="ts" setup>
import { ref } from 'vue';

const domain = import.meta.env.VITE_API_URL;

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
const defaultImg = new URL(`../utils/images/${props.errorsrc}`, import.meta.url).href;

const onError = () => {
  imgSrc.value = defaultImg;
};
</script>

<template>
  <img :src="imgSrc" :alt="alt" @error="onError" />
</template>