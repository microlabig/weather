<template lang="pug">
v-container
  pre {{weatherOnWeek}}
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('weather', ['getWeatherOnWeek']),
    weatherOnWeek() {
      return this.getWeatherOnWeek;
    }
  },
  mounted() {
    // console.log(this.weatherOnWeek);
  }
};
</script>
