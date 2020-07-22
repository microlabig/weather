<template lang="pug">
section.address
    .container
        h2.address__title Поиск города
        nav.address__result
            .address__loaded(v-if="isLoadingGeoInfo")
                preloader
            .address__loaded(v-else)
                address-result
        .address__element.map
            button(
              @click="showMessage({type: 'info', text: '12345'})"
            ) Press
            address-map
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
