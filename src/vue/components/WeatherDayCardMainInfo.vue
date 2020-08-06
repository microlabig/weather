<template lang="pug">
ul(
    v-show="show"
    class="d-flex align-start flex-column"
).card__more-list
    li.card__more-item
        v-card-text
          v-row(align="center")
            v-col(cols="6")
              v-card-text(class="display-1 text-no-wrap") {{currentWeather.main.temp.toFixed(0)}} &deg;C
            v-col(cols="6")
              v-img(
                :src="getIconDayImage"
                alt="currentWeather.weather[0].description"
              )
    li.card__more-item
        v-card-text.card__value {{currentWeather.weather[0].description}}
    li.card__item
        v-list-item
          v-list-item-icon(:style="{ transform: 'rotate(' + currentWeather.wind.deg + 'deg)'}")
            v-icon mdi-send
          v-list-item-subtitle.card__value {{currentWeather.wind.speed}} m/c
    li.card__item
        v-card-text Ощущается как 
            span.card__value {{currentWeather.main.feels_like.toFixed(1)}} &deg;C
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters("weather", ["getIconDay"]),
    getIconDayImage() {
      return this.getIconDay
    }
  }
};
</script>
