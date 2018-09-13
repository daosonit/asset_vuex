import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export const JobStore = {
    state: {
        first_list_job: null,
        list_job: null,
        current_job_publish: null
    },
    getters,
    actions,
    mutations,
}