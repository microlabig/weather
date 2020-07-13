<template lang="pug">
main.weather
    router-view
    tooltip
</template>

<script>
import Tooltip from "./components/mixins/Tooltip";
export default {
    components: {
        Tooltip
    }
}
</script>
