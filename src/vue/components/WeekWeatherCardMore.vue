<template lang="pug">
v-col(class="pa-0 ma-0").card__item
    v-row
        v-col(
            v-for="(data, i) in weatherData"
            :key="i"
            cols="2"
        )
            v-card-text(class="text-no-wrap body-1") {{data.caption}} 
            .card__value {{data.value}}
                span(v-html="data.units")
</template>

<script>
import { getCurrentDate, getDayOfWeek, getTime } from "~/helpers";

export default {
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      weatherData: [
        {
          caption: "Точка росы",
          value: this.weather.dew_point,
          units: " &deg;C"
        },
        {
          caption: "Давление",
          value: this.weather.pressure,
          units: " мбар"
        },
        {
          caption: "Влажность",
          value: this.weather.humidity,
          units: " %"
        },
        {
          caption: "УФ-индекс",
          value: this.weather.uvi,
          units: ""
        },
        {
          caption: "Восход",
          value: getTime(this.weather.sunrise * 1000),
          units: ""
        },
        {
          caption: "Закат",
          value: getTime(this.weather.sunset * 1000),
          units: ""
        }
      ]
    };
  }
};
</script>
