<template lang="pug">
v-col(class="pa-0 ma-0").card__item
    v-row
        v-col(
            v-for="(data, i) in temperatureData"
            :key="i"
            cols="2"
        )
            v-card-text(class="text-no-wrap body-1") {{data.caption}}
            .card__value {{data.value}}
                span(v-html="data.units")
</template>

<script>
export default {
  props: {
    temp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      temperatureData: [
        {
          caption: "Утро",
          value: this.temp.morn.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "День",
          value: this.temp.day.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "Вечер",
          value: this.temp.eve.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "Ночь",
          value: this.temp.night.toFixed(1),
          units: " &deg;C"
        },
        {
          caption: "Минимум",
          value: this.temp.min,
          units: " &deg;C"
        },
        {
          caption: "Максимум",
          value: this.temp.max,
          units: " &deg;C"
        }
      ]
    };
  }
};
</script>
