<template lang="pug">
.weather__week
  .weather__title
    v-card-text
      h2(class="grey--text mb-4").weather__header {{currentWeather.name}}, 
          span.weather__city погода на неделю
      v-container
        v-row(dense)
          v-col(cols="12")
            v-container(
              v-for="(weather, i) in weatherOnWeek"
              :key="i"
              cols="12"
            )
              week-weather-card(:weather="weather")
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WeekWeatherCard from "../WeekWeatherCard";

export default {
  components: {
    WeekWeatherCard
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('weather', ['getWeatherData', 'getWeatherOnWeek']),
    // -----------------------
    // текущие данные о погоде
    // -----------------------
    currentWeather() {
      return this.getWeatherData;
    },
    // ----------------
    // погода на неделю
    // ----------------
    weatherOnWeek() {
      return this.getWeatherOnWeek;
    }
  }
};
</script>
