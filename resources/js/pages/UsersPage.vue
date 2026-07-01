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
      <div class="space-y-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 dark:bg-slate-900 dark:shadow-none">
        <div>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Create new user</h2>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Fill in the form to add a user via the API.</p>
        </div>

        <form class="space-y-4" @submit.prevent="submitUser">
          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="name">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              required
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              required
            />
          </div>

          <div>
            <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
              minlength="8"
              required
            />
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm text-slate-500 dark:text-slate-400">Password must be at least 8 characters.</p>
            <button
              type="submit"
              class="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              :disabled="loading"
            >
              {{ loading ? 'Saving…' : 'Create user' }}
            </button>
          </div>

          <div class="space-y-3">
            <p v-if="fieldErrors.name" class="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/50 dark:text-amber-200">{{ fieldErrors.name }}</p>
            <p v-if="fieldErrors.email" class="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/50 dark:text-amber-200">{{ fieldErrors.email }}</p>
            <p v-if="fieldErrors.password" class="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-700/40 dark:bg-amber-950/50 dark:text-amber-200">{{ fieldErrors.password }}</p>
            <p v-if="submissionError" class="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-700/40 dark:bg-red-950/50 dark:text-red-200">{{ submissionError }}</p>
            <p v-if="error && !submissionError" class="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-700/40 dark:bg-red-950/50 dark:text-red-200">{{ error }}</p>
          </div>
        </form>
      </div>

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
import { computed, reactive, ref, onMounted } from 'vue';
import { useUsersStore } from '../stores/users';
import { userSchema, normalizeErrors } from '../validation/userValidation';

const store = useUsersStore();
const form = reactive({ name: '', email: '', password: '' });
const fieldErrors = reactive({ name: '', email: '', password: '' });
const submissionError = ref('');

const users = computed(() => store.users);
const error = computed(() => store.error);
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

function validateForm() {
  submissionError.value = '';

  const result = userSchema.safeParse(form);
  const normalized = normalizeErrors(result);

  fieldErrors.name = normalized.name;
  fieldErrors.email = normalized.email;
  fieldErrors.password = normalized.password;

  // Optimised: Instead of replacing the entire object, we update the existing reactive object with new values. This avoids losing reactivity and ensures that Vue can track changes to the individual fields.
  // Object.assign(fieldErrors, normalized);

  return result.success;
}

async function submitUser() {
  if (!validateForm()) {
    return;
  }

  try {
    await store.createUser({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    form.name = '';
    form.email = '';
    form.password = '';
    fieldErrors.name = '';
    fieldErrors.email = '';
    fieldErrors.password = '';

    await store.fetchUsers();
  } catch (err) {
    submissionError.value = err?.message || 'Unable to create user.';
  }
}

onMounted(() => {
  loadUsers();
});
</script>
