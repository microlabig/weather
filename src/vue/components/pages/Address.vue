<template lang="pug">
section.address
    .container
        v-card-text
          h2(class="display-1 text--primary").address__title Поиск города
          p.headline.address__description {{description}}
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
  data() {
    return {
      description: `Для автоматического выбора города включите функцию местоположения в браузере или выберите его вручную на карте ниже`
    }
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
