<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../shared/stores/user/userStore";
import { User } from "../../shared/types/userTypes";
import Button from "../../shared/atoms/buttons/Button.vue";
import { ButtonSize } from "../../shared/types/shared";
import { computed } from "@vue/reactivity";
import { TuipsFetchApi } from "../../shared/services/tuips/tuipsFetchApi";
import { TuipInterface } from "../../shared/types/tuipsTypes";
import router from "../../shared/router";
import UserTuips from "../components/UserTuips.vue";
import BestTuips from "../components/BestTuips.vue";
import LikedTuips from "../components/LikedTuips.vue";
import { storeToRefs } from "pinia";
import { UserFetchApi } from "../../shared/services/user/UserFetchApi";

const tuipsFetchApi = new TuipsFetchApi();
const userFetchApi = new UserFetchApi();
const userStore = useUserStore();
const { loggedUser } = storeToRefs(userStore);

const route = useRoute();
let username = route.params.username;

const user: Ref<User | null> = ref(null);

const tuips: Ref<TuipInterface[]> = ref([]);
const page = ref(1);
const limit = 20;

const currentTab = ref("tuips");
const loading = ref(false);

onMounted(() => {
  startProfile();
});

watch(
  () => route.params.username,
  () => {
    username = route.params.username;
    startProfile();
  }
);

async function startProfile() {
  loading.value = true;
  if (!username || typeof username !== "string") {
    console.error("El parámetro userId no es válido");
    loading.value = false;
    return;
  }
  user.value = (await userStore.getUserData(username)) || null;
  tuips.value = await tuipsFetchApi.getTuips(page.value, limit, {
    authorId: user.value?.userId,
  });
  loading.value = false;
}

async function handleClickFollow() {
  if (!user.value || user.value.followed === undefined) return;
  if (user.value.followed) {
    await userFetchApi.unfollowUser(user.value.userName);
    user.value.followers--;
    user.value.followed = false;
  } else {
    await userFetchApi.followUser(user.value.userName);
    user.value.followers++;
    user.value.followed = true;
  }
}

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const getUserBirthday = computed(() => {
  console.log(user.value?.birthday);
  if (!user.value?.birthday) return "";
  const date = new Date(user.value.birthday);
  return `${date.getDate()} de ${
    months[date.getMonth()]
  } de${date.getFullYear()}`;
});

const getUserCreatedAt = computed(() => {
  if (!user.value?.createdAt) return "";
  const date = new Date(user.value.createdAt);
  return `Cuenta creada el ${date.getDate()} de ${
    months[date.getMonth()]
  } de ${date.getFullYear()}`;
});

function handleClickEdit() {
  console.log("Edit");
}
</script>
<template>
  <div class="flex gap-6" v-if="user && !loading">
    <section
      class="border border-y-transparent border-x-light-background-colors-quaternary dark:border-x-dark-background-color-quaternary w-full lg:w-[65%] min-h-screen"
    >
      <header
        class="border border-x-0 border-t-0 border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary"
      >
        <div class="flex flex-row gap-10 items-center p-6 py-4">
          <span @click="router.go(-1)"><--</span>
          <div class="flex flex-col gap-0 items-start text-left">
            <span class="font-bold text-lg">{{ user.demonName }}</span>
            <span class="text-xs">{{ user.tuipsCount }} tuips</span>
          </div>
        </div>
        <div class="relative">
          <img
            class="w-full h-[200px] object-cover"
            src="https://www.excelsior.com.mx/media/styles/image1200x630/public/pictures/2024/11/21/3216015.jpg"
            alt=""
          />
          <img
            class="h-[80px] w-[80px] rounded-full absolute -bottom-[40px] left-0"
            src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
            alt="user"
          />
        </div>
        <div class="flex justify-end items-center p-6">
          <template v-if="loggedUser?.userId !== user.userId">
            <Button
              v-if="user.followed"
              @click="handleClickFollow"
              :size="ButtonSize.large"
              text="Dejar seguir"
              class=""
            />
            <Button
              v-else
              @click="handleClickFollow"
              :size="ButtonSize.large"
              text="Seguir"
              class=""
            />
          </template>
          <Button
            v-else
            @click="handleClickEdit"
            :size="ButtonSize.large"
            text="Editar perfil"
            class=""
          />
        </div>
        <div class="flex flex-col gap-4 px-6">
          <div class="flex flex-col gap-0.5">
            <span class="font-bold text-lg">{{ user.demonName }}</span>
            <span class="font-light text-sm">@{{ user.userName }}</span>
          </div>
          <span v-if="user.description">{{ user.description }}</span>
          <div>
            <span v-if="user.birthday">{{ getUserBirthday }}</span>
            <span v-if="user.createdAt">{{ getUserCreatedAt }}</span>
          </div>
          <div class="flex flex-row gap-4 text-sm">
            <div class="flex gap-[2px]">
              <span class="font-extrabold">{{ user.following }}</span
              ><span>Siguiendo</span>
            </div>
            <div class="flex gap-[2px]">
              <span class="font-extrabold">{{ user.followers }}</span
              ><span>seguidores</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-around gap-2 mt-6">
          <div
            class="flex flex-col gap-2 relative cursor-pointer"
            @click="currentTab = 'tuips'"
          >
            <span
              class="cursor-pointer"
              :class="[
                currentTab === 'tuips'
                  ? 'font-bold text-light-text-color-primary'
                  : 'text-light-text-color-tertiary',
              ]"
              >Tuips</span
            >
            <div class="light" v-show="currentTab === 'tuips'"></div>
            <div
              v-show="currentTab === 'tuips'"
              class="h-[2px] w-full bg-violet-400"
            ></div>
          </div>
          <div
            class="flex flex-col gap-2 relative cursor-pointer"
            @click="currentTab = 'likes'"
          >
            <span
              class="cursor-pointer"
              :class="[
                currentTab === 'likes'
                  ? 'font-bold text-light-text-color-primary'
                  : 'text-light-text-color-tertiary',
              ]"
              >Me gusta</span
            >
            <div class="light" v-show="currentTab === 'likes'"></div>
            <div
              v-show="currentTab === 'likes'"
              class="h-[2px] w-full bg-violet-400"
            ></div>
          </div>
          <div
            class="flex flex-col gap-2 relative cursor-pointer"
            @click="currentTab = 'bestTuips'"
          >
            <span
              class="cursor-pointer"
              :class="[
                currentTab === 'bestTuips'
                  ? 'font-bold text-light-text-color-primary'
                  : 'text-light-text-color-tertiary',
              ]"
              >Destacados</span
            >
            <div class="light" v-show="currentTab === 'bestTuips'"></div>
            <div
              v-show="currentTab === 'bestTuips'"
              class="h-[2px] w-full bg-violet-400"
            ></div>
          </div>
        </div>
      </header>
      <section class="py-1">
        <UserTuips :user-id="user.userId" v-if="currentTab === 'tuips'" />
        <LikedTuips :user-id="user.userId" v-if="currentTab === 'likes'" />
        <BestTuips :user-id="user.userId" v-if="currentTab === 'bestTuips'" />
      </section>
    </section>
    <section class="w-[350px] hidden xl:block"></section>
  </div>
</template>

<style>
.light {
  position: absolute;
  background-color: violet;
  background: linear-gradient(
    0deg,
    rgba(238, 130, 238, 0.356) 0%,
    transparent 100%
  );
  height: 25px;
  width: 150%;
  translate: -50%;
  bottom: 0;
  left: 50%;
  clip-path: polygon(0 0%, 100% 0%, 81% 100%, 19% 100%);
}
</style>
