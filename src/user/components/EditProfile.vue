<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from "vue";
import Image from "../../shared/atoms/Image.vue";
import router from "../../shared/router/index";
import { useEditProfileStore } from "../stores/editProfileStore";
import { storeToRefs } from "pinia";
import { FetchUsersApi } from "../services/fetchUsersApi";
const emits = defineEmits(["update:modelValue", "updateProfile"]);

const editProfileStore = useEditProfileStore();
const { userData } = storeToRefs(editProfileStore);

function closeModal() {
  router.go(-1);
  emits("update:modelValue", false);
}

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

interface CustomFile extends File {
  preview?: string;
}

const banner: Ref<CustomFile[]> = ref([]);

const handleBanner = (event: any) => {
  const file = event.target.files[0];

  if (!file) {
    banner.value = [];
    return;
  }
  const preview = URL.createObjectURL(file);
  // @ts-ignore
  banner.value = [{ file, preview, type: file.type }];
};

const picture: Ref<CustomFile[]> = ref([]);

const handlePicture = (event: any) => {
  const file = event.target.files[0];

  if (!file) {
    picture.value = [];
    return;
  }
  const preview = URL.createObjectURL(file);
  // @ts-ignore
  picture.value = [{ file, preview, type: file.type }];
};

const saving = ref(false);
async function handleClickSave() {
  const fetchUsers = new FetchUsersApi();
  saving.value = true;
  if (picture.value.length) {
    await fetchUsers.updateProfilePicture(picture.value[0]);
  }
  if (banner.value.length) {
    await fetchUsers.updateBanner(banner.value[0]);
  }
  const newUser = {
    demonName: userData.value?.demonName,
    description: userData.value?.description,
    email: userData.value?.email,
  };
  await fetchUsers.updateProfile(newUser);
  emits("updateProfile");
  closeModal();
  saving.value = false;
}
</script>
<template>
  <div
    @click="closeModal"
    class="fixed top-0 left-0 h-screen w-screen bg-slate-600 bg-opacity-50 z-[120]"
  ></div>

  <div
    v-if="userData !== null"
    class="fixed top-0 w-full h-screen max-h-screen overflow-y-auto lg:h-auto lg:top-[20%] lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[600px] z-[121] bg-background-colors-primary p-5 lg:rounded-xl"
    style="overflow: auto"
  >
    <div
      @click="closeModal"
      class="translate-x-0 translate-y-[-10px] p-2 text-xl font-bold cursor-pointer w-fit"
    >
      X
    </div>
    <div class="relative">
      <label
        for="banner"
        class="w-full aspect-video overflow-hidden cursor-pointer"
      >
        <img
          v-if="banner[0]?.preview"
          :src="banner[0].preview"
          class="w-full h-40 object-cover"
        />
        <Image v-else :src="userData.banner" class="w-full h-40 object-cover" />
        <input
          type="file"
          accept="image/*"
          class="hidden"
          name="banner"
          id="banner"
          @change="handleBanner"
        />
      </label>
      <label for="picture" class="cursor-pointer">
        <img
          v-if="picture[0]?.preview"
          :src="picture[0].preview"
          class="w-32 h-32 object-cover rounded-full absolute -bottom-10 left-2"
        />
        <Image
          v-else
          :src="userData.profilePicture"
          class="w-32 h-32 object-cover rounded-full absolute -bottom-16 left-2"
        />
        <input
          type="file"
          accept="image/*"
          class="hidden"
          name="picture"
          id="picture"
          @change="handlePicture"
        />
      </label>
    </div>
    <div class="mt-24">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col mb-1 justify-start items-start gap-1">
          <label for="name" class="pl-1 font-semibold">Nombre de demonio</label>
          <input
            v-model="userData.demonName"
            class="w-full text-background-colors-primary outline-none px-2 py-1 rounded"
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div class="flex flex-col mb-1 justify-start items-start gap-1">
          <label for="description" class="pl-1 font-semibold"
            >Descripción</label
          >
          <textarea
            v-model="userData.description"
            class="w-full h-20 text-background-colors-primary outline-none px-2 py-1 rounded"
            type="email"
            id="description"
            name="description"
            required
          />
        </div>
        <div class="flex flex-col mb-1 justify-start items-start gap-1">
          <label for="email" class="pl-1 font-semibold">Email</label>
          <input
            v-model="userData.email"
            class="w-full text-background-colors-primary outline-none px-2 py-1 rounded"
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
      </div>
      <footer class="flex justify-end gap-4 mt-4">
        <button
          :disabled="!userData.email || !userData.demonName || saving"
          @click="handleClickSave"
          class="bg-background-colors-tertiary px-4 py-2 rounded-2xl w-fit text-lg disabled:bg-opacity-20 disabled:text-text-color-tertiary"
        >
          {{ saving ? "Guardando..." : "Guardar" }}
        </button>
      </footer>
    </div>
  </div>
</template>
