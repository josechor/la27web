<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "./shared/stores/user/userStore";

const userStore = useUserStore();
const loading = ref(true);

onMounted(() => {
  userStore.reconstruct();
  if (userStore.getLoggedUser() === null) {
    userStore.logout();
    return;
  }
  userStore.getLoggedUser();
  loading.value = false;
});
</script>

<template>
  <template v-if="loading">
    <h1>Loading...</h1>
  </template>
  <template v-if="!loading">
    <main>
      <RouterView />
    </main>
  </template>
</template>

<style scoped></style>
