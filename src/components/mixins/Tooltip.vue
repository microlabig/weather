<template lang="pug">
.tooltip(
    v-if="show"
)
    .tooltip__container(
        :style="{'background-color': color}"
    )
        .tooltip__close(
            @click="close"
        )
        .tooltip__text {{text}}
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        computed: {
            ...mapGetters('tooltip', ['getText', 'getColor', 'getShowStatus']),
            text() {
                return this.getText;
            },
            color() {
                return this.getColor;
            },
            show() {
                return this.getShowStatus
            }
        },
        methods: {
            ...mapActions('tooltip', ['closeTooltip']),
            close() {
                this.closeTooltip();
            }
        }
    }
</script>

<style lang="scss">
.tooltip {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
</style>
