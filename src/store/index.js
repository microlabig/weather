import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import weather from './modules/weather';
import city from './modules/city';

export default new Vuex.Store({
  modules: {
    weather,
    city
  }
});
