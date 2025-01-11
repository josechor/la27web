<script lang="ts" setup>
import { ref } from 'vue';

const domain = window.location.href.includes('192.168.1.136') ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL;

const props = defineProps({
  src: {
    type: [String, null], 
    required: true,
  },
  errorsrc: {
    type: String,
    default: "default-video.mp4",
  },
  controls: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: false, 
  },
  muted: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false, 
  },
});

const videoSrc = ref(`${domain}/multimedia/${props.src}`);

const defaultVideo = new URL(`../utils/videos/${props.errorsrc}`, import.meta.url).href;

const onError = () => {
  videoSrc.value = defaultVideo;
};
</script>

<template>
  <video
    :src="videoSrc"
    :controls="controls"
    :autoplay="autoplay"
    :muted="muted"
    :loop="loop"
    @error="onError"
  >
    Tu navegador no soporta el elemento de video.
  </video>
</template>