import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ExampleComponent from './components/ExampleComponent.vue';

const app = createApp(ExampleComponent);
app.use(createPinia());
app.mount('#app');

