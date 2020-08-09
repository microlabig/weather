<template lang="pug">
section.weather
    .container
        .weather__data(v-if="isLoadingWeather")
            preloader
        .weather__data(v-else)
            .weather__result(v-if="isLoadedWeather")
              transition(:name="transitionName" mode="out-in")
                router-view
            .weather__result(v-else)
                h2.weather__title Сервер не отвечает
        weather-nav
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultCoordinates } from "~/api/ymaps";
import Preloader from "../common/Preloader";
import WeatherNav from "../WeatherNav";

export default {
  components: {
    Preloader,
    WeatherNav
  },
  computed: {
    ...mapGetters("weather", ["getIsLoading", "getIsLoaded"]),
    ...mapGetters("address", ["getGeoInfo"]),
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
    // ------------------------------
    // информация о населенном пункте
    // ------------------------------
    geoInfo() {
      return this.getGeoInfo;
    }
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherDaily", "fetchWeatherOnWeek"])
  },
  data() {
    return {
      transitionName: "slide-left"
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.name.length;
      const fromDepth = from.name.length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  },
  async created() {
    // запрос информации о погоде
    try {
      const { lat, lon } = this.geoInfo;
      await this.fetchWeatherDaily({ lat, lon }); // на текущий день
      await this.fetchWeatherOnWeek({ lat, lon }); // на неделю
    } catch (error) {
      this.showMessage({ type: "error", text: "Ошибка запроса данных" });
    }
  }
};
</script>

<style lang="scss">
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    //   -webkit-transform: translate(30px, 0);
    transform: translate(300%, 0);
    transition: all 0.7s;
  }
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    //   -webkit-transform: translate(-30px, 0);
    transform: translate(-300%, 0);
    transition: all 0.7s;
  }
</style>
