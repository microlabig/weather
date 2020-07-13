<template lang="pug">
section.address
    .container
        .address__title
            h2 Поиск города
        .address__element.map
            button(
              @click="showMessage({type: 'info', text: '12345'})"
            ) Press
            address-map
        .address__result
            .address__loading(v-if="isLoadingGeoInfo")
                preloader
            .address__loaded(v-else)
                router-link(
                    v-if="isLoadedGeoInfo"
                    :to="{name: 'Weather'}"
                ).address__link {{geoInfo.address || 'Город не найден!'}}
                .address__link(v-else) Город не найден
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddressMap from "../AddressMap";
import Preloader from "../common/Preloader";

export default {
  components: {
    AddressMap,
    Preloader
  },
  computed: {
    ...mapGetters("address", ["getGeoInfo", "getIsLoading", "getIsLoaded"]),
    // -------------------------
    // флаг - данные загружаются
    // -------------------------
    isLoadingGeoInfo() {
      return this.getIsLoading;
    },
    // -----------------------
    // флаг - данные загружены
    // -----------------------
    isLoadedGeoInfo() {
      return this.getIsLoaded;
    },
    // --------------
    // гео-информация
    // --------------
    geoInfo() {
      return this.getGeoInfo;
    }
  }
};
</script>
