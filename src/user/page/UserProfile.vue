<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../../shared/stores/user/userStore";
import { User } from "../../shared/types/userTypes";
import Button from "../../shared/atoms/buttons/Button.vue";
import { ButtonSize } from "../../shared/types/shared";
import { computed } from "@vue/reactivity";
import { TuipsFetchApi } from "../../shared/services/tuips/tuipsFetchApi";
import Tuip from "../../shared/components/Tuip.vue";
import { Tuip as TuipInterface } from "../../shared/types/tuipsTypes";
import router from "../../shared/router";

const tuipsFetchApi = new TuipsFetchApi();
const userStore = useUserStore();

const route = useRoute();
const username = route.params.username;

const user: Ref<User | null> = ref(null);

const tuips: Ref<TuipInterface[]> = ref([]);
const page = ref(1);
const limit = 20;
onMounted(async () => {
  if (!username || typeof username !== "string") {
    console.error("El parámetro userId no es válido");
    return;
  }

  Promise.all([
    userStore.getUserData(username),
    tuipsFetchApi.getTuips(page.value, limit),
  ]).then(([userData, tuipsData]) => {
    user.value = userData || null;
    tuips.value = tuipsData;
  });
});

function handleClickFollow() {
  console.log("Follow");
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
</script>
<template>
  <div class="flex gap-6" v-if="user">
    <section
      class="border border-y-0 border-x-light-background-colors-quaternary dark:border-x-dark-background-color-quaternary w-[65%] min-h-screen"
    >
      <header
        class="border border-x-0 border-t-0 border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary pb-6"
      >
        <div class="flex flex-row gap-10 items-center p-6 py-4">
          <span @click="router.go(-1)"><--</span>
          <div class="flex flex-col gap-0 items-center text-left">
            <span class="font-bold text-lg">{{ user.userName }}</span>
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
          <Button
            @click="handleClickFollow"
            :size="ButtonSize.large"
            text="Seguir"
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
            {{ user.birthday }}
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
      </header>
      <section class="p-6">
        <Tuip v-for="tuip in tuips" :key="tuip.tuipId" :tuip="tuip" />
      </section>
    </section>
    <section class="w-[35%]"></section>
  </div>
</template>
