<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../shared/stores/user/userStore";
import { User } from "../../shared/types/userTypes";

const userStore = useUserStore();

const route = useRoute();
const username = route.params.username;

const user: Ref<User | null> = ref(null);

onMounted(async () => {
  if (!username || typeof username !== "string") {
    console.error("El parámetro userId no es válido");
    return;
  }
  user.value = (await userStore.getUserData(username)) || null;
});
</script>
<template>
  {{ user }}
</template>
