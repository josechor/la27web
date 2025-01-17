<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user/userStore";
import Icon from "../atoms/Icon.vue";
import router from "../router";
import Button from "../atoms/buttons/Button.vue";
import { useTuipsStore } from "../stores/tuips/tuipsStore";
import { Sidebar } from "../types/shared";

const userStore = useUserStore();
const { loggedUser } = storeToRefs(userStore);

const tuipsStore = useTuipsStore();
const { openModal } = tuipsStore;

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
  // {
  //     icon: "userIcon",
  //     name: "Sectas",
  //     router: `/Sectas`,
  // },
  {
    icon: "userIcon",
    name: "Perfil",
    router: `/profile/${loggedUser.value?.userName}`,
  },
];

function logout() {
  userStore.logout();
}

function redirect(route: string) {
  router.push(route);
}
</script>
<template>
  <nav
    class="h-screen text-left hidden lg:flex flex-col gap-4 p-4 justify-between sticky top-0 left-0"
  >
    <div>
      <div class="h-[100px]">
        <h1 class="text-3xl font-bold">Logo</h1>
      </div>
      <div
        v-for="item in sidebar"
        @click="redirect(item.router)"
        :key="item.name"
        class="py-5 text-xl flex flex-row gap-2 items-center cursor-pointer"
        role="button"
      >
        <Icon
          :stroke-width="
            $router.currentRoute.value.path === item.router ? 3 : 1
          "
          :name="item.icon"
          class=""
          :width="32"
          :height="32"
        />
        <span
          :class="
            $router.currentRoute.value.path === item.router ? 'font-bold' : ''
          "
          >{{ item.name }}</span
        >
      </div>
    </div>

    <Button @click="openModal()" text="Publicar" />

    <div>
      <div
        @click="logout"
        class="flex flex-row items-center gap-2 rounded-3xl p-2 hover:bg-[#333] cursor-pointer"
        role="button"
      >
        <img
          class="h-[30px] w-[30px] rounded-full"
          src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
          alt="user"
        />
        <div class="flex flex-col gap-0">
          <span class="font-bold">{{ loggedUser?.demonName }}</span
          ><span class="text-xs">@{{ loggedUser?.userName }}</span>
        </div>
        <div class="w-full text-end">...</div>
      </div>
    </div>
  </nav>
</template>
