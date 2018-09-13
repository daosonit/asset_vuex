export default {
    SET_FACEBOOK_CONNECT(state, data) {
        Vue.set(state, "link_fb_auth", data)
    },

    SET_FACEBOOK_PROFILE(state, data) {
        Vue.set(state, "facebook_profile", data)
    },

    SET_LIST_GROUP(state, data) {
        Vue.set(state, "list_group", data)
    },

    SET_FIRST_LIST_GROUP(state, data) {
        Vue.set(state, "first_list_group", data)
    },

    SET_ACTIVE_CRAWL(state, data) {
        Vue.set(state, "user_fb_group", data)
    },

    SET_DATA_CRAWL_FB(state, data) {
        Vue.set(state, "data_crawl_fb", data)
    },
};