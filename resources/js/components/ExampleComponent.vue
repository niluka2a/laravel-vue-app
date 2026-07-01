<template>
  <div class="max-w-xl mx-auto p-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-950 dark:border-slate-800 dark:shadow-none">
    <div class="mb-6">
      <p class="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Vue 3 + Tailwind</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Your sample component is ready</h1>
    </div>

    <p class="text-slate-600 dark:text-slate-300 mb-6 leading-7">
      This component uses Tailwind CSS classes and is mounted from <code class="rounded bg-slate-100 px-1 py-0.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">resources/js/app.js</code>.
    </p>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-3xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        <p class="text-sm font-medium">Current count</p>
        <p class="mt-3 text-4xl font-semibold">{{ count }}</p>
      </div>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:from-slate-700 hover:to-slate-500"
        @click="count++"
      >
        Click me
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
