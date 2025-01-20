<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../shared/stores/user/userStore";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const invalid = ref(false);

async function login() {
  const logged = await userStore.authUser(email.value, password.value);
  if (logged) {
    invalid.value = false;
    window.location.reload();
  } else {
    invalid.value = true;
  }
}
</script>
<template>
  <div
    class="border border-background-colors-tertiary bg-background-colors-secondary p-8 rounded-md min-w-[300ppx] w-[350px]"
  >
    <h1 class="mb-8 text-xl2 font-bold">Loggin</h1>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="email" class="pl-2">Email</label>
        <input
          v-model="email"
          class="w-full text-background-colors-primary outline-none px-2 py-1 rounded-xl"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="password" class="pl-2">Password</label>
        <input
          v-model="password"
          class="w-full text-background-colors-primary outline-none px-2 py-1 rounded-xl"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <span v-if="invalid" class="text-red-600"
        >DATOS INCORRECTOS PUTO BURRO</span
      >
      <div class="flex justify-between">
        <button
          class="bg-background-colors-tertiary px-4 py-2 rounded-2xl w-fit text-lg"
          @click="$router.push('/register')"
        >
          Ir a Registrarse
        </button>
        <button
          :disabled="!email || !password"
          @click="login"
          :title="!email || !password ? 'Completa los campos' : ''" 
          class="bg-background-colors-tertiary px-4 py-2 rounded-2xl w-fit text-lg disabled:bg-opacity-20 disabled:text-text-color-tertiary"
        >
          Loggin
        </button>
      </div>
    </div>
  </div>
</template>
