<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "./shared/stores/user/userStore";
import router from "./shared/router";
import Sidebar from "./shared/components/Sidebar.vue";

const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  userStore.reconstruct();
  if (userStore.userId === null) {
    userStore.logout();
    loading.value = false;
    router.push(window.location.pathname);
    return;
  }
  await userStore.getLoggedUser();
  router.push(window.location.pathname);
  loading.value = false;
});
</script>

<template>
  <template v-if="loading">
    <h1>Loading...</h1>
  </template>
  <div
    v-if="!loading"
    class="flex flex-row items-center justify-center h-screen"
  >
    <Sidebar class="w-[250px] px-4" v-if="userStore.userId"/>
    <main class="w-[1000px] h-screen">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
