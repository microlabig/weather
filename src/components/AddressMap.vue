<template lang="pug">
yandex-map(
    :coords="currentCity | getCoords"
    :zoom="17"
    :controls=['zoomControl', 'searchControl']
    @map-was-initialized="yMapWasInitialized"
    @click="yMapClick"
    class="ymaps"
)
    ymap-marker(
        marker-id="123" 
        :coords="currentCity | getCoords"
        :icon="markerIcon"
    )
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultCoords } from "@/helpers";

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
  methods: {
    ...mapActions("address", ["getCurrentLocation", "getLocation"]),
    async yMapWasInitialized(map) {
      await this.getCurrentLocation();

      const searchControl = map.controls.get("searchControl"); // компонент поиска города на ymaps
      // выбор города из поиска
      searchControl.events.add("resultselect", e => {
        const geoObj = searchControl.getResultsArray(
          searchControl.getSelectedIndex()
        )[0];
        const coords = geoObj.geometry
          .getCoordinates()
          .filter((item, index) => index < 2);
        searchControl.hideResult();
        this.getLocation(coords);
      });
    },
    yMapClick(e) {
      const coords = e.get("coords");
      this.getLocation(coords);
    }
  },
  filters: {
    getCoords(obj) {
      return [obj.lat || defaultCoords.lat, obj.lon || defaultCoords.lon];
    }
  },
  computed: {
    ...mapGetters("address", ["getCityData", "getIsLoading", "getIsLoaded"]),
    currentCity() {
      return this.getCityData;
    }
  }
};
</script>

<style lang="scss">
.ymaps {
    width: 500px;
    height: 500px;
}
</style>
