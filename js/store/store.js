import Vue from 'vue'
import Vuex from 'vuex'

import { FacebookStore } from './modules/facebook/store'
import { JobStore } from './modules/job/store'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
    state: {
        apiDomain: MyworkCrawl.apiDomain,
        dataJobs: MyworkCrawl.dataJobs,
        userInfo: MyworkCrawl.userInfo,
        dataAttrJob: null
    },
    getters,
    actions,
    mutations,
    modules: {
        facebook_store: FacebookStore,
        job_store: JobStore
    },
    strict: debug
})