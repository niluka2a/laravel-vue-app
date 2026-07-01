<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/60" @click="$emit('close')"></div>
    <div class="relative w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900" @click.stop>
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white">{{ title }}</h2>
          <p v-if="description" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ description }}</p>
        </div>
        <button
          type="button"
          class="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>

      <div class="mt-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);
</script>
