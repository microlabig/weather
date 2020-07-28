<template lang="pug">
main.weather
    v-app#inspire
        v-navigation-drawer(v-model='drawer' app='')
            v-list(dense='')
                v-list-item(link='')
                    v-list-item-action
                        v-icon mdi-home
                    v-list-item-content
                        v-list-item-title Home
                v-list-item(link='')
                    v-list-item-action
                        v-icon mdi-email
                    v-list-item-content
                        v-list-item-title Contact
        v-app-bar(
            app=''
            color='indigo'
            dark=''
        )
            v-toolbar-title My Weather Application
        v-main
            v-container(
                fluid=''
            ).fill-height
                v-row(align='center' justify='center')
                    v-col.text-center
                        v-btn(:href='myResume' icon='' large='' target='_blank')
                            v-icon(large='') mdi-code-tags
                        router-view
        v-footer(
            color="indigo"
            app
        )
            span.white--text &copy; {{ new Date().getFullYear() }} &nbsp;
            span
                v-btn(
                    :href='myResume'
                    target='_blank'
                    color="primary"
                ) by Igor Bezmestin 
    tooltip
</template>

<script>
    import Tooltip from "./components/Tooltip";

    export default {
        components: {
            Tooltip
        },
        data() {
            return {
                drawer: null,
                myResume: 'https://nn.hh.ru/resume/0ffd953fff05649c9c0039ed1f523344466e4c'
            }
        }
    };
</script>
