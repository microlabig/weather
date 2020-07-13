const INFO_TYPE = "info";       // тип сообщения - информационное
const ERROR_TYPE = "error";     // тип сообщения - ошибка
const INFO_COLOR = "#00ff00"; 
const ERROR_COLOR = "#ff0000";
const DELAY = 3500;             // задержка показа сообщения

const initState = {
    text: "",
    show: false,
    color: INFO_COLOR,
    delay: DELAY
};

export default {
    namespaced: true,

    state: {...initState},

    mutations: {
        SET_TEXT: (state, text) => {
            state.text = text
        },
        SET_SHOW: (state, show) => {
            state.show = show
        },
        SET_COLOR: (state, color) => {
            state.color = color
        },
        SET_DELAY: (state, delay) => {
            state.delay = delay
        },
    },
    
    actions: {
        // ---------------
        // показать тултип
        // ---------------
        showTooltip(store, { type, text }) {
            const { commit, dispatch, state: {delay} } = store;
            switch (type) {
                case ERROR_TYPE:
                    commit('SET_COLOR', ERROR_COLOR);
                    break;
                case INFO_TYPE:
                    commit('SET_COLOR', INFO_COLOR);
                    break;
            }
            commit('SET_TEXT', text);
            commit('SET_SHOW', true);
            setTimeout(() => {
                dispatch('closeTooltip');
            }, delay);
        },
        // -------------
        // скрыть тултип
        // -------------
        closeTooltip({ commit }) {
            commit('SET_TEXT', '');
            commit('SET_SHOW', false);
        }
    },

    getters: {
        getText: store => store.text,
        getShowStatus: store => store.show,
        getColor: store => store.color,
        getDelay: store => store.delay
    }
};
