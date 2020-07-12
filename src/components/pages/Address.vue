<template lang="pug">
section.address
    .container
      .address__title
          h2 Поиск города
      .address__element.map
          address-map
      .address__result
          .address__loading(v-if="isLoadingCity")
              preloader
          .address__loaded(v-else)
              router-link(
                  v-if="isLoadedCity"
                  :to="{name: 'Weather'}"
              ).address__link {{currentCity.address || 'Город не найден!'}}
              .address__link(v-else) Город не найден
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddressMap from "../AddressMap";
import Preloader from "../common/Preloader";

export default {
  data() {
    return {
      markerIcon: {
        layout: "default#image",
        imageHref: "./src/assets/geo.png",
        imageSize: [32, 32],
        imageOffset: [-16, -32]
      }
    };
  },
  components: {
    AddressMap,
    Preloader
  },
  methods: {
    ...mapActions("address", ["getCurrentLocation", "getLocation"]),
    fetchCity() {
      this.fetchCityData(this.cityStr);
    }
  },
  computed: {
    ...mapGetters("address", ["getCityData", "getIsLoading", "getIsLoaded"]),
    isLoadingCity() {
      return this.getIsLoading;
    },
    isLoadedCity() {
      return this.getIsLoaded;
    },
    currentCity() {
      return this.getCityData;
    }
  }
};
</script>
