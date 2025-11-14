import { createApp } from 'vue';
import CartApp from './CartApp.vue';

export function mount(elementId) {
  const app = createApp(CartApp);
  app.mount(`#${elementId}`);
}