<template>
  <component :is="layoutComponent" v-bind="layoutProps">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import BuilderLayout from "./layouts/BuilderLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  const layout = route.meta.layout as string | undefined;
  switch (layout) {
    case "auth":
      return AuthLayout;
    case "builder":
      return BuilderLayout;
    case "app":
    default:
      return AppLayout;
  }
});

const layoutProps = computed(() => {
  return {
    title: route.meta.authTitle as string | undefined,
    subtitle: route.meta.authSubtitle as string | undefined,
  };
});
</script>
