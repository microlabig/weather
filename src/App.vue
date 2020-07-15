<template lang="pug">
main.weather
    router-view
    tooltip
</template>

<script>
import Tooltip from "./components/Tooltip";
export default {
    components: {
        Tooltip
    }
}
</script>
