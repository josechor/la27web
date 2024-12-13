<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../shared/stores/user/userStore";
import router from "../../shared/router";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const invalid = ref(false);

async function login() {
  const logged = await userStore.authUser(email.value, password.value);
  if (logged) {
    invalid.value = false;
    router.push({ name: "/" });
  } else {
    invalid.value = true;
  }
}
</script>
<template>
  <div class="border border-[#333] p-8 rounded-md w-[300px]">
    <h1 class="mb-8">Loggin</h1>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="email">Email</label>
        <input
          v-model="email"
          class="w-full"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="password">Password</label>
        <input
          v-model="password"
          class="w-full"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <span v-if="invalid" class="text-red-600">DATOS INCORRECTOS PUTO BURRO</span>
      <div class="flex justify-end">
        <button @click="login" :disabled="!email || !password">Loggin</button>
      </div>
    </div>
  </div>
</template>
