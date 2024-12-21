<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
let sectaId = route.params.sectaId;
</script>
<template>
    Secta {{ sectaId }}
</template>