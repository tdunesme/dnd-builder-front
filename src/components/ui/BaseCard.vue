<template>
    <section class="card p-5 md:p-6">
      <header v-if="$slots.header" class="mb-4">
        <slot name="header" />
      </header>
  
      <div>
        <slot />
      </div>
  
      <footer v-if="$slots.footer" class="mt-4 border-t border-border-subtle pt-3">
        <slot name="footer" />
      </footer>
    </section>
  </template>
  
  <script setup lang="ts"></script>
  