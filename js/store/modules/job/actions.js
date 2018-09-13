export default {
    GET_LIST_JOB ({ state, commit, rootState }, query) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/${rootState.userInfo.id}`
            Vue.http.get(link, query).then(function(response)
            {
                commit("SET_LIST_JOB", response.data)
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    PUBLISH_JOB_CRAWL ({ state, commit, rootState }, formData) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/publish`
            Vue.http.post(link, formData).then(function(response)
            {
                if (typeof response.data.data !== 'undefined')
                {
                    commit("SET_CURRENT_JOB_PUBLISH", response.data.data)
                }
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    MARK_SPAM_JOB_CRAWL ({ state, commit, rootState }, data) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/mark-spam`
            Vue.http.post(link, data).then(function(response)
            {
                commit("SET_STATUS_MARK_SPAM_JOB", response.data)
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    GET_LIST_JOB_PUBLISH ({ state, commit, rootState }, data) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/${rootState.userInfo.id}/publish`
            Vue.http.get(link, data).then(function(response)
            {
                commit("SET_LIST_JOB_PUBLISH", response.data)
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    UPDATE_JOB_PUBLISHED ({ state, commit, rootState }, data) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/${rootState.userInfo.id}/publish/${data.id}`
            Vue.http.post(link, data).then(function(response)
            {
                // commit("SET_LIST_JOB_PUBLISH", response.data)
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    STATISTIC_JOB ({ state, commit, rootState }, data) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/jobs/${rootState.userInfo.id}/statistic`
            Vue.http.get(link, data).then(function(response)
            {
                commit("SET_DATA_STATISTIC_JOB", response.data)
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    }

}