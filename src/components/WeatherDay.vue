<template lang="pug">
.weather__day
    .weather__title
        pre {{currentWeather}}
        h2.weather__city {{currentWeather.name}}, 
            span.weather__header погода на 
            span.weater_date {{currentDate}}, {{currentDayOfWeek}} 
    .weather__info
        p 5&deg;
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getCurrentDate, getDayOfWeek } from "@/helpers";

export default {
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
