import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import weather from './modules/weather';
import address from './modules/address';
import tooltip from './modules/tooltip';

export default new Vuex.Store({
  modules: {
    weather,
    address,
    tooltip
  }
});
