<template lang="pug">
.weather__day
    .weather__title
        v-card-text
            h2(class="grey--text mb-4").weather__header {{currentWeather.name}}, 
                span.weather__city погода на 
                span.weater_date {{currentDate}}, {{currentDayOfWeek}}
            .weather__info
                weather-day-card(
                  :currentWeather="currentWeather"
                )
        //- pre {{currentWeather}}
    
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrentDate, getDayOfWeek } from "~/helpers";
import WeatherDayCard from "~V/components/WeatherDayCard";

export default {
  components: {
    WeatherDayCard
  },
  computed: {
    ...mapGetters("weather", ["getWeatherData"]),
    // -----------------------
    // текущие данные о погоде
    // -----------------------
    currentWeather() {
      return this.getWeatherData;
    },
    // ------------
    // текущая дата
    // ------------
    currentDate() {
      return getCurrentDate();
    },
    // -----------
    // день недели
    // -----------
    currentDayOfWeek() {
      return getDayOfWeek(new Date());
    }
  }
};
</script>

<style lang="scss"></style>
