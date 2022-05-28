import {
  defineComponent,
  h,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue';

import './vue-infinite-scrolling.css';

export enum VUE_INFINITE_SCROLLING_DIRECTION {
  TO_BOTTOM = 'to-bottom',
  TO_TOP = 'to-top',
}

export interface VueInfiniteScrollingPagination {
  limit: number;
  offset: number;
  totalItems: number;
}

export default defineComponent({
  name: 'VueInfiniteScrolling',

  props: {
    pagination: {
      type: Object as () => VueInfiniteScrollingPagination,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    isAppendedToBody: {
      type: Boolean,
      default: false,
    },
    listHeight: {
      type: String,
      default: '100%',
    },
    scrollOffset: {
      type: Number,
      default: 100,
    },
    scrollDirection: {
      type: String,
      default: VUE_INFINITE_SCROLLING_DIRECTION.TO_BOTTOM,
      validator: (dir: VUE_INFINITE_SCROLLING_DIRECTION) => {
        return (<any>Object).values(VUE_INFINITE_SCROLLING_DIRECTION).includes(dir);
      },
    },
    scrollGuardTimeout: {
      type: Number,
      default: 100,
    }
  },

  emits: ['load-more'],

  setup (props, { emit, slots }) {
    const elementRoot = ref<null | HTMLElement>(null);
    const elementList = ref<null | HTMLElement>(null);

    const scrollTimer = ref<null | number>(null);

    const isDisabled = computed(() => {
      return props.isLoading ||
        props.pagination.offset >= props.pagination.totalItems;
    });

    const loadMore = (): void => {
      emit('load-more', props.pagination.offset + props.pagination.limit);
    };

    const checkPositionToLoad = (): boolean => {
      if (props.isAppendedToBody) {
        if (props.scrollDirection === VUE_INFINITE_SCROLLING_DIRECTION.TO_BOTTOM) {
          return document.documentElement.scrollTop + window.innerHeight + props.scrollOffset
            >= document.documentElement.offsetHeight;
        } else if (props.scrollDirection === VUE_INFINITE_SCROLLING_DIRECTION.TO_TOP) {
          return document.documentElement.scrollTop + window.innerHeight + props.scrollOffset
            <= document.documentElement.offsetHeight;
        }
      }

      if (!elementList.value) return false;

      if (props.scrollDirection === VUE_INFINITE_SCROLLING_DIRECTION.TO_BOTTOM) {
        const scrollPosition = elementList.value.scrollTop + elementList.value.clientHeight;
        const totalHeight = elementList.value.scrollHeight;

        return (scrollPosition + props.scrollOffset >= totalHeight);
      }

      if (props.scrollDirection === VUE_INFINITE_SCROLLING_DIRECTION.TO_TOP) {
        return (elementList.value.scrollTop <= props.scrollOffset);
      }

      return false;
    };

    const onScroll = (): void => {
      if (scrollTimer.value) window.clearTimeout(scrollTimer.value);

      scrollTimer.value = window.setTimeout(() => {
        if (isDisabled.value) return;
        if (!checkPositionToLoad()) return;

        loadMore();
      }, props.scrollGuardTimeout);
    };

    onMounted(() => {
      if (!elementRoot.value) return;

      if (props.isAppendedToBody) {
        window.addEventListener('scroll', onScroll);
        return;
      }

      elementList.value = elementRoot.value.parentElement;

      if (!elementList.value) return;

      elementList.value.style.maxHeight = props.listHeight;
      elementList.value.style.overflowY = 'scroll';
      elementList.value.classList.add('app-infinite-scroll__wrapper');

      elementList.value.addEventListener('scroll', onScroll);
    });

    onBeforeUnmount(() => {
      if (!elementList.value) return;

      if (props.isAppendedToBody) {
        window.removeEventListener('scroll', onScroll, true);
        return;
      }

      elementList.value.style.maxHeight = '';
      elementList.value.style.overflow = 'visible';
      elementList.value.removeEventListener('scroll', onScroll, true);
      elementList.value.classList.remove('app-infinite-scroll__wrapper');
    });

    return () =>
      h(
        'div',
        {
          ref: elementRoot,
          class: 'vue-infinite-scrolling',
        },
        props.isLoading
          ? slots.default
            ? slots.default()
            : 'Loading...'
          : '',
      );
  },
});
