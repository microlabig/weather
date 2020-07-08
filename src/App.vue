<template lang="pug">
  main.weather
    router-view
</template>

<script>
  import Err404 from '@/components/Err404'; 
  import Search from '@/components/Search'; 
  import Weather from '@/components/Weather'; 

  export default {
    components: {
      Err404, Search, Weather
    }
  }
</script>

<style lang="scss">
  @import url('./styles/main.scss');
</style>
