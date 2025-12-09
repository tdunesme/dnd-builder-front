<template>
    <div class="flex flex-col gap-1">
      <slot name="label" />
      <select
        v-bind="$attrs"
        class="w-full rounded-xl border border-border-subtle bg-surface-soft px-3 py-2 text-sm text-gray-100
               focus:outline-none focus:ring-2 focus:ring-accent-soft"
      >
        <slot />
      </select>
      <p v-if="hint" class="text-xs text-gray-400">{{ hint }}</p>
      <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    hint?: string;
    error?: string;
  }>();
  </script>
  