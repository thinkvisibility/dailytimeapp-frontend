import Vue from 'vue';
import VueGoodTablePlugin from 'vue-good-table';
import VueProgress from 'vue-progress-path';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';

// import the styles
import 'vue-good-table/dist/vue-good-table.css';

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueGoodTablePlugin);
Vue.use(VueProgress);

new Vue({
  render: h => h(App),
}).$mount('#app');
