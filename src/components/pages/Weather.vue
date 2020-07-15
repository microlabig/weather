<template lang="pug">
section.weather
    .container
        .weather__data(v-if="isLoadingWeather")
            preloader
        .weather__data(v-else)
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
    // -------------------------
    // флаг - данные загружаются
    // -------------------------
    isLoadingWeather() {
      return this.getIsLoading;
    }
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherDaily"])
  },
  async mounted() {
    // запрос информации о погоде
    try {
      await this.fetchWeatherDaily();
    } catch (error) {
      this.showMessage({ type: "error", text: "Ошибка запроса данных" });
    }
  }
};
</script>
