import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeMenuIndex:"1"
    },
    mutations:{
        pageChange(state, index) {
            state.activeMenuIndex = index;
        }
    }
})