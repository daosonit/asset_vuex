export default {
    SET_LIST_JOB (state, data) {
        Vue.set(state, "list_job", data)
    },

    SET_FIRST_LIST_JOB (state, data) {
        Vue.set(state, "first_list_job", data)
    },

    SET_CURRENT_JOB_PUBLISH (state, data) {
        Vue.set(state, "current_job_publish", data)
    },

    SET_STATUS_MARK_SPAM_JOB (state, data) {
        Vue.set(state, "status_mark_spam_job", data)
    },

    SET_LIST_JOB_PUBLISH (state, data) {
        Vue.set(state, "list_job_publish", data)
    },

    SET_DATA_STATISTIC_JOB (state, data) {
        Vue.set(state, "data_statistic_job", data)
    },
};