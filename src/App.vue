<script setup lang="ts">
import { VueInfiniteScrolling } from './index';
import { ref, reactive, computed } from 'vue';

const isLoading = ref(false);

const items = computed(() => {
  let i = 0;

  return [...Array(pagination.limit + pagination.offset)]
    .map(() => ++i);
});

const pagination = reactive({
  limit: 20,
  offset: 0,
  totalItems: 1000,
});

const loadMore = (offset: number): void => {
  pagination.offset = offset;
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <ul>
    <li
      v-for="i in items"
      :key="i"
    >
      {{ i }}
    </li>

    <VueInfiniteScrolling
      v-bind="{
        isAppendedToBody: true,
        pagination,
        isLoading,
        scrollDirection: 'to-bottom'
      }"
      @load-more="loadMore"
    >
      loading via slot...
    </VueInfiniteScrolling>
  </ul>
</template>

<style src="./components/vue-infinite-scrolling.css"></style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: auto 60px;
}
</style>
