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
    bottom: 50px;
    transform: translate(-50%, -5%);
    left: 50%;
    color: white;
    font-weight: 700;
    box-shadow: 6px 6px 9px grey;
    text-shadow: 6px 6px 9px grey;
}
.tooltip__container {
    padding: 20px;
}
</style>
