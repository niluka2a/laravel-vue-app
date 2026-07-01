<template>
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
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import { userSchema, normalizeErrors } from '@/validation/userValidation';

const store = useUsersStore();

const form = reactive({ name: '', email: '', password: '' });
const fieldErrors = reactive({ name: '', email: '', password: '' });
const submissionError = ref('');

const loading = computed(() => store.loading);
const error = computed(() => store.error);

function validateForm() {
  submissionError.value = '';

  const result = userSchema.safeParse(form);
  const normalized = normalizeErrors(result);

  fieldErrors.name = normalized.name;
  fieldErrors.email = normalized.email;
  fieldErrors.password = normalized.password;

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
</script>
