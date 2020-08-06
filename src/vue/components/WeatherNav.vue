<template lang="pug">
nav.weather__navigations
    ul.weather__list
        li(
            v-for="(link, idx) in links"
            :key="idx"
        ).weather__item
            router-link(
                v-if="$route.name !== link.to"
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
          to: "Week",
          text: "Погода на неделю"
        },
        {
          to: "Day",
          text: "Погода на день"
        }
      ]
    };
  }
};
</script>