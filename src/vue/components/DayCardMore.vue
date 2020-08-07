<template lang="pug">
ul(
    v-show="show"
    class="d-flex align-start justify-start flex-column pa-0"
).card__more-list
    li(
        v-for="(data, i) in currentWeatherData"
        :key="i"
    ).card__more-item
        v-card-text {{data.caption}} 
            span.card__value {{data.value}}
                span(v-html="data.units")
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
    }
  },
  data() {
    return {
      currentWeatherData: [
        {
          caption: "Макс. температура",
          value: this.currentWeather.main.temp_max.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "Миним. температура",
          value: this.currentWeather.main.temp_min.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "Давление",
          value: this.currentWeather.main.pressure,
          units: " мбар"
        },
        {
          caption: "Влажность",
          value: this.currentWeather.main.humidity,
          units: " %"
        },
        {
          caption: "Облачность",
          value: this.currentWeather.clouds.all,
          units: " %"
        },
        {
          caption: "Видимость",
          value: this.currentWeather.visibility,
          units: " м"
        },
        {
          caption: "Восход",
          value: getTime(this.currentWeather.sys.sunrise * 1000),
          units: ""
        },
        {
          caption: "Закат",
          value: getTime(this.currentWeather.sys.sunset * 1000),
          units: ""
        }
      ]
    };
  }
};
</script>
