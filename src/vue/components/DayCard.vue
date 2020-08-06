<template lang="pug">
v-card(
        v-if="currentWeather.cod === 200"
        class="mx-auto"
        max-width="320"
        elevation="10"
    ).weather__card.card
    .card__info
        day-card-main-info(
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
                    day-card-more(
                        :show="show"
                        :currentWeather="currentWeather"
                    )
</template>

<script>
import DayCardMore from "~V/components/DayCardMore";
import DayCardMainInfo from "~V/components/DayCardMainInfo";

export default {
  components: {
    DayCardMainInfo,
    DayCardMore
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
