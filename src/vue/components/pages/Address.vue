<template lang="pug">
section.address
    .container
        button(
          @click.prevent='showTooltip({type: "info", text: "123456789kls sdfkgj dflg dsf g"})'
        ) PRESS
        v-card-text
          h2(class="display-1 text--primary").address__title Поиск города
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
