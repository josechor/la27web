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
    user_name: name.value,
    demon_name: demonName.value,
  };
  const register = await userStore.registerUser(createUser);

  if (register) {
    router.push("/");
  }
}
</script>

<template>
  <div class="border border-[#333] p-8 rounded-md w-[300px]">
    <h1 class="mb-8">Loggin</h1>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col mb-1 justify-start items-start gap-1">
        <label for="email">Nombre</label>
        <input
          v-model="name"
          class="w-full"
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
          class="w-full"
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
      <div class="flex justify-end">
        <button
          @click="register"
          :disabled="!email || !password || !name || !demonName"
        >
          Loggin
        </button>
      </div>
    </div>
  </div>
</template>
