<template>
  <div class="page-shell items-center justify-center">
    <main class="flex w-full justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <section class="card p-6 space-y-4">
          <header class="space-y-1">
            <h1 class="text-lg font-semibold">
              {{ title || "D&D Builder" }}
            </h1>
            <p class="text-xs text-gray-400">
              {{ subtitle || "Accède à ton grimoire de personnages." }}
            </p>
          </header>

          <div>
            <slot />
          </div>

          <footer class="border-t border-border-subtle pt-3 text-xs text-gray-400">
            <slot name="footer">
              SRD 5.2 • Auth
            </slot>
          </footer>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>
