# vue-infinite-scrolling

## About
Vue component plugin for infinite-scrolling.

## How to use:
***!Note: For now it is compatible with Vue3 only.***

You can install component like a plugin:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import VueInfiniteScrolling from 'vue-infinite-scrolling';

const app = createApp(App);
app.use(VueInfiniteScrolling);
app.mount('#app');
```
Or you can import it locally inside yours one:
```vue
<script lang="ts">
import { VueInfiniteScrolling } from 'vue-infinite-scrolling';
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
      }"
      @load-more="loadMore"
    />
  </ul>
</template>
```

### Props
| Prop name | Type    | Is required | Default value | Description                                                                                       |
| ----- |---------|-------------|--------------|---------------------------------------------------------------------------------------------------|
| `pagination` | Object  | true        | -            | Interface `VueInfiniteScrollingPagination {  limit: number; offset: number; totalItems: number;}` |
| `isLoading` | Boolean | true        | -            | Is list loading                                                                                   |
| `isAppendedToBody` | Boolean | false       | false        | Add scroll event listener to the body or to the list-element                                      |
| `listHeight` | String  | false       | '100%'       | List-element max-hight                                                                            |
| `scrollOffset` | Number  | false       | 100          | Scroll offset in px                                                                               |
| `scrollDirection` | String  | false       | 'to-bottom'  | Enum `VUE_INFINITE_SCROLLING_DIRECTION`: 'to-bottom', 'to-top'                                    |
| `scrollGuardTimeout` | Number  | false       | 100          | Scroll delay timeout to prevent large number of calls                                             |



## Slots
| Slot name | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Default slot. Uses 'Loading...' sign by default. |

## Development

### Project setup:
Requirements:
- Node >= v16.14.2
- npm >= 8.5.0

Install dependencies:
```sh
npm ci
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
