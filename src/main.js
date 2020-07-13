import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";
import axios from "axios";

import router from "./router";
import store from "./store";

import App from "./App.vue";

import "normalize.css";
import "./styles/main.scss";

// ------- инициализация Ymaps ----------
const data = require("@/data/consts.json");
const { ymaps_api } = data;

const YMapsSettings = {
  apiKey: ymaps_api,
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1"
};

Vue.use(YmapPlugin, YMapsSettings);

// ----------- делаем доступным axios внутри хранилища -----------
store.$axios = axios;

// ----------- глобальные примеси ---------------
import { mapActions } from 'vuex';

// глобальный миксин для показа тултипа
Vue.mixin({
  methods: {
    ...mapActions('tooltip', ['showTooltip']),
    showMessage(objMessage) { 
      // где objMessage = { type, text }, а type = "error", "info"
      this.showTooltip(objMessage);
    }
  }  
});

// -----------------------------------
// ----------- instance Vue ----------
// -----------------------------------
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
