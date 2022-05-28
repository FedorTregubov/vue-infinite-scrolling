import type { App } from 'vue';
import VueInfiniteScrolling  from './components/vue-infinite-scrolling';
import type {
  VueInfiniteScrollingPagination,
  VUE_INFINITE_SCROLLING_DIRECTION,
}  from './components/vue-infinite-scrolling';

export default {
  install: (app: App) => {
    app.component('VueInfiniteScrolling', VueInfiniteScrolling);
  },
};

export {
  VueInfiniteScrolling,
  VueInfiniteScrollingPagination,
  VUE_INFINITE_SCROLLING_DIRECTION,
};
