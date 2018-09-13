export default {
    GET_DATA_ATTRIBUTE_JOB({ state, commit, rootState }) {

        var data = state.dataJobs
        var dataAttrJob = {
            category: [],
            company_size: [],
            education: [],
            experience: [],
            language: [],
            location: [],
            model: [],
            rank: [],
            salary: [],
            sex: [],
            tag_type: [],
            times: [],
        }
        for (var keyNode in data) {
            if (data.hasOwnProperty(keyNode)) {
                var dataNode = data[keyNode]
                
                for (var key in dataNode) {
                    if (dataNode.hasOwnProperty(key)) {
                        dataAttrJob[keyNode].push({value: key, label: dataNode[key]})
                    }
                }
            }
        }
        commit("SET_DATA_ATTRIBUTE_JOB", dataAttrJob)

    }
};