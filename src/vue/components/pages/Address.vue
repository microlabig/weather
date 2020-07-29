<template lang="pug">
section.address
    .container
        v-card-text
          h2.display-1.text--primary.address__title Поиск города
        .address__element.map
            address-map
        nav.address__result
            .address__loaded(v-if="isLoadingGeoInfo")
                preloader
            .address__loaded(v-else)
                address-result
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../common/Preloader";
import AddressMap from "../AddressMap";
import AddressResult from "../AddressResult";

export default {
  components: {
    Preloader,
    AddressMap,
    AddressResult
  },
  computed: {
    ...mapGetters("address", ["getIsLoading"]),
    // -------------------------
    // флаг - данные загружаются
    // -------------------------
    isLoadingGeoInfo() {
      return this.getIsLoading;
    }
  }
};
</script>
