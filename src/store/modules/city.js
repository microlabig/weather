export default {
    namespaced: true,

    state: {
        city: {
            name: null,
            lat: null,
            lon: null
        },
        isLoading: false,
        isLoaded: false
    },
    mutations: { // для изменения в state
        SET_CITY: (state, city) => {
            state.city = { ...city };
        },
        SET_IS_LOADING: (state, flag) => {
            state.isLoading = flag;
        },
        SET_IS_LOADED: (state, flag) => {
            state.isLoaded = flag;
        }
    },
    actions: {
        // метод получения данных
        async fetchCityData({ commit, dispatch }, str) {
            try {
                dispatch('startLoading');
                if (str) { // если запрос не пустой (набран ручным поиском)
                    // TODO: геокодировать город в координаты

                    commit('SET_CITY', city);
                }
                // throw new Error('Ошибка загрузки данных');
            } catch (error) {
                dispatch('storeToInit');
                throw new Error(error.response.data.error || error.response.data.message);
            }
        },
        // старт загрузки
        startLoading({ commit }) {
            commit('SET_IS_LOADING', true);
            commit('SET_IS_LOADED', false);
        },
        // установка хранилища в начальное состояние
        storeToInit({ commit }) {
            commit('SET_IS_LOADING', false);
            commit('SET_IS_LOADED', false);
            commit('SET_CITY', {
                name: null,
                lat: null,
                lon: null
            });
        }
    },
    getters: {
        getCityData: (store) => store.city,
        getIsLoading: (store) => store.isLoading,
        getIsLoaded: (store) => store.isLoaded
    }
}