<script lang="ts" setup>
defineProps({
  tuip: {
    type: Object as PropType<TuipInterface>,
    required: true,
  },
});

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

import { PropType } from "vue";
import router from "../../router";
import { TuipInterface } from "../../types/tuipsTypes";
</script>
<template>
  <div class="flex gap-2 item-center justify-between">
    <div class="flex gap-2 items-center">
      <div class="flex flex-col gap-1">
        <span
          @click.stop="router.push('/profile/' + tuip.userName)"
          class="text-sm font-bold cursor-pointer hover:underline"
          role="button"
          >{{ tuip.demonName }}</span
        >
        <span
          @click.stop="router.push('/profile/' + tuip.userName)"
          class="text-xs text-text-color-secondary font-light cursor-pointer hover:underline"
          role="button"
          >@{{ tuip.userName }}</span
        >
      </div>
      <span class="text-sm font-light">
        ¤ {{ getDate(tuip.tuipCreatedAt) }}</span
      >
    </div>
  </div>
</template>
