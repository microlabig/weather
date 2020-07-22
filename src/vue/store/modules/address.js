import { defaultCoordinates, geocodeBack, getBrowserLocation } from "~/api/ymaps";

const initState = {
  geoObject: {      // геообъект
    ...defaultCoordinates
  },
  isLoading: false, // флаг процесса загрузки данных
  isLoaded: false   // флаг успешно загруженных данных
};

export default {
  namespaced: true,

  state: { ...initState },

  mutations: { // для изменения в state
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
    // -----------------------------
    // поиск текущего местоположения
    // -----------------------------
    async fetchCurrentLocation({ commit, dispatch }) {
      try {
        dispatch("startLoading");
        const {
          coords: { latitude, longitude }
        } = await getBrowserLocation(); // получим данные из браузера о положении пользователя
        // запросим адрес населенного пункта по координатам
        const cityAddress = await geocodeBack([latitude, longitude]);
        // запишем данные в стор
        commit("SET_CITY", {
          lat: latitude,
          lon: longitude,
          address: cityAddress
        });
        dispatch('endSuccessLoading');
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(error.response.data.error || error.response.data.message);
      }
    },

    // -----------------------------
    // поиск местоположения по карте
    // -----------------------------
    async fetchLocation({ commit, dispatch }, coords) {
      try {
        dispatch("startLoading");
        // запросим адрес населенного пункта по координатам
        const address = await geocodeBack(coords);
        // сохраним данные в стор
        commit("SET_CITY", {
          lat: coords[0],
          lon: coords[1],
          address
        });
        dispatch('endSuccessLoading');
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(error.response.data.error || error.response.data.message);
      }
    },

    // ---------------------
    // старт загрузки данных
    // ---------------------
    startLoading({ commit }) {
      commit("SET_IS_LOADING", true);   // загрузка началась
      commit("SET_IS_LOADED", false);   // данные еще не загружены
    },

    // ----------------------------------
    // успешное окончание загрузки данных
    // ----------------------------------
    endSuccessLoading({ commit }) {
      commit('SET_IS_LOADING', false); // загрузка прекращена
      commit('SET_IS_LOADED', true);   // данные загружены
    },

    // -----------------------------------------
    // установка хранилища в начальное состояние
    // -----------------------------------------
    storeToInit({ commit }) {
      commit("SET_IS_LOADING", initState.isLoading);
      commit("SET_IS_LOADED", initState.isLoaded);
      commit("SET_CITY", { ...initState.geoObject });
    }
  },
  
  getters: {
    getGeoInfo: store => store.geoObject,
    getIsLoading: store => store.isLoading,
    getIsLoaded: store => store.isLoaded
  }
};
