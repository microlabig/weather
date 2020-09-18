<template lang="pug">
v-card(
    class="mx-auto"
    max-width="920"
    elevation="10"
)
    v-row(class="d-flex align-start flex-column").card__list
        week-weather-card-header(:weather="weather")
        week-weather-card-temp(:temp="weather.temp")
        week-weather-card-more(:weather="weather")
</template>

<script>
import { getCurrentDate, getDayOfWeek } from "~/helpers";
import WeekWeatherCardHeader from "~V/components/WeekWeatherCardHeader";
import WeekWeatherCardTemp from "~V/components/WeekWeatherCardTemp";
import WeekWeatherCardMore from "~V/components/WeekWeatherCardMore";

export default {
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  components: {
      WeekWeatherCardHeader,
      WeekWeatherCardTemp,
      WeekWeatherCardMore
  }
};
</script>
