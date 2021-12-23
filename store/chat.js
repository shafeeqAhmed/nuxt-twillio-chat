
export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    // eslint-disable-next-line no-unused-vars
   

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
 


    
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(state))
    }
}
