<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../../shared/stores/user/userStore";
import { CreateUser } from "../../shared/types/userTypes";
import router from "../../shared/router";

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const name = ref("");
const demonName = ref("");

async function register() {
  const createUser: CreateUser = {
    email: email.value,
    password: password.value,
    userName: name.value,
    demonName: demonName.value,
  };
  const register = await userStore.registerUser(createUser);

  if (register) {
    router.push("/");
  }
}
</script>

<template>
  <div
    class="border border-background-colors-tertiary bg-background-colors-secondary p-8 rounded-md min-w-[300ppx] w-[350px]"
  >
    <h1 class="mb-8 text-xl2 font-bold">Registro</h1>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="email">Nombre</label>
        <input
          v-model="name"
          class="w-full text-background-colors-primary outline-none px-2 py-1 rounded-xl"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="password">Nombre demonio</label>
        <input
          v-model="demonName"
          class="w-full text-background-colors-primary outline-none px-2 py-1 rounded-xl"
          type="text"
          id="demonName"
          name="demonName"
          required
        />
      </div>
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="email">Email</label>
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
        <label for="password">Password</label>
        <input
          v-model="password"
          class="w-full text-background-colors-primary outline-none px-2 py-1 rounded-xl"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <div class="flex justify-between">
        <button
          @click="$router.push('/login')"
          class="bg-background-colors-tertiary px-4 py-2 rounded-2xl w-fit text-lg"
        >
          Ir a Login
        </button>
        <button
          @click="register"
          :disabled="!email || !password || !name || !demonName"
          :title="
            !email || !password || !name || !demonName
              ? 'Completa los campos'
              : ''
          "
          class="bg-background-colors-tertiary px-4 py-2 rounded-2xl w-fit text-lg disabled:bg-opacity-20 disabled:text-text-color-tertiary"
        >
          Registrarse
        </button>
      </div>
    </div>
  </div>
</template>
