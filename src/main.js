import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";
import axios from "axios";

import router from "./router";
import store from "./store";

import App from "./App.vue";

import "normalize.css";
import "./styles/main.scss";

const data = require("@/data/consts.json");
const { ymaps_api } = data;

const YMapsSettings = {
  apiKey: ymaps_api,
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1"
};

Vue.use(YmapPlugin, YMapsSettings);

store.$axios = axios;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
