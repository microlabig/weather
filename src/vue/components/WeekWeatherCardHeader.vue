<template lang="pug">
v-col(class="pa-0 ma-0").card__item
    v-row(align="center")
        v-col(cols="3")
            v-img(
                :src="weather.icon"
                alt="weather.weather[0].description"
            )
        v-col(cols="4")
            v-row
                v-card-text(class="headline") {{currentDayOfWeek(weather.dt)}} 
                    span.card__value {{currentDate(weather.dt)}}
            v-row
                v-card-text(class="title text-no-wrap").card__value {{weather.weather[0].description}}
        v-col(cols="4")
            v-row
                v-card-text(class="text-no-wrap body-1 text-start") Вероятность осадков 
                    span.card__value.body-1 {{weather.pop}} %
            v-row
                v-list-item(class="text-start")
                    v-list-item-icon(:style="{ transform: 'rotate(' + weather.wind_deg + 'deg)'}")
                        v-icon mdi-send
                    v-list-item-subtitle(class="body-1").card__value {{weather.wind_speed}} m/c
</template>

<script>
import { getCurrentDate, getDayOfWeek } from "~/helpers";

export default {
  props: {
    weather: {
      type: Object,
      required: true
    }
  },
  methods: {
    // ------------
    // текущая дата
    // ------------
    currentDate(dayTimeStamp) {
      return getCurrentDate(dayTimeStamp * 1000);
    },
    // -----------
    // день недели
    // -----------
    currentDayOfWeek(dayTimeStamp) {
      return getDayOfWeek(dayTimeStamp * 1000);
    }
  }
};
</script>
