<template lang="pug">
.weather__week
  .weather__title
    v-card-text
      h2(class="grey--text mb-4").weather__header {{currentWeather.name}}, 
          span.weather__city погода на неделю
      v-container.week
        v-row(dense)
          v-col(cols="12")
            ul.week__list
              li(
                v-for="(weather, i) in weatherOnWeek"
                :key="i+0"
              ).week__item
                v-container(
                  cols="12"
                  :key="i+0"
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
  computed: {
    ...mapGetters("weather", ["getWeatherData", "getWeatherOnWeek"]),
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

<style lang="scss">
.week__list {
  display: flex;
  flex-direction: column;
}

.week__item {
  display: inline-block;
}

// .fade-enter-active, .fade-leave-active {
//   transition: opacity 2s ease-out;
// }
// .fade-enter, .fade-leave-to {
//   opacity: 0;
// }
</style>
