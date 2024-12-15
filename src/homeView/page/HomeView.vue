<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useTuipsStore } from "../../shared/stores/tuips/tuipsStore";
import { storeToRefs } from "pinia";

const tuipsStore = useTuipsStore();
const { tuips } = storeToRefs(tuipsStore);

const post = ref("");

onMounted(async () => {
  await tuipsStore.getTuips();
});

function createPost() {}
</script>
<template>
  <div class="flex gap-6">
    <section
      class="border border-y-transparent border-x-[#333] w-[60%] min-h-screen"
    >
      <section
        class="flex gap-4 justify-around border border-transparent border-b-[#333] w-full px-3 py-1"
      >
        <img
          src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
          alt="user"
          class="h-[40px] w-[40px] rounded-full"
        />
        <div class="w-full flex gap-2 flex-col">
          <textarea v-model="post" placeholder="Que te cuentas?" />
          <hr class="w-full border-[#333]" />
          <div class="flex justify-between gap-4">
            <div></div>
            <div class="flex gap-2 items-center">
              <span class="text-xs">{{ post.length }}/255</span>
              <div
                @click="createPost"
                class="bg-[#333] w-fit px-6 py-2 rounded-3xl cursor-pointer text-white"
              >
                Postear
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          v-for="tuip in tuips"
          class="flex gap-4 justify-around border border-transparent border-b-[#333] w-full px-3 py-2"
        >
          <img
            src="https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE="
            alt="user"
            class="h-[40px] w-[40px] rounded-full"
          />
          <div class="w-full  flex-col">
            <div class="flex gap-2 item-center">
              <span class="text-sm font-bold">{{ tuip.demonName }}</span>
              <span class="text-sm font-light">@{{ tuip.userName }}</span>
            </div>
            <span>{{ tuip.tuipContent }}</span>
            <div class="flex w-full justify-between">
              <span>L</span>
              <span>M</span>
              <span>S</span>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="w-[40%] min-h-screen flex flex-col gap-8">
      <div v-for="_ in 8" class="h-[200px] w-full bg-[#333]">hola</div>
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
