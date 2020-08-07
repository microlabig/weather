<template lang="pug">
main.weather
    v-app#inspire
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
                        transition(:name="transitionName" mode="out-in")
                            router-view
        v-footer(
            color="indigo"
            app
        )
            span.white--text &copy; {{ new Date().getFullYear() }} &nbsp;
            span
                v-btn(
                    :href='resumeLink'
                    target='_blank'
                    color="primary"
                ) by Igor Bezmestin 
    tooltip
</template>

<script>
import Tooltip from "./components/Tooltip";
const { resume_link } = require("~/data/consts.json");

export default {
  components: {
    Tooltip
  },
  data() {
    return {
      drawer: null,
      resumeLink: resume_link,
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
    //   const lastTo = to.path.split("/")[toDepth - 1];
    //   const lastFrom = from.path.split("/")[fromDepth - 1];

    //   console.log(to, from);
    //   console.log(lastTo, lastFrom);
    //   console.log(lastTo && lastFrom && lastTo > lastFrom);
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition: opacity 0.5s;
// }
// .slide-right-enter, .slide-right-leave-to /* ..slide-right-leave-active до версии 2.1.8 */ {
//   opacity: 0;
// }

// .slide-left-enter-active,
// .slide-left-leave-active {
//   transition: opacity 0;
// }
// .slide-left-enter, .slide-left-leave-to /* .slide-left-leave-active до версии 2.1.8 */ {
//   opacity: 0.5s;
// }

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  //   -webkit-transform: translate(30px, 0);
  transform: translate(300%, 0);
  transition: all 0.7s;
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  //   -webkit-transform: translate(-30px, 0);
  transform: translate(-300%, 0);
  transition: all 0.7s;
}
</style>
