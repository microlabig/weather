<template lang="pug">
ul(
    v-show="show"
    class="d-flex align-start flex-column"
).card__more-list
    li.card__more-item
        v-card-text {{currentWeather.main.temp}}&deg;
    li.card__item
        v-card-text Ощущается как 
            span.card__value {{currentWeather.main.feels_like}}&deg;
    li.card__more-item
        v-card-text {{currentWeather.weather[0].description}}
</template>

<script>
export default {
  props: {
    currentWeather: {
      type: Object,
      requierd: true
    },
  }
};
</script>

<style lang="scss"></style>
