<template lang="pug">
section.weather
    .container
        pre {{currentWeather}}
        p 5&deg;
        .weather__header(v-if="isLoadingWeather")
            preloader
        .weather__header(v-else)
            h2.weather__title Погода на 
                span.weater_date {{currentDate}} 
                span в городе 
                span.weather__city {{currentWeather.name}}
        .weather__links
            ul.weather__list
                li(
                  v-for="(link, idx) in links"
                  :key="idx"
                ).weather__item
                    router-link(
                      :to="{name: `${link.to}`}"
                    ) {{link.text}}
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getCurrentDate } from "@/helpers";
import Preloader from "../common/Preloader";

export default {
  components: {
    Preloader
  },
  data() {
    return {
      links: [
        {
          to: "Weather",
          text: "Погода на 10 дней"
        },
        {
          to: "Address",
          text: "Настроить город"
        }
      ]
    };
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherData"]),
    // запрос данных о погоде
    fetchWeather() {
      const city = this.currentCity;
      this.fetchWeatherData(city);
    }
  },
  computed: {
    ...mapGetters("weather", ["getWeatherData", "getIsLoading", "getIsLoaded"]),
    currentWeather() {
      return this.getWeatherData;
    },
    currentDate() {
      return getCurrentDate();
    },
    isLoadingWeather() {
      return this.getIsLoading;
    },
    isLoadedWeather() {
      return this.getIsLoaded;
    }
  }
};
</script>

<style lang="scss"></style>
