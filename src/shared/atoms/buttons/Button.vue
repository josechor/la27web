<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import { ButtonSize } from "../../types/shared";

defineProps({
  text: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: ButtonSize.medium,
  },
});
</script>
<template>
  <button
    class="bg-lig bg-purple-primary text-text-color-primary rounded-3xl cursor-pointer"
    :class="[
      {
        'px-2 py-1 text-xs': size === ButtonSize.extraSmall,
        'px-3 py-1.5 text-xs': size === ButtonSize.small,
        'px-4 py-2 text-sm': size === ButtonSize.medium,
        'px-4 py-2 text-base': size === ButtonSize.large,
        'cursor-default bg-opacity-80': disabled,
      },
    ]"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
