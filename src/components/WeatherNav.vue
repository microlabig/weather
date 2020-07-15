<template lang="pug">
nav.weather__navigations
    ul.weather__list
        li(
            v-for="(link, idx) in links"
            :key="idx"
        ).weather__item
            router-link(
                :to="{name: `${link.to}`}"
            ) {{link.text}}
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          to: "Address",
          text: "Настроить город"
        },
        {
          to: "Weather",
          text: "Погода на 10 дней"
        }
      ]
    };
  }
};
</script>