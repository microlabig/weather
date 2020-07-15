import Vue from 'vue';
import { mapActions } from 'vuex';

// глобальный миксин для показа тултипа
Vue.mixin({
    methods: {
        ...mapActions('tooltip', ['showTooltip']),
        showMessage(objMessage) {
            // где objMessage = { type, text }, а type = "error", "info"
            this.showTooltip(objMessage);
        }
    }
});
