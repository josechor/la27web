<script lang="ts" setup>
import { PropType } from "vue";
import { ISecta } from "../types/types";
import Image from "../../shared/atoms/Image.vue";

defineProps({
  secta: {
    type: Object as PropType<ISecta>,
    required: true,
  },
});
</script>
<template>
  <div
    @click="$router.push(`sectas/${secta.sectaId}`)"
    class="flex flex-row gap-4 p-4 cursor-pointer"
  >
    <Image :src="secta.sectaPicture" class="w-[70px] h-[70px]" />
    <div class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">{{ secta.sectaName }}</h2>
      <p class="text-xs font-light">{{ secta.sectaDescription }}</p>
    </div>
  </div>
</template>
