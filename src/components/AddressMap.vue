<template lang="pug">
yandex-map(
    :coords="geoInfo | getCoords"
    :zoom="17"
    :controls=['zoomControl', 'searchControl']
    @map-was-initialized="yMapWasInitialized"
    @click="yMapClick"
    class="ymaps"
)
  ymap-marker(
      marker-id="123" 
      :coords="geoInfo | getCoords"
      :icon="markerIcon"
  )
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultCoordinates } from "@/api/ymaps";

export default {
  data() {
    return {
      markerIcon: {
        // свойства кастомной метки на карте
        layout: "default#image",
        imageHref: "./src/assets/geo.png",
        imageSize: [32, 32],
        imageOffset: [-16, -32]
      }
    };
  },
  methods: {
    ...mapActions("address", ["fetchCurrentLocation", "fetchLocation"]),
    // ------------------------------
    // обработчик инициализации карты
    // ------------------------------
    async yMapWasInitialized(map) {
      // получить текущую позицию браузера
      await this.fetchCurrentLocation();
      // найдем элемент поиска населенного пункта
      const searchControl = map.controls.get("searchControl"); // компонент поиска города на ymaps
      // обработчик по выбору города из поиска
      searchControl.events.add("resultselect", e => {
        const geoObj = searchControl.getResultsArray(
          searchControl.getSelectedIndex()
        )[0]; // найдем элемент, по которому кликнул пользователь
        const coords = geoObj.geometry
          .getCoordinates()
          .filter((item, index) => index < 2); // определим координаты найденного населенного пункта (в массиве также есть третий аргумент - объект, он нам не нужен)
        searchControl.hideResult(); // скрыть стандартные результаты поиска
        this.fetchLocation(coords); // обновить координаты и название населенного пункта в хранилище
      });
    },
    // -------------------------------------------------------------
    // клик по карте и определение населенного пункта по координатам
    // -------------------------------------------------------------
    yMapClick(e) {
      const coords = e.get("coords");
      this.fetchLocation(coords);
    }
  },
  filters: {
    getCoords({lat, lon}) {
      return [lat || defaultCoordinates.lat, lon || defaultCoordinates.lon];
    }
  },
  computed: {
    ...mapGetters("address", ["getGeoInfo", "getIsLoading", "getIsLoaded"]),
    geoInfo() {
      return this.getGeoInfo;
    }
  }
};
</script>

<style lang="scss">
  .ymaps {
    width: 100%;
    height: calc(100vh - 150px);
  }
</style>
