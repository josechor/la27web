<script lang="ts" setup>
import { useUserStore } from '../stores/user/userStore';

interface Sidebar {
  icon: string;
  name: string;
  router: string;
}

const userStore  = useUserStore();

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
];

function logout() {
    userStore.logout();
}
</script>
<template>
  <nav class="h-screen text-left flex flex-col py-4 justify-between sticky top-0 left-0">
    <div>
      <div class="h-[100px]">
        <h1 class="text-3xl font-bold">Logo</h1>
      </div>
      <div
        v-for="item in sidebar"
        @click="$router.push(item.router)"
        :key="item.name"
        class="h-[55px] text-xl font-bold"
      >
        <span>{{ item.icon }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="flex flex-row items-center gap-2 p-2 rounded-3xl hover:bg-[#333] cursor-pointer" @click="logout">
      <img
      class="h-[30px] w-[30px] rounded-full"
        src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
        alt="user"
      />
      <div class="flex flex-col gap-0"><span class="font-bold">Jose</span><span class="text-xs">@ElParli</span></div>
      <div class="w-full text-end">...</div>
    </div>
  </nav>
</template>
