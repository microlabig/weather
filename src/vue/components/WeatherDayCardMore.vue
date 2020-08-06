<template lang="pug">
ul(
    v-show="show"
    class="d-flex align-start flex-column"
).card__more-list
    li.card__more-item
        v-card-text Максимальная температура 
            span.card__value {{currentWeather.main.temp_max.toFixed(1)}} &deg;C
    li.card__item
        v-card-text Минимальная температура 
            span.card__value {{currentWeather.main.temp_min.toFixed(1)}} &deg;C
    li.card__item
        v-card-text Давление 
            span.card__value {{currentWeather.main.pressure}} мбар
    li.card__item
        v-card-text Влажность 
            span.card__value {{currentWeather.main.humidity}} %
    li.card__item
        v-card-text Облачность 
            span.card__value {{currentWeather.clouds.all}} %
    li.card__item
        v-card-text Видимость 
            span.card__value {{currentWeather.visibility}} м
    li.card__item
        v-card-text Восход 
            span.card__value {{sunrise}}
    li.card__item
        v-card-text Закат 
            span.card__value {{sunset}}
</template>

<script>
import { getTime } from "~/helpers";

export default {
  props: {
    currentWeather: {
      type: Object,
      requierd: true
    },
    show: {
      type: Boolean,
      requierd: true
    },
  },
  computed: {
     sunrise() {
         return getTime(this.currentWeather.sys.sunrise);
     },
     sunset() {
         return getTime(this.currentWeather.sys.sunset);
     },
  }
};
</script>

<style lang="scss"></style>
