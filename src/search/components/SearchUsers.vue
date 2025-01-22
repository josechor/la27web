<script lang="ts" setup>
import { PropType, Ref } from "vue";
import { ISearchUsers } from "../types/types";
import Image from "../../shared/atoms/Image.vue";
import { ButtonSize } from "../../shared/types/shared";
import Button from "../../shared/atoms/buttons/Button.vue";
import { useUserStore } from "../../shared/stores/user/userStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { UserFetchApi } from "../../shared/services/user/UserFetchApi";

const props = defineProps({
  searchUser: {
    type: Object as PropType<ISearchUsers>,
    required: true,
  },
});

const userStore = useUserStore();
const { loggedUser } = storeToRefs(userStore);

const userModel: Ref<ISearchUsers> = ref(props.searchUser);

async function handleClickFollow() {
  const userFetchApi = new UserFetchApi();
  if (userModel.value.isFollowing) {
    await userFetchApi.unfollowUser(userModel.value.userName);
    userModel.value.isFollowing = 0;
  } else {
    await userFetchApi.followUser(userModel.value.userName);
    userModel.value.isFollowing = 1;
  }
}
</script>
<template>
  <div
    @click="$router.push(`/profile/${userModel.userName}`)"
    class="p-2 flex flex-row justify-between items-center gap-5 cursor-pointer"
  >
    <div class="flex flex-row gap-3">
      <Image
        :src="userModel.profilePicture"
        class="rounded-full w-10 h-10 object-cover"
      />
      <div class="flex flex-col gap-1">
        <div class="flex flex-col">
          <span class="font-bold">{{ userModel.demonName }}</span>
          <span class="text-text-color-secondary font-extralight"
            >@{{ userModel.userName }}</span
          >
        </div>
        <span>{{ userModel.description }}</span>
      </div>
    </div>
    <div class="mr-6">
      <Button
        v-if="loggedUser?.userName !== userModel.userName"
        @click.stop="handleClickFollow"
        :size="ButtonSize.large"
        :text="userModel.isFollowing ? 'Dejar seguir' : 'Seguir'"
        class="text-nowrap"
      />
    </div>
  </div>
</template>
