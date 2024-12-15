<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  },
});

const iconSvg = ref<string | null>(null);
const iconPath = ref<string>(`/src/shared/utils/icons/${props.name}.svg`);

watch(
  () => props.name,
  async (newName) => {
    try {
      const svg = await import(`../utils/icons/${newName}.svg?raw`);
      iconSvg.value = svg.default || svg;
    } catch (e) {
      console.error(`Icon "${newName}" not found.`);
      iconSvg.value = null;
    }
  },
  { immediate: true }
);
</script>

<template>
  <span
    v-if="iconPath"
    class="icon w-[24px] h-[24px]"
    :class="[`icon-${name}`, customClass]"
    v-html="iconSvg"
  />
</template>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  fill: currentColor;
}
</style>
