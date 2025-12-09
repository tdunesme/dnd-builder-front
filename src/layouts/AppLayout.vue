<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import AuthButton from "../components/auth/AuthButton.vue";

const route = useRoute();

// plus tard tu remplaceras ça par ton vrai store d'auth
const user = computed<null | { name: string; email?: string }>(() => null);

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/characters", label: "Personnages" },
  { to: "/builder", label: "Nouveau personnage" },
];

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="page-shell">
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <aside class="hidden w-64 flex-col border-r border-border-subtle bg-surface-soft px-4 py-6 md:flex">
        <div class="mb-8 text-lg font-semibold tracking-wide">
          D&D Builder
        </div>

        <nav class="flex-1 space-y-1 text-sm">
          <RouterLink v-for="link in links" :key="link.to" :to="link.to"
            class="flex items-center gap-2 rounded-xl px-3 py-2 text-gray-300 hover:bg-surface-softer" :class="{
              'bg-surface-softer text-accent-soft': isActive(link.to),
            }">
            <span>{{ link.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <!-- Main -->
      <div class="flex min-h-screen flex-1 flex-col">
        <header
          class="flex items-center justify-between gap-4 border-b border-border-subtle bg-surface-soft/80 px-4 py-3 backdrop-blur">
          <h1 class="text-base font-semibold tracking-wide">
            <slot name="title">
              D&D Character Builder
            </slot>
          </h1>

          <div class="flex items-center gap-3">
            <!-- Test direct du bouton -->
            <AuthButton :user="user" @login="$router.push({ name: 'login' })"
              @account="$router.push({ name: 'dashboard' })" />
          </div>
        </header>

        <main class="page-main">
          <div class="page-max-w pt-4">
            <slot>
              <RouterView />
            </slot>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>