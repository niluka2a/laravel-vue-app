<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
    <div class="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Edit user</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Update user details and save changes.</p>
        </div>
        <button
          type="button"
          class="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="submitEdit">
        <div>
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="edit-name">Name</label>
          <input
            id="edit-name"
            v-model="form.name"
            type="text"
            class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="edit-email">Email</label>
          <input
            id="edit-email"
            v-model="form.email"
            type="email"
            class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            required
          />
        </div>

        <div>
          <label class="text-sm font-medium text-slate-700 dark:text-slate-200" for="edit-password">Password</label>
          <input
            id="edit-password"
            v-model="form.password"
            type="password"
            class="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-800"
            minlength="8"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-slate-500 dark:text-slate-400">Leave password empty to preserve existing password.</p>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            :disabled="loading"
          >
            {{ loading ? 'Saving…' : 'Save changes' }}
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
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useUsersStore } from '@/stores/users';
import { userUpdateSchema, normalizeErrors } from '@/validation/userValidation';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'saved']);
const store = useUsersStore();

const form = reactive({ name: '', email: '', password: '' });
const fieldErrors = reactive({ name: '', email: '', password: '' });
const submissionError = ref('');

const loading = computed(() => store.loading);
const error = computed(() => store.error);

watch(
  () => props.user,
  (nextUser) => {
    form.name = nextUser.attributes.name;
    form.email = nextUser.attributes.email;
    form.password = '';
    fieldErrors.name = '';
    fieldErrors.email = '';
    fieldErrors.password = '';
    submissionError.value = '';
  },
  { immediate: true }
);

function validateForm() {
  submissionError.value = '';

  const result = userUpdateSchema.safeParse(form);
  const normalized = normalizeErrors(result);

  fieldErrors.name = normalized.name;
  fieldErrors.email = normalized.email;
  fieldErrors.password = normalized.password;

  return result.success;
}

async function submitEdit() {
  if (!validateForm()) {
    return;
  }

  const payload = {
    name: form.name,
    email: form.email,
  };

  if (form.password.trim()) {
    payload.password = form.password;
  }

  try {
    await store.updateUser(props.user.id, payload);
    emit('saved');
  } catch (err) {
    submissionError.value = err?.message || 'Unable to update user.';
  }
}
</script>
