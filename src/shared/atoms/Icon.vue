<script lang="ts" setup>
import { defineAsyncComponent, watch } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  stroke: {
    type: String,
    default: "#fff",
  },
  fill: {
    type: String,
    default: "none",
  },
  width: {
    type: Number,
    default: 14,
  },
  height: {
    type: Number,
    default: 14,
  },
  title: {
    type: String,
    default: "",
  },
  iconCustomClass: {
    type: String,
    default: "",
  },
  strokeWidth: {
    type: Number,
    default: 1.33,
  },
});

let Icon = defineAsyncComponent(() => import(`../utils/icons/${props.name}.svg`));

watch(
  () => props.name,
  () => {
    Icon = defineAsyncComponent(() => import(`../utils/icons/${props.name}.svg`));
  }
);
</script>

<template>
  <div :title="title" :style="{ width: width + 'px', height: height + 'px' }">
    <Icon
      :stroke="stroke"
      :fill="fill"
      :stroke-width="strokeWidth"
      :class="iconCustomClass"
      :width="width"
      :height="height"
    />
  </div>
</template>