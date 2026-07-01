<template>
  <section class="space-y-6">
    <div class="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-none">
      <button
        class="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
        @click="$router.push({ name: 'Users' })"
      >
        ← Back to users
      </button>

      <div v-if="loading" class="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">Loading user details…</div>

      <div v-else-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-700/40 dark:bg-red-950/50 dark:text-red-200">{{ error }}</div>

      <div v-else-if="user" class="space-y-4">
        <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ user.attributes.name }}</h1>
        <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
          <p class="text-sm text-slate-600 dark:text-slate-300">Email</p>
          <p class="mt-2 text-base font-medium text-slate-900 dark:text-white">{{ user.attributes.email }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm text-slate-600 dark:text-slate-300">Created</p>
            <p class="mt-2 text-base text-slate-900 dark:text-white">{{ formatDate(user.attributes.created_at) }}</p>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <p class="text-sm text-slate-600 dark:text-slate-300">Updated</p>
            <p class="mt-2 text-base text-slate-900 dark:text-white">{{ formatDate(user.attributes.updated_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from '../stores/users';

const route = useRoute();
const store = useUsersStore();

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const user = computed(() => store.selectedUser);

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : '—';
}

onMounted(async () => {
  if (route.params.id) {
    await store.fetchUser(route.params.id);
  }
});
</script>
