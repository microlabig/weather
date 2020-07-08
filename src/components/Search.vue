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
                                    label().form__label {{choose.label}}
                                    input(
                                        :id="choose.id"
                                        type="radio" 
                                        name="choose" 
                                        :value="choose.value"
                                        v-model="showMap"
                                    ).form__input
                        .form__row(v-if="showMap")
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
                                    p MAP
                    .form__result
                        .form__loading(v-if="isLoading")
                            preloader
                        .form__loaded(v-else)
                            router-link(
                                v-if="isLoaded"
                                :to="{name: 'Weather'}"
                            ).form__link {{city.name || 'Город не найден!'}}
                            .form__link(
                                v-else
                            ) Город не найден
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Preloader from "./Preloader";

export default {
  components: {
    Preloader
  },
  data() {
    return {
      showMap: false,
      cityStr: "",
      chooseList: [
        {
          label: "На карте",
          value: false,
          id: "mapInput"
        },
        {
          label: "Вручную",
          value: true,
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
    ...mapGetters("city", ["getCityData", "getIsLoading", "getIsLoaded"]),
    city() {
      return this.getCityData;
    },
    isLoading() {
      return this.getIsLoading;
    },
    isLoaded() {
      return this.getIsLoaded;
    }
  }
};
</script>

<style lang="scss"></style>
