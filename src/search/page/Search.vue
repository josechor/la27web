<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import SearchHeader from "../components/SearchHeader.vue";
import { FetchSearchApi } from "../services/fetchSearchApi";
import { ISearchUsers } from "../types/types";
import SearchUsers from "../components/SearchUsers.vue";
const fetchSearch = new FetchSearchApi();

const users: Ref<ISearchUsers[]> = ref([]);
onMounted(async () => {
  window.scrollTo(0, 0);
  users.value = await fetchSearch.getAllUsers();
});
</script>
<template>
  <div class="flex gap-6">
    <section
      class="border border-y-transparent border-x-background-colors-quaternary w-full lg:w-[100%] lg:max-w-[680px] min-h-screen"
    >
      <SearchHeader v-if="false" />
      <div v-if="false" class="h-[1px] w-full bg-background-colors-secondary" />
      <div class="p-1 lg:p-5 flex flex-col gap-4">
        <SearchUsers v-for="user in users" :search-user="user" />
      </div>
    </section>
  </div>
</template>
