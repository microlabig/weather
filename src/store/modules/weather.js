const data = require("@/data/consts.json");
const { weather_api } = data;

export default {
  namespaced: true,

  state: {
    weather: {},
    isLoading: false,
    isLoaded: false
  },
  mutations: { // для изменеия в state
    SET_WEATHER: (state, weatherData) => {
      state.weather = { ...weatherData };
    },
    SET_IS_LOADING: (state, flag) => {
      state.isLoading = flag;
    },
    SET_IS_LOADED: (state, flag) => {
      state.isLoaded = flag;
    },
    // REMOVE_CATEGORY: (state, categoryId) => {
    //     state.categories = state.categories.filter(category => category.id !== categoryId)
    // },
    // EDIT_NAME_CATEGORY: (state, editedCategory) => {
    //     state.categories = state.categories.map(category => category.id !== editedCategory.id ? category : editedCategory)
    // }
  },
  actions: {
    // метод получения данных
    async fetchWeatherData({ commit, dispatch }, coordinates) {
      // const lat = 55.37976654;
      // const lon = 43.78774518;
      try {
        dispatch('startLoading'); // установим флаги начала загрузки
        const response = await this.$axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weather_api}&lang=ru`); // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={your api key}
        commit('SET_IS_LOADING', false); // загрузка прекращена
        if (response.cod < 400) {
          commit('SET_IS_LOADED', true);
          return response.data;
        }
        throw new Error('Ошибка загрузки данных');
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
      commit('SET_WEATHER', {});
    }
    // // метод получения категорий
    // async fetchCategories({ commit }) {
    //     // {commit} - метод из store (деструктуризация)
    //     try {
    //         const response = await this.$axios.get('/categories');
    //         commit('SET_CATEGORIES', response.data.reverse()); // вызовим мутацию и получим ответ в response.data
    //         return response;
    //     } catch (error) {
    //         throw new Error(error.response.data.error || error.response.data.message);
    //     }
    // },

    // // метод удаления категории с сервера и из store
    // async removeCategory({ commit }, categoryId) {
    //     try {
    //         const response = await this.$axios.delete(`/categories/${categoryId}`);
    //         commit('REMOVE_CATEGORY', categoryId); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
    //         return response;
    //     } catch (error) {
    //         throw new Error(error.response.data.error || error.response.data.message);
    //     }
    // },

    // // метод изменения имени категории на сервее и в store
    // async editNameCategory({ commit }, category) {
    //     try {
    //         const response = await this.$axios.post(`/categories/${category.id}`, {
    //             title: category.category
    //         });

    //         commit('EDIT_NAME_CATEGORY', category); // categoryId (а не response.data) т.к. нам не нужен обрабатывать ответ от сервера
    //         return response;
    //     } catch (error) {
    //         throw new Error(error.response.data.error || error.response.data.message);
    //     }
    // }
  },
  getters: {
    getWeather: (store) => store.weather,
    getIsLoading: (store) => store.isLoading,
    getIsLoaded: (store) => store.isLoaded
  }
}


/*
{
  "coord": {
    "lon": 37, // Географическое положение города, долгота
    "lat": 55 // Город географическое положение, широта
  },
  "weather": [
    {
      "id": 802, // Идентификатор погодного условия
      "main": "Clouds", // Группа параметров погоды (Дождь, Снег, Экстрим и т. Д.)
      "description": "scattered clouds", // Погодные условия внутри группы. Вы можете получить вывод на вашем языке
      "icon": "03d" // Идентификатор значка погоды
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.51, // Температура. Единица по умолчанию: Кельвин, Метрика: Цельсий, Империал: Фаренгейт.
    "feels_like": 297.05, // Температура. Этот температурный параметр учитывает восприятие человеком погоды. Единица по умолчанию: Кельвин, Метрика: Цельсий, Империал: Фаренгейт.
    "temp_min": 295.15, // Минимальная температура на данный момент. Это минимальная наблюдаемая в настоящее время температура (в пределах крупных мегаполисов и городских районов). Единица по умолчанию: Кельвин, Метрика: Цельсий, Империал: Фаренгейт.
    "temp_max": 296.15, // Максимальная температура на данный момент. Это максимальная наблюдаемая в настоящее время температура (в пределах крупных мегаполисов и городских районов). Единица по умолчанию: Кельвин, Метрика: Цельсий, Империал: Фаренгейт.
    "pressure": 1011, // давление
    "humidity": 78 // влыжность
  },
  "visibility": 10000, // видимость
  "wind": {
    "speed": 2, // Скорость ветра. Единица измерения по умолчанию: метр / сек, метрика: метр / сек, империал: миль / час
    "deg": 240 // Направление ветра, град (метеорологическое)
  },
  "clouds": {
    "all": 40 // Облачность,%
  },
  "dt": 1593967893, // Время расчета данных, Unix, UTC
  "sys": {
    "type": 1,
    "id": 9017,
    "country": "RU", // Код страны
    "sunrise": 1593910879, // Время восхода, Unix, UTC
    "sunset": 1593972693 // Время заката, Unix, UTC
  },
  "timezone": 10800, // Сдвиг в секундах от UTC
  "id": 529315, // ID города
  "name": "Marinki", // Название города
  "cod": 200
}
*/
