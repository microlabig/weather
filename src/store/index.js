import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import weather from './modules/weather';
import address from './modules/address';

export default new Vuex.Store({
  modules: {
    weather,
    address
  }
});
