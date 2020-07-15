<template lang="pug">
section.weather
    .container
        .weather__data(v-if="isLoadingWeather")
            pre isLoadingWeather = {{isLoadingWeather}}
            preloader
        .weather__data(v-else)
            pre isLoadingWeather = {{isLoadingWeather}}
            weather-day
        weather-nav
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultCoordinates } from "@/api/ymaps";
import Preloader from "../common/Preloader";
import WeatherDay from "../WeatherDay";
import WeatherNav from "../WeatherNav";

export default {
  components: {
    Preloader,
    WeatherDay,
    WeatherNav
  },
  computed: {
    ...mapGetters("weather", ["getIsLoading"]),
    ...mapGetters("address", ["getGeoInfo"]),
    // -------------------------
    // флаг - данные загружаются
    // -------------------------
    isLoadingWeather() {
      return this.getIsLoading;
    },
    // ------------------------------
    // информация о населенном пункте
    // ------------------------------
    geoInfo() {
      return this.getGeoInfo;
    }
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherDaily"])
  },
  async created() {
    // запрос информации о погоде
    try {
      const { lat, lon } = this.geoInfo;
      await this.fetchWeatherDaily({ lat, lon });
    } catch (error) {
      this.showMessage({ type: "error", text: "Ошибка запроса данных" });
    }
  }
};
</script>
