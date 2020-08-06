<template lang="pug">
v-card(
        v-if="currentWeather.cod === 200"
        class="mx-auto"
        max-width="320"
        elevation="10"
    ).weather__card.card
    .card__info
        //- v-img.card__icon
        weather-day-card-main-info(
            :currentWeather="currentWeather"
            :show="show"
        )
        v-card(
            class="d-flex align-end flex-column"
            flat
            tile
        )
            v-btn(
                @click="show = !show"
                class="mt-auto"
                text
            ).card__btn Еще
                v-icon {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            v-expand-transition
                .card__moreinfo(v-show="show")
                    weather-day-card-more(
                        :show="show"
                        :currentWeather="currentWeather"
                    )
</template>

<script>
import WeatherDayCardMore from "~V/components/WeatherDayCardMore";
import WeatherDayCardMainInfo from "~V/components/WeatherDayCardMainInfo";

export default {
  components: {
    WeatherDayCardMainInfo,
    WeatherDayCardMore
  },
  props: {
    currentWeather: {
      type: Object,
      requierd: true
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    sunrise() {
      return getTime(this.currentWeather.sys.sunrise);
    },
    sunset() {
      return getTime(this.currentWeather.sys.sunset);
    }
  }
};
</script>

<style lang="scss"></style>
