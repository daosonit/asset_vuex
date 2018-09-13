import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export const FacebookStore = {
    state: {
        first_list_group: null,
        list_group: null,
        link_fb_auth: null,
    },
    getters,
    actions,
    mutations,
}