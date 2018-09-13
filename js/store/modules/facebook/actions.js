export default {

    GET_FACEBOOK_CONNECT({ state, commit, rootState }) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/get-connect-facebook`;
            Vue.http.get(link).then(function(response)
            {
                commit('SET_FACEBOOK_CONNECT', response.data.login_url)
                resolve()
            },
            function(error){
                reject()
            });
        })
    },

    GET_FACEBOOK_PROFILE({ state, commit, rootState }) {
        return new Promise((resolve, reject) => {
            var linkProfile = `${rootState.apiDomain}/facebook/profile/${rootState.userInfo.id}`
            Vue.http.get(linkProfile).then(function(response)
            {
                commit('SET_FACEBOOK_PROFILE', response.data.data)
                resolve()
            },
            function(error){
                reject()
            });
        })
    },

    GET_LIST_GROUP({ state, commit, rootState }, query) {
        return new Promise((resolve, reject) => {
            var linkGroup = `${rootState.apiDomain}/facebook/groups/1`
            Vue.http.get(linkGroup, query).then(function(response)
            {
                commit("SET_LIST_GROUP", response.data)
                if (response.data.meta.pagination.current_page == 1) {
                    commit("SET_FIRST_LIST_GROUP", response.data)
                }
                resolve()
            },
            function(error){
                reject()
            }); 
        })
    },

    ACTIVE_CRAWL({ state, commit, rootState }, dataGroup) {
        return new Promise((resolve, reject) => {
            // Load data from server
            // Note: you cannot commit here, the data is not available yet
            var link = `${rootState.apiDomain}/facebook/groups/crawl-status/${dataGroup.id}`
            Vue.http.post(link, {crawl_status: dataGroup.crawl_status}).then(function(response)
            {
                // The data is available now. Finally we can commit something
                commit("SET_ACTIVE_CRAWL", response.data)
                // Now resolve the promise
                resolve()

            },
            function(error){
                reject()
            });  

        })
    },

    CREATE_GROUP({ getters, commit, rootState }, formData) {
        return new Promise((resolve, reject) => {
            var link = `${rootState.apiDomain}/facebook/groups/store`
            Vue.http.post(link, formData).then(function(response)
            {
                
                // Nếu tồn tại fist list thì ... còn lại thì ....

                /*var dataListGroup     = getters.getListGroup.data
                var dataListGroupMeta = getters.getListGroup.meta

                var dataFirstListGroup     = getters.getFirstListGroup.data
                var dataFirstListGroupMeta = getters.getFirstListGroup.meta
                
                if (dataListGroupMeta.pagination.current_page === 1)
                {
                    dataListGroup.unshift(response.data.data)
                }

                if (dataListGroup.length > dataListGroupMeta.pagination.per_page)
                {
                    dataListGroup.pop()
                }
                dataListGroupMeta.pagination.total += 1

                // The data is available now. Finally we can commit something
                if (dataListGroupMeta.pagination.current_page === 1) {
                    commit("SET_FIRST_LIST_GROUP", {data: dataFirstListGroup, meta: dataFirstListGroupMeta})
                }*/
                // Now resolve the promise
                resolve()

            }, function(error){
                reject()
            })
        })
    },

    CRAWL_DATA_FACEBOOK_GROUP({ getters, commit, rootState }, dataFbGr) {
        return new Promise((resolve, reject) => {
            // Load data from server
            // Note: you cannot commit here, the data is not available yet
            var link = `${rootState.apiDomain}/facebook/groups/crawl/${dataFbGr.group_id}`
            Vue.http.get(link).then(function(response)
            {
                // The data is available now. Finally we can commit something
                commit("SET_DATA_CRAWL_FB", response.data)
                // Now resolve the promise
                resolve()

            },
            function(error){
                reject()
            });  

        })
    }
};