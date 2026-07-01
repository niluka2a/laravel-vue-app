import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
    const count = ref(0);
    const step = ref(1);
    const name = ref('Pinia Counter');
    const lastChangeMessage = ref('No changes yet');

    const doubleCount = computed(() => count.value * 2);
    const isEven = computed(() => count.value % 2 === 0);
    const formattedTitle = computed(() => `${name.value}: ${count.value}`);
    const stepLabel = computed(() => `Increment / decrement by ${step.value}`);

    function increment() {
        count.value += step.value;
    }

    function decrement() {
        count.value -= step.value;
    }

    function reset() {
        count.value = 0;
    }

    function setCount(value) {
        count.value = Number(value);
    }

    function setStep(value) {
        step.value = Number(value) || 1;
    }

    function setName(value) {
        name.value = String(value);
    }

    watch(count, (newCount, oldCount) => {
        lastChangeMessage.value = `Count changed from ${oldCount} to ${newCount}`;
    });

    return {
        count,
        step,
        name,
        lastChangeMessage,
        doubleCount,
        isEven,
        formattedTitle,
        stepLabel,
        increment,
        decrement,
        reset,
        setCount,
        setStep,
        setName,
    };
});
