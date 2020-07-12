import { geocodeBack, getBrowserLocation } from "@/helpers";

const initState = {
  geoObject: {
    address: null,
    lat: null,
    lon: null
  },
  isLoading: false,
  isLoaded: false
};

export default {
  namespaced: true,

  state: { ...initState },

  mutations: {
    // для изменения в state
    SET_CITY: (state, geoObject) => {
      state.geoObject = { ...state.geoObject, ...geoObject };
    },

    SET_IS_LOADING: (state, flag) => {
      state.isLoading = flag;
    },

    SET_IS_LOADED: (state, flag) => {
      state.isLoaded = flag;
    }
  },

  actions: {
    // поиск текущего местоположения
    async getCurrentLocation({ commit, dispatch }) {
      try {
        dispatch("startLoading");
        const {
          coords: { latitude, longitude }
        } = await getBrowserLocation();
        
        const cityAddress = await geocodeBack([latitude, longitude]);

        commit("SET_CITY", {
          lat: latitude,
          lon: longitude,
          address: cityAddress
        });
        commit('SET_IS_LOADED', true)
        commit("SET_IS_LOADING", false);
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    // поиск местоположения по карте
    async getLocation({ commit, dispatch }, coords) {
      try {
        dispatch("startLoading");
        
        const cityName = await geocodeBack(coords);

        commit("SET_CITY", {
          lat: coords[0],
          lon: coords[1],
          address: cityName
        });
        commit('SET_IS_LOADED', true)
        commit("SET_IS_LOADING", false);
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    // метод получения данных
    async fetchCityName({ commit, dispatch }, str) {
      try {
        dispatch("startLoading");

      } catch (error) {
        dispatch("storeToInit");
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    // старт загрузки
    startLoading({ commit }) {
      commit("SET_IS_LOADING", true);
      commit("SET_IS_LOADED", false);
    },

    // установка хранилища в начальное состояние
    storeToInit({ commit }) {
      commit("SET_IS_LOADING", false);
      commit("SET_IS_LOADED", false);
      commit("SET_CITY", { ...initState });
    }
  },
  
  getters: {
    getCityData: store => store.geoObject,
    getIsLoading: store => store.isLoading,
    getIsLoaded: store => store.isLoaded
  }
};
