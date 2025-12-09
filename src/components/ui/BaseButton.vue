<template>
    <button
      :type="type"
      class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
             transition-all duration-150
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft
             disabled:opacity-50 disabled:cursor-not-allowed"
      :class="variantClasses"
      v-bind="$attrs"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  
  const props = defineProps<{
    variant?: "primary" | "secondary" | "ghost" | "danger";
    type?: "button" | "submit" | "reset";
  }>();
  
  const type = computed(() => props.type ?? "button");
  
  const variantClasses = computed(() => {
    switch (props.variant) {
      case "secondary":
        return "bg-surface-soft border border-border-subtle text-gray-100 hover:bg-surface-softer";
      case "ghost":
        return "bg-transparent text-gray-100 border border-border-subtle hover:bg-surface-soft";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700";
      default:
        return "bg-accent text-black hover:bg-accent-soft";
    }
  });
  </script>
  