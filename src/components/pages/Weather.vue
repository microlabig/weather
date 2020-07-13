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
import { defaultCoords, getCurrentDate } from "@/helpers";
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
    // ----------------------
    // запрос данных о погоде
    // ----------------------
    async fetchWeather() {
      const coords = this.getGeoInfo.address ? this.getGeoInfo : defaultCoords;
      return await this.fetchWeatherData(coords);
    }
  },
  computed: {
    ...mapGetters("weather", ["getWeatherData", "getIsLoading", "getIsLoaded"]),
    ...mapGetters("address", ["getGeoInfo"]),
    // -----------------------
    // текущие данные о погоде
    // -----------------------
    currentWeather() {
      return this.getWeatherData;
    },
    // -------------------------
    // флаг - данные загружаются
    // -------------------------
    isLoadingWeather() {
      return this.getIsLoading;
    },
    // -----------------------
    // флаг - данные загружены
    // -----------------------
    isLoadedWeather() {
      return this.getIsLoaded;
    },
    // ------------
    // текущая дата
    // ------------
    currentDate() {
      return getCurrentDate();
    }
  },
  async mounted() {
    // запрос информации о погоде
    await this.fetchWeather();
  }
};
</script>

<style lang="scss"></style>
