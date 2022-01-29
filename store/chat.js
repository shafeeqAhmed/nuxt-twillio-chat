export const state = () =>({
  type: null,
  data: {
    activity:{},
    location:{},
    age:{},
    joinDate:{},
  },
  counts: {}
});


export const mutations = {
  filterType(state, type) {
    state.type = type;
  },

  filterData(state, data) {
    state.data[data.key] = data.val;
  },
  memberCount(state, counts) {
    state.counts = counts;
  },

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

}
export const getters={
  getCount: (state)=>(type)=>{
    if(state.counts) {
      return state.counts[type]
    }
   return 0;
  }
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(state))
    }
}
