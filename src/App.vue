<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "./shared/stores/user/userStore";
import router from "./shared/router";
import Sidebar from "./shared/components/Sidebar.vue";
import { computed } from "@vue/reactivity";
import Post from "./shared/components/Post.vue";
import { useTuipsStore } from "./shared/stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";
import SidebarMobile from "./shared/components/SidebarMobile.vue";
import Icon from "./shared/atoms/Icon.vue";
import ImageModal from "./shared/components/ImageModal.vue";
import { useMultimediaStore } from "./shared/stores/multimedia/multimediaStore";
const tuipsStore = useTuipsStore();
const { modalPost } = storeToRefs(tuipsStore);

const userStore = useUserStore();
const multimediaStore = useMultimediaStore();
const loading = ref(true);

const pathIsLogin = computed(() => {
  return (
    router.currentRoute.value.path === "/login" ||
    router.currentRoute.value.path === "/register"
  );
});

onMounted(async () => {
  const startTime = new Date().getTime();
  userStore.reconstruct();
  if (userStore.sessionToken === null) {
    userStore.logout();
    loading.value = false;
    router.push(window.location.pathname);
    return;
  }
  await userStore.getLoggedUser();
  router.push(window.location.pathname);
  const endTime = new Date().getTime();
  const time = endTime - startTime;
  if (time < 1500) {
    setTimeout(() => {
      loading.value = false;
    }, 1500 - time);
  } else {
    loading.value = false;
  }
});
</script>

<template>
  <template v-if="loading">
    <div class="w-screen h-screen flex items-center justify-center">
      <Icon name="bouncingCirclesIcon" :height="200" :width="200" />
    </div>
  </template>
  <div
    v-if="!loading"
    :class="[pathIsLogin ? 'flex items-center justify-center' : 'w-full lg:grid grid-cols-[250px_1fr] max-w-[1275px] m-auto']"
  >
    <Sidebar v-if="userStore.sessionToken" />
    <SidebarMobile v-if="userStore.sessionToken" />
    <main class="min-h-screen min-w-screen" :class="[pathIsLogin ? 'flex items-center justify-center' : '']">
      <RouterView />
      <Post v-if="userStore.loggedUser && modalPost" v-model="modalPost" />
      <ImageModal
        v-if="multimediaStore.isOpenModal"
        v-model="multimediaStore.isOpenModal"
      />
    </main>
  </div>
</template>

<style scoped></style>
