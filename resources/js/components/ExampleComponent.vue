<template>
  <div class="max-w-3xl mx-auto p-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-950 dark:border-slate-800 dark:shadow-none">
    <div class="mb-6">
      <p class="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Vue 3 + Pinia</p>
      <h1 class="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{{ formattedTitle }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Use computed getters, setters, and watchers in the store and component.</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div class="rounded-3xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        <p class="text-sm font-medium">Current count</p>
        <p class="mt-3 text-4xl font-semibold">{{ count }}</p>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ isEven ? 'Even' : 'Odd' }}</p>
        <p class="mt-4 text-sm">Double count: <span class="font-semibold">{{ doubleCount }}</span></p>
        <p class="mt-1 text-sm">{{ stepLabel }}</p>
      </div>

      <div class="rounded-3xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
        <label class="block text-sm font-medium mb-2">Counter name</label>
        <input
          v-model="storeName"
          type="text"
          class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />

        <label class="block text-sm font-medium mt-4 mb-2">Step value</label>
        <input
          v-model.number="stepValue"
          type="number"
          min="1"
          class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />

        <label class="block text-sm font-medium mt-4 mb-2">Set count</label>
        <input
          v-model.number="count"
          type="number"
          class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        />
      </div>
    </div>

    <div class="mt-6 grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        class="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        @click="increment"
      >
        Increment
      </button>

      <button
        type="button"
        class="rounded-3xl bg-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
        @click="decrement"
      >
        Decrement
      </button>

      <button
        type="button"
        class="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        @click="reset"
        :disabled="!canReset"
      >
        Reset
      </button>
    </div>

    <div class="mt-6 rounded-3xl bg-slate-50 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <p class="text-sm font-medium">Watcher message</p>
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ lastChangeMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/counter';

const counter = useCounterStore();
const { step, name, lastChangeMessage, doubleCount, isEven, formattedTitle, stepLabel } = storeToRefs(counter);

const count = computed({
  get: () => counter.count,
  set: (value) => counter.setCount(value),
});

const stepValue = computed({
  get: () => step.value,
  set: (value) => counter.setStep(value),
});

const storeName = computed({
  get: () => name.value,
  set: (value) => counter.setName(value),
});

const canReset = computed(() => counter.count !== 0);

function increment() {
  counter.increment();
}

function decrement() {
  counter.decrement();
}

function reset() {
  counter.reset();
}

watch(
  () => counter.count,
  (newCount, oldCount) => {
    console.log(`[ExampleComponent] count changed from ${oldCount} to ${newCount}`);
  }
);
</script>
