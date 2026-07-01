<template>
  <section class="space-y-8">
    <div class="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-none">
      <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Users</h1>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse users fetched from the Laravel API and create new records.</p>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-300">Total: {{ userCount }}</p>
      </div>
    </div>

    <div class="grid gap-6 xl:grid-cols-[360px_1fr]">
      <UserForm />

      <div class="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-none">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">User list</h2>
          <button
            class="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
            @click="loadUsers"
            :disabled="loading"
          >
            Refresh
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <div v-if="loading" class="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">Loading users…</div>

          <div v-else-if="users.length === 0" class="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">No users found.</div>

          <ul v-else class="space-y-3">
            <li v-for="user in users" :key="user.id" class="rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ user.attributes.name }}</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">{{ user.attributes.email }}</p>
                </div>
                <router-link
                  :to="{ name: 'UserDetail', params: { id: user.id } }"
                  class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  View details
                </router-link>
              </div>
              <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Created at: {{ formatDate(user.attributes.created_at) }}</span>
                <span>Updated at: {{ formatDate(user.attributes.updated_at) }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="hasMore" class="mt-6 text-center">
          <button
            class="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            @click="loadMore"
            :disabled="loading"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import UserForm from '@/pages/users/components/UserForm.vue';

const store = useUsersStore();

const users = computed(() => store.users);
const loading = computed(() => store.loading);
const userCount = computed(() => store.userCount);
const hasMore = computed(() => store.hasMore);

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : '—';
}

async function loadUsers() {
  await store.fetchUsers();
}

async function loadMore() {
  await store.fetchUsers(store.pagination.current_page + 1);
}

onMounted(() => {
  loadUsers();
});
</script>
