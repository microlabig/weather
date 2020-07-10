<template lang="pug">
section.search
    .container
      .search__title
          h2 Поиск города
      .search__element
          form.search__form.form
              .form__container
                  .form__row
                      .form__label Выберите вариант загрузки данных
                      ul.form__list
                          li(
                              v-for="(choose, idx) in chooseList"
                              :key="idx"
                          ).form__item
                              label(
                                :for="choose.id"
                              ).form__label {{choose.label}}
                              input(
                                  type="radio" 
                                  name="choose" 
                                  :id="choose.id"
                                  :value="choose.value"
                                  v-model="showMap"
                              ).form__input
                  .form__row(v-if="!showMap")
                      label(for="searchInput").form__label Введите ваш город
                      input(
                          placeholder="Москва" 
                          v-model="cityStr"
                          @keydown.enter="fetchCity"
                      )#searchInput.form__input
                      button(type="button" @click.prevent="fetchCity").form__submit Найти
                  .form__row(v-else)
                      .form__map.map
                          .map__container
                              yandex-map(
                                :coords=[55.37976654,43.78774518]
                              )
              .form__result
                  .form__loading(v-if="isLoadingCity")
                      preloader
                  .form__loaded(v-else)
                      router-link(
                          v-if="isLoadedCity"
                          :to="{name: 'Weather'}"
                      ).form__link {{currentCity.name || 'Город не найден!'}}
                      .form__link(
                          v-else
                      ) Город не найден
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "../common/Preloader";

export default {
  components: {
    Preloader
  },
  data() {
    return {
      showMap: true,
      cityStr: "",
      chooseList: [
        {
          label: "На карте",
          value: true,
          id: "mapInput"
        },
        {
          label: "Вручную",
          value: false,
          id: "manualInput"
        }
      ]
    };
  },
  watch: {
    showMap(isTrue) {
      if (isTrue) {
        this.cityStr = "";
      }
    }
  },
  methods: {
    ...mapActions("city", ["fetchCityData"]),
    fetchCity() {
      this.fetchCityData(this.cityStr);
    }
  },
  computed: {
    ...mapGetters("city", [
      "getCityData",
      "getIsLoading",
      "getIsLoaded"
    ]),
    currentCity() {
      return this.getCityData;
    },
    isLoadingCity() {
      return this.getIsLoading;
    },
    isLoadedCity() {
      return this.getIsLoaded;
    }
  }
};
</script>

<style lang="scss"></style>
