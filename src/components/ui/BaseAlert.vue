<template>
    <div
      class="flex items-start gap-3 rounded-xl border px-3 py-2 text-sm"
      :class="variantClass"
    >
      <slot name="icon" />
      <div>
        <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps<{
    variant?: "info" | "success" | "warning" | "error";
    title?: string;
  }>();
  
  const variantClass = computed(() => {
    switch (props.variant) {
      case "success":
        return "border-emerald-500/50 bg-emerald-500/15 text-emerald-200";
      case "warning":
        return "border-amber-500/50 bg-amber-500/15 text-amber-200";
      case "error":
        return "border-red-500/50 bg-red-500/15 text-red-200";
      default:
        return "border-border-subtle bg-surface-soft text-gray-100";
    }
  });
  </script>
  