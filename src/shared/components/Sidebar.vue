<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user/userStore";
import Icon from "../atoms/Icon.vue";
import router from "../router";

interface Sidebar {
  icon: string;
  name: string;
  router: string;
}

const userStore = useUserStore();
const { loggedUser } = storeToRefs(userStore);

const sidebar: Sidebar[] = [
  {
    icon: "homeIcon",
    name: "Inicio",
    router: "/",
  },
  {
    icon: "searchIcon",
    name: "Buscar",
    router: "/search",
  },
  {
    icon: "userIcon",
    name: "Perfil",
    router: `/profile/${loggedUser.value?.demonName}`,
  },
];

function logout() {
  userStore.logout();
}

function redirect(route: string) {
  router.push(route);
}

function handleDarkMode() {
  document.body.classList.toggle("dark");
}
</script>
<template>
  <nav
    class="h-screen text-left flex flex-col gap-4 py-4 justify-between sticky top-0 left-0"
  >
    <div>
      <div class="h-[100px]">
        <h1 class="text-3xl font-bold">Logo</h1>
      </div>
      <div
        v-for="item in sidebar"
        @click="redirect(item.router)"
        :key="item.name"
        class="h-[55px] text-xl font-bold flex flex-row gap-2 items-center cursor-pointer"
      >
        <Icon :name="item.icon" class="" custom-class="w-[24px] h-[24px]" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div @click="handleDarkMode">Modo oscuro</div>
    <div>
      <div
        class="flex flex-row items-center gap-2 rounded-3xl p-2 hover:bg-[#333] cursor-pointer"
        @click="logout"
      >
        <img
          class="h-[30px] w-[30px] rounded-full"
          src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
          alt="user"
        />
        <div class="flex flex-col gap-0">
          <span class="font-bold">{{ loggedUser?.demonName }}</span
          ><span class="text-xs">@{{ loggedUser?.demonName }}</span>
        </div>
        <div class="w-full text-end">...</div>
      </div>
    </div>
  </nav>
</template>
