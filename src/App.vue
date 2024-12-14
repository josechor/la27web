<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "./shared/stores/user/userStore";
import router from "./shared/router";

const userStore = useUserStore();
const loading = ref(true);

onMounted(() => {
  userStore.reconstruct();
  if (userStore.userId === null) {
    userStore.logout();
    loading.value = false;
    router.push(window.location.pathname);
    return;
  }
  userStore.getLoggedUser();
  router.push(window.location.pathname);
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
