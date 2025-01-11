<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "./shared/stores/user/userStore";
import router from "./shared/router";
import Sidebar from "./shared/components/Sidebar.vue";
import { computed } from "@vue/reactivity";
import Post from "./shared/components/Post.vue";
import { useTuipsStore } from "./shared/stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";

const tuipsStore = useTuipsStore();
const { modalPost } = storeToRefs(tuipsStore);

const userStore = useUserStore();
const loading = ref(true);

const pathIsLogin = computed(() => {
  return (
    router.currentRoute.value.path === "/login" ||
    router.currentRoute.value.path === "/register"
  );
});

onMounted(async () => {
  userStore.reconstruct();
  if (userStore.sessionToken === null) {
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
  <div v-if="!loading" class="flex flex-row justify-center w-full relative">
    <Sidebar class="w-[250px] px-4" v-if="userStore.sessionToken" />
    <main
      :class="[!pathIsLogin ? 'max-w-[1500px] w-[1500px] min-h-screen' : '']"
    >
      <RouterView />
      <Post v-if="userStore.loggedUser && modalPost" v-model="modalPost" />
    </main>
  </div>
</template>

<style scoped></style>
