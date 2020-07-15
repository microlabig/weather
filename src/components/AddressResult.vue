<template lang="pug">
.address__linkscontainer
        router-link(
            v-if="isLoadedGeoInfo"
            :to="{name: 'Weather'}"
        ).address__link {{geoInfo.address || 'Город не найден!'}}
        p(v-else).address__link Город не найден
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("address", ["getGeoInfo", "getIsLoaded"]),
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
