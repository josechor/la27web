<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { useTuipsStore } from "../../shared/stores/tuips/tuipsStore";
import { TuipInterface, TuipCreate } from "../../shared/types/tuipsTypes";
import Tuip from "../../shared/components/Tuip.vue";
import Button from "../../shared/atoms/buttons/Button.vue";
import { ButtonSize } from "../../shared/types/shared";
import { TuipsFetchApi } from "../../shared/services/tuips/tuipsFetchApi";
import { useUserStore } from "../../shared/stores/user/userStore";

const tuipsFetchApi = new TuipsFetchApi();
const tuipsStore = useTuipsStore();

const userStore = useUserStore();

const post = ref("");
let page = 1;
const limit = 20;
const tuips: Ref<TuipInterface[]> = ref([]);
const loadingNewTuips = ref(false);

onMounted(async () => {
  tuips.value = await tuipsFetchApi.getTuips(page, limit);
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  page = 0;
  tuips.value = [];
  window.removeEventListener("scroll", onScroll);
});

async function loadMoreTweets() {
  loadingNewTuips.value = true;
  page++;
  const tuipsResponse = await tuipsFetchApi.getTuips(page, limit);
  if (tuipsResponse.length === 0) {
    window.removeEventListener("scroll", onScroll);
    return;
  }
  tuips.value.push(...tuipsResponse);
}

const onScroll = () => {
  const bottomReached =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (bottomReached) {
    loadMoreTweets();
  }
};

async function createPost() {
  if (post.value.length === 0) return;
  const tuip: TuipCreate = {
    content: post.value,
    multimedia: [],
    quoting: null,
    secta: null,
    parent: null,
  };
  await tuipsStore.createTuip(tuip);
  post.value = "";
  const userId = userStore.loggedUser?.userId;
  const tuipResponse = await tuipsFetchApi.getTuips(1, 1, { authorId: userId });
  tuips.value.unshift(...tuipResponse);
}

function validateInput() {
  if (post.value.length > 255) post.value = post.value.slice(0, 255);
}
</script>
<template>
  <div class="flex gap-6">
    <section
      class="border border-y-transparent border-x-light-background-colors-quaternary dark:border-x-dark-background-color-quaternary w-[65%] min-h-screen"
    >
      <section
        class="flex gap-4 justify-around border border-transparent border-b-light-background-colors-quaternary dark:border-b-dark-background-color-quaternary w-full px-3 py-1"
      >
        <img
          src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
          alt="user"
          class="h-[40px] w-[40px] rounded-full"
        />
        <div class="w-full flex gap-2 flex-col">
          <textarea
            v-model="post"
            placeholder="Que te cuentas?"
            @input="validateInput"
            @keydown.enter.prevent="createPost"
          />
          <hr
            class="w-full border-light-background-colors-quaternary dark:border-dark-background-color-quaternary"
          />
          <div class="flex justify-between gap-4">
            <div></div>
            <div class="flex gap-2 items-center">
              <span class="text-xs">{{ post.length }}/255</span>
              <Button
                @click="createPost"
                :disabled="post.length === 0"
                :size="ButtonSize.small"
                text="Publicar"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <Tuip v-for="tuip in tuips" :key="tuip.tuipId" :tuip="tuip" />
      </section>
    </section>
    <section class="w-[35%] min-h-screen flex flex-col gap-8">
      <div v-for="_ in 1" class="h-[200px] w-full bg-[#333]">hola</div>
    </section>
  </div>
</template>

<style>
textarea {
  width: 100%; /* Ocupa el 100% del ancho disponible */
  height: auto; /* Se ajustará dinámicamente */
  min-height: 50px; /* Altura mínima */
  max-height: 200px; /* Altura máxima */
  padding: 10px;
  resize: none; /* Deshabilita el redimensionamiento manual */
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid #ccc; /* Bordes */
  border-radius: 8px; /* Bordes redondeados */
  box-sizing: border-box; /* Incluye padding y border en el tamaño */
  outline: none; /* Quita el borde al enfocar */
}
</style>
