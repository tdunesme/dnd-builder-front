<template>
  <button v-if="!user" type="button" @click="$emit('login')" class="inline-flex items-center gap-2 rounded-full border border-border-subtle
           bg-surface-soft/80 px-4 py-2 text-xs font-medium text-gray-100
           shadow-sm
           hover:border-accent hover:text-accent hover:bg-surface-softer
           active:scale-[0.98]
           transition-all duration-150">
    <span class="flex h-6 w-6 items-center justify-center rounded-full bg-surface-softer text-[11px]">
      ★
    </span>
    <span>Se connecter</span>
  </button>

  <button v-else type="button" @click="$emit('account')" class="inline-flex items-center gap-2 rounded-full border border-border-subtle
           bg-surface-softer px-4 py-2 text-xs text-gray-100
           hover:border-accent hover:bg-surface-soft
           active:scale-[0.98]
           transition-all duration-150">
    <span
      class="flex h-7 w-7 items-center justify-center rounded-full bg-accent/90 text-[11px] font-semibold text-black">
      {{ initials }}
    </span>
    <span class="text-[10px] text-gray-400">▾</span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const store = useAuthStore();
const user = ref(store.user);

defineEmits<{
  (e: "login"): void;
  (e: "account"): void;
}>();

const initials = computed(() => {
  if (!user.value || !user.value.email) return "?";
  const match = user.value.email?.match(/^([a-zA-Z])/);
  return match && match[1] ? match[1].toUpperCase() : "?";
});
</script>