import { createApp } from 'vue'
import App from './App.vue'
// Router
import { router } from '@/router/';
// Custom Directives
import { clickOutside } from '@/directives/';

const app = createApp(App);

app.use(router);
app.directive('click-outside', clickOutside);

app.mount('#app');
