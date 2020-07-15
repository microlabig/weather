<template lang="pug">
.weather__day
    pre isLoadedWeather = {{isLoadedWeather}}
    pre currentWeather = {{currentWeather}}
    .weather__result(v-if="isLoadedWeather")
        .weather__title
            h2.weather__header Погода на 
                span.weater_date {{currentDate}}, {{currentDayOfWeek}} 
                span в городе 
                span.weather__city {{currentWeather.name}}
        .weather__info
            p 5&deg;
    .weather__result(v-else)
        h2.weather__title Сервер не отвечает
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getCurrentDate, getDayOfWeek } from "@/helpers";

export default {
  computed: {
    ...mapGetters("weather", ["getIsLoaded", "getWeatherData"]),
    // -----------------------
    // флаг - данные загружены
    // -----------------------
    isLoadedWeather() {
      return this.getIsLoaded;
    },
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
