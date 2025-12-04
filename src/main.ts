import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import '@vue-flow/core/dist/style.css';
import router from './router';
import HighchartsVue from 'highcharts-vue';

createApp(App).use(router).use(HighchartsVue).mount('#app');
