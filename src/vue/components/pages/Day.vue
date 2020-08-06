<template lang="pug">
.weather__day
    .weather__title
        v-card-text
            h2(class="grey--text mb-4").weather__header {{currentWeather.name}}, 
                span.weather__city погода на 
                span.weater_date {{currentDate}}, {{currentDayOfWeek}}
            .weather__info
                day-card(
                  :currentWeather="currentWeather"
                )
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrentDate, getDayOfWeek } from "~/helpers";
import DayCard from "~V/components/DayCard";

export default {
  components: {
    DayCard
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
