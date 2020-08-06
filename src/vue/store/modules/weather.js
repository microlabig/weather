import * as WeatherAPI from "~/api/openweather";
import * as Help from "~/helpers";

const initState = {
  weather: {}, // данные о погоде
  weatherOnWeek: [],
  iconDay: null,
  isLoading: false, // флаг процесса загрузки данных
  isLoaded: false // флаг успешно загруженных данных
};

export default {
  namespaced: true,

  state: { ...initState },

  mutations: {
    // для изменения в state
    SET_WEATHER: (state, weatherData) => {
      state.weather = { ...state.weather, ...weatherData };
    },
    SET_IS_LOADING: (state, flag) => {
      state.isLoading = flag;
    },
    SET_IS_LOADED: (state, flag) => {
      state.isLoaded = flag;
    },
    SET_ICON: (state, icon) => {
      state.iconDay = icon;
    },
    SET_WEATHER_ON_WEEK: (state, weatherList) => {
      state.weatherOnWeek = [...weatherList];
    }
  },

  actions: {
    // -------------------------------
    // метод получения данных о погоде
    // -------------------------------
    async fetchWeatherDaily({ commit, dispatch }, { lat, lon }) {
      try {
        dispatch("startLoading"); // установим флаги начала загрузки

        const response = await WeatherAPI.fetchWeatherDataOnCurrentDay({ lat, lon }); // запросим данные о погоде на текущий день
        commit("SET_WEATHER", response.data); // сохраним данные в стор
        const iconDaily = await WeatherAPI.fetchWeatherIcon(response.data.weather[0]?.icon); // загрузим иконку
        commit("SET_ICON", iconDaily); // сохраним данные в стор

        dispatch("endSuccessLoading");
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    // -------------------------------
    // метод получения данных о погоде
    // -------------------------------
    async fetchWeatherOnWeek({ commit, dispatch }, { lat, lon }) {
      try {
        dispatch("startLoading"); // установим флаги начала загрузки

        const response = await WeatherAPI.fetchWeatherWeek({ lat, lon });
        const promises = [];
        response.data.daily.forEach( res => {
          promises.push(new Promise(async (resolve) => {
            resolve(await WeatherAPI.fetchWeatherIcon(res.weather[0]?.icon)); // загрузим иконку
          }))
          //console.log(Help.getDayOfWeek(res.dt * 1000));
        });
        const iconsList = await Promise.allSettled(promises);
        const weatherWeek = response.data.daily.map( (weather, idx) => {
          return {
            ...weather,
            icon: iconsList[idx].value
          };
        });
        commit("SET_WEATHER_ON_WEEK", weatherWeek); // сохраним данные в стор

        dispatch("endSuccessLoading");
      } catch (error) {
        dispatch("storeToInit");
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    // ---------------------
    // старт загрузки данных
    // ---------------------
    startLoading({ commit }) {
      commit("SET_IS_LOADING", true); // загрузка началась
      commit("SET_IS_LOADED", false); // данные еще не загружены
    },

    // ----------------------------------
    // успешное окончание загрузки данных
    // ----------------------------------
    endSuccessLoading({ commit }) {
      commit("SET_IS_LOADING", false); // загрузка прекращена
      commit("SET_IS_LOADED", true); // данные загружены
    },

    // -----------------------------------------
    // установка хранилища в начальное состояние
    // -----------------------------------------
    storeToInit({ commit }) {
      commit("SET_IS_LOADING", initState.isLoading);
      commit("SET_IS_LOADED", initState.isLoaded);
      commit("SET_WEATHER", { ...initState.weather });
    }
  },

  getters: {
    getWeatherData: store => store.weather,
    getWeatherOnWeek: store => store.weatherOnWeek,
    getIsLoading: store => store.isLoading,
    getIsLoaded: store => store.isLoaded,
    getIconDay: store => store.iconDay
  }
};

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
    "humidity": 78 // влажность
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

{
  "coord": {
    "lon": 43.77,
    "lat": 55.38
  },
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "небольшой дождь",
      "icon": "10n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 292.3,
    "feels_like": 294.68,
    "temp_min": 292.3,
    "temp_max": 292.3,
    "pressure": 1006,
    "humidity": 92,
    "sea_level": 1006,
    "grnd_level": 992
  },
  "wind": {
    "speed": 0.48,
    "deg": 32
  },
  "rain": {
    "1h": 0.36
  },
  "clouds": {
    "all": 100
  },
  "dt": 1594667001,
  "sys": {
    "country": "RU",
    "sunrise": 1594600874,
    "sunset": 1594661984
  },
  "timezone": 10800,
  "id": 469933,
  "name": "Выездное",
  "cod": 200
}

currentWeather = {
  "coord": {
    "lon": 37.62,
    "lat": 55.75
  },
  "weather": [
    {
      "id": 520,
      "main": "Rain",
      "description": "небольшой проливной дождь",
      "icon": "09n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 289.19,
    "feels_like": 289.79,
    "temp_min": 288.15,
    "temp_max": 289.82,
    "pressure": 1001,
    "humidity": 100
  },
  "visibility": 7000,
  "wind": {
    "speed": 2,
    "deg": 130
  },
  "rain": {
    "1h": 3.05
  },
  "clouds": {
    "all": 75
  },
  "dt": 1594837715,
  "sys": {
    "type": 1,
    "id": 9029,
    "country": "RU",
    "sunrise": 1594775179,
    "sunset": 1594836257
  },
  "timezone": 10800,
  "id": 524901,
  "name": "Москва",
  "cod": 200
}
*/
