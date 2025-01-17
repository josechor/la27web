<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user/userStore";
import { Sidebar } from "../types/shared";
import Icon from "../atoms/Icon.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useTuipsStore } from "../stores/tuips/tuipsStore";

const userStore = useUserStore();
const { loggedUser } = storeToRefs(userStore);

const tuipsStore = useTuipsStore();
const { openModal } = tuipsStore;

const sidebarMobile: Sidebar[] = [
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
  //   icon: "userIcon",
  //   name: "Sectas",
  //   router: `/Sectas`,
  // },
  {
    icon: "userIcon",
    name: "Perfil",
    router: `/profile/${loggedUser.value?.userName}`,
  },
];

let sidebarMobileComponent = document.getElementById("sidebarMobile");
let sidebarMobileButton = document.getElementById("sidebarMobileButton");

onMounted(async () => {
  window.addEventListener("scroll", onScroll);
  sidebarMobileComponent = document.getElementById("sidebarMobile");
  sidebarMobileButton = document.getElementById("sidebarMobileButton");
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

let lastChange = ref(0);
let lastUpdate = ref(0);
let direction = ref("down");
const onScroll = () => {
  if (window.scrollY > lastUpdate.value) {
    if (direction.value === "up") {
      lastChange.value = window.scrollY;
    }
    if (window.scrollY - lastChange.value > 400) {
      //@ts-ignore
      sidebarMobileComponent.style.bottom = "-100px";
      //@ts-ignore
      sidebarMobileButton.style.scale = "0";
    }
    direction.value = "down";
  } else {
    if (direction.value === "down") {
      lastChange.value = window.scrollY;
    }
    if (window.scrollY - lastChange.value < 400) {
      //@ts-ignore
      sidebarMobileComponent.style.bottom = "0";
      //@ts-ignore
      sidebarMobileButton.style.scale = "1";
    }
    direction.value = "up";
  }
  lastUpdate.value = window.scrollY;
};
</script>
<template>
  <div
    class="lg:hidden flex flex-row justify-around gap-2 bg-background-colors-quaternary fixed bottom-0 w-full bg-opacity-100 transition-all duration-300 z-[100]"
    id="sidebarMobile"
  >
    <div
      @click="openModal()"
      class="p-3 z-[100] rounded-full bg-purple-primary absolute -top-[150%] right-2 transition-all duration-300 cursor-pointer"
      id="sidebarMobileButton"
    >
      <Icon name="plusIcon" :width="24" :height="24" class="" />
    </div>
    <div
      v-for="item in sidebarMobile"
      @click="$router.push(item.router)"
      class="p-3 cursor-pointer"
      :class="
        $router.currentRoute.value.path === item.router
          ? 'bg-purple-primary rounded-xl bg-opacity-50'
          : ''
      "
    >
      <Icon :name="item.icon" :width="24" :height="24" />
    </div>
  </div>
</template>
