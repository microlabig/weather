<template lang="pug">
  div
    weather-app
</template>

<script>
  import WeatherApp from "./components/Weather";

  export default {
    name: 'app',
    components: {
      WeatherApp
    }
  }
</script>

<style lang="scss">
  @import url('./app.scss');
</style>
