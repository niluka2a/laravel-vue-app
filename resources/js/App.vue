<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <nav class="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <router-link to="/users" class="text-lg font-semibold text-slate-900 dark:text-white">User Management</router-link>
        <div class="flex items-center gap-3">
          <router-link to="/users" class="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">Users</router-link>
        </div>
      </div>
    </nav>

    <main class="mx-auto max-w-6xl px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
