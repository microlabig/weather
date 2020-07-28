import Vue from "vue";

import vuetify from "~V/plugins/vuetify"; // плагин vuetify
import router from "./router"; // роутер
import store from "./store"; // хранилище

import "./mixins/global"; // глобальные примеси

import ymapsInit from "~/api/ymaps"; // импортируем настройки ymaps

import App from "./App.vue";

ymapsInit(); // инициализируем карты

// -----------------------------------
// ----------- instance Vue ----------
// -----------------------------------
new Vue({
  el: "#app",
  vuetify,
  router,
  store,
  render: h => h(App)
});
