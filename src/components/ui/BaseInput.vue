<template>
  <div class="flex flex-col gap-1">
    <slot name="label" />

    <input :type="inputType" :value="modelValue" @input="onInput" v-bind="$attrs" class="w-full rounded-xl border border-border-subtle bg-surface-soft px-3 py-2 text-sm text-gray-100
             placeholder:text-gray-500
             focus:outline-none focus:ring-2 focus:ring-accent-soft" />

    <p v-if="hint" class="text-xs text-gray-400">{{ hint }}</p>
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue?: string;
  type?: string;
  hint?: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputType = computed(() => props.type ?? "text");

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>
