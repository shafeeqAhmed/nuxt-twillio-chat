export const state = () =>({
  type: null,
  data: {
    activity:{},
    location:{},
    age:{},
    joinDate:{},
  },
  filterSelectedMemberCount: 0,
  counts: {}
});


export const mutations = {
  filterType(state, type) {
    state.type = type;
  },

  filterData(state, data) {
    state.data[data.key] = data.val;
    // state.data[data.key] = {};
  },
  resetFilterData(state) {
    state.data.activity = {}
    state.data.location = {}
    state.data.age = {}
    state.data.joinDate = {}
  },
  memberCount(state, counts) {
    state.counts = counts;
  },
  removeFilter(state,payload) {
    state.data[payload.type][payload.value] = ""
    if (payload.type == 'age') {
      state.data['age']['customEndAge'] = ""
      state.data['age']['customFilterType'] = ""
      state.data['age']['customStartAge'] = ""
    }
    if (payload.type == 'joinDate') {
      state.data['joinDate']['customStartDate'] = ""
      state.data['joinDate']['customEndAge'] = ""
      state.data['joinDate']['search_type'] = ""
    }
    if (payload.type == 'location' && payload.value == 'address') {
      state.data['location'] = {}
    }
  }

};

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars

  saveFilterType({ commit }, { type }) {
    commit("filterType", type);
  },

  saveFilterData({ commit }, { data }) {
    commit("filterData", data);
  },

  saveMessage({ commit },payload) {
    return new Promise((resolve, reject) => {

      this.$axios
        .post(`sms_service`, payload)
        .then(response => {

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },



  sendMessageToContents({ commit },payload) {

    return new Promise((resolve, reject) => {
      this.$axios
        .post(`send_message_to_contacts`, payload)
        .then(response => {

          resolve(response)
        })
        .catch(error => reject(error))
    })
  },


  removeSearchFilter({ commit },payload) {
    commit('removeFilter',payload)
  },

}
export const getters={
  getCount: (state)=>(type)=>{
    if(state.counts) {
      return state.counts[type]
    }
    return 0;
  },
  getSelectedFilterValue: (state)=>(key,value)=>{
    if(Object.keys(state.data[key]).includes(value) && state.data[key][value] !== '') {
      return true
    }else {
      return false
    }
  },

}

// ===
// Private helpers
// ===

function saveState(key, state) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(state))
    }
}
