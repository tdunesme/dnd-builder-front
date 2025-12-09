<template>
    <AppLayout>
      <template #title>
        Création de personnage
      </template>
  
      <template #header-right>
        <div class="flex items-center gap-3 text-xs text-gray-300">
          <span>Étape {{ step }} / {{ totalSteps }}</span>
          <BaseButton variant="secondary" @click="$emit('save-draft')">
            Sauvegarder le brouillon
          </BaseButton>
        </div>
      </template>
  
      <div class="space-y-4">
        <!-- Stepper -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <div
            v-for="(s, index) in steps"
            :key="s.key"
            class="flex items-center gap-2"
          >
            <button
              class="flex items-center gap-2 rounded-full border px-3 py-1 transition"
              :class="{
                'border-accent-soft bg-accent-soft/10 text-accent-soft': index + 1 === step,
                'border-border-subtle text-gray-400 hover:bg-surface-soft': index + 1 !== step,
              }"
              @click="$emit('step-click', s.key)"
              type="button"
            >
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full border border-border-subtle text-[10px]"
              >
                {{ index + 1 }}
              </span>
              <span>{{ s.label }}</span>
            </button>
  
            <span
              v-if="index < steps.length - 1"
              class="hidden text-xs text-gray-600 md:inline"
            >
              ──
            </span>
          </div>
        </div>
  
        <!-- Contenu de l'étape -->
        <section class="card p-5 md:p-6">
          <slot />
        </section>
      </div>
    </AppLayout>
  </template>
  
  <script setup lang="ts">
  import AppLayout from "./AppLayout.vue";
  import BaseButton from "../components/ui/BaseButton.vue";
  
  defineProps<{
    step: number;
    totalSteps: number;
    steps: { key: string; label: string }[];
  }>();
  
  defineEmits<{
    (e: "save-draft"): void;
    (e: "step-click", key: string): void;
  }>();
  </script>
  