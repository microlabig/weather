import Vue from 'vue';
import axios from "axios";

import router from './router';
import store from './store';

import App from './App.vue';

store.$axios = axios;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
