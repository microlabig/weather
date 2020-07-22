// ---------------------------
// основной файл (точка входа)
// ---------------------------

// JS
// import './js/common';

// CSS
import 'normalize.css';

// SCSS
import './assets/styles/scss/main.scss';

// MY JS & Vue setup
import Vue from "vue";

import router from "~V/router"; // роутер
import store from "~V/store"; // хранилище

import "~V/mixins/global"; // глобальные примеси

import ymapsInit from "./api/ymaps"; // импортируем настройки ymaps

import App from "~V/App.vue";

ymapsInit(); // инициализируем карты

// -----------------------------------
// ----------- instance Vue ----------
// -----------------------------------
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
