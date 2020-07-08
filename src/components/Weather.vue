<template lang="pug">
    section.weather
      .container
      .weather__title(v-if="isLoading")
        preloader
      .weather__title(v-else)
        h2 Погода на {{Date.now().toUTCSting()}} в городе {{weatherData.name}}
        pre {{data}}
        p 5&deg;
      .weather__links
        ul.weather__list
          li(
            v-for="(link, idx) in links"
            :key="idx"
          ).weather__item
            router-link(
              :to="link.to"
            ) {{link.text}}
</template>

<script>
  import { mapGetters } from 'vuex'; 
  import Preloader from './Preloader';

  export default {
    components: {
      Preloader
    },
    data() {
      return {
        links: [
          {
            to: "{name: 'Weather', props: {city: weatherData.name}}", // TODO:
            text: "Погода на 10 дней"
          },
          {
            to: "{name: 'Search'}",
            text: "На главную"
          }
        ]
      }
    },
    computed: {
      ...mapGetters('weather', ['getWeather', 'getIsLoading', 'getIsLoaded']),
      isLoading() {
        return this.getIsLoading();
      },
      isLoaded() {
        return this.getIsLoaded();
      },
      weatherData() {
        return this.getWeather();
      }
    }
  };
</script>

<style lang="scss"></style>