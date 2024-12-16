<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref } from "vue";
import { TuipInterface } from "../../shared/types/tuipsTypes";
import Tuip from "../../shared/components/Tuip.vue";
import { TuipsFetchApi } from "../../shared/services/tuips/tuipsFetchApi";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const tuipsFetchApi = new TuipsFetchApi();

let page = 1;
const limit = 20;
const tuips: Ref<TuipInterface[]> = ref([]);
const loadingNewTuips = ref(false);

onMounted(async () => {
  tuips.value = await tuipsFetchApi.getTuips(page, limit, {likedById: props.userId});
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
  const tuipsResponse = await tuipsFetchApi.getTuips(page, limit, {likedById: props.userId});
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
</script>
<template>
  <section>
    <Tuip v-for="tuip in tuips" :key="tuip.tuipId" :tuip="tuip" />
  </section>
</template>
