import {ageGroupBand, genderGroupBand, topCity, topCountry,monthlyRegistration} from "../pages/admin/stats/data";
import { startDate,endDate,currentDate,lastWeekDate,lastMonthDate,lastYearDate } from '../helpers/general'

export const state = () =>({
  ageGroupBand,
  genderGroupBand,
  topCity,
  topCountry,
  monthlyRegistration,
  startDate: startDate,
  endDate:endDate
});


export const mutations = {
  SET_AGE_GROUP_BAND(state,payload) {
    state.ageGroupBand.series = payload.series
    state.ageGroupBand.chartOptions.labels =payload.labels
  },
  SET_GENDER_GROUP_BAND(state,payload) {
    state.genderGroupBand.series = payload.series
    state.genderGroupBand.chartOptions.labels =payload.labels
  },
  SET_TOP_CITY(state,payload) {
      state.topCity.chartOptions.xaxis.categories = payload.labels
      state.topCity.series[0].data =payload.series
  },
  SET_TOP_COUNTRY(state,payload) {
      state.topCountry.chartOptions.xaxis.categories = payload.labels
      state.topCountry.series[0].data =payload.series
  },
  SET_MONTHLY_REGISTRATION(state,payload) {
      state.monthlyRegistration.chartOptions.xaxis.categories = payload.labels
      state.monthlyRegistration.series[0].data =payload.series
  }
};

export const actions = {
  getAgeGroupBand({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('age-group-stats')
        .then(response => {

          let { data: { data:{ageGroup} } } = response
          let payload = {}
          payload.series = Object.values(ageGroup)
          payload.labels = Object.keys(ageGroup)
          commit('SET_AGE_GROUP_BAND',payload)
        })
        .catch(error => reject(error))
    })
  },
  getGenderGroupBand({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('gender-group-stats')
        .then(response => {

          let { data: { data:{genderGroup} } } = response
          let payload = {}
          payload.series = Object.values(genderGroup)
          payload.labels = Object.keys(genderGroup)

          commit('SET_GENDER_GROUP_BAND',payload)
        })
        .catch(error => reject(error))
    })
  },
  getTopCity({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('city-group-stats')
        .then(response => {
          let { data: { data:{cities, series} } } = response
          let payload = {}
          payload.series = series
          payload.labels = cities

          commit('SET_TOP_CITY',payload)
        })
        .catch(error => reject(error))
    })
  },
  getTopCountry({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('country-group-stats')
        .then(response => {
          let { data: { data:{countries, series} } } = response
          let payload = {}
          payload.series = series
          payload.labels = countries

          commit('SET_TOP_COUNTRY',payload)
        })
        .catch(error => reject(error))
    })
  },
  getMonthlyRegistration({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('monthly-registration-group-stats')
        .then(response => {
          let { data: { data:{dates, series} } } = response
          let payload = {}
          payload.series = series
          payload.labels = dates
          // console.log(payload)

          commit('SET_MONTHLY_REGISTRATION',payload)
        })
        .catch(error => reject(error))
    })
  },
  getDateRange({}, type) {
        let start = ''
        let end = currentDate
    if (type == 'week') {
      start = lastWeekDate
    }
    if (type == 'month') {
          start = lastMonthDate
    }
    if (type == 'year') {
          start = lastYearDate
    }
    if (type == 'all') {
      start = ''
      end = ''
    }
    return {start,end}
  },

}
export const getters={

  getAgeGroupBand(state) {
    return state.ageGroupBand
  },
  getGenderGroupBand(state) {
    return state.genderGroupBand
  },
  getTopCity(state) {
    return state.topCity
  },
  getTopCountry(state) {
    return state.topCountry
  },
  getMonthlyRegistration(state) {
    return state.monthlyRegistration
  },


  // genderGroupBand(state) {
  //   return state.gender
  // },
  // topCity(state) {
  //   return state.city
  // },
  // topCountry(state) {
  //   return state.country
  // }

}

// ===
// Private helpers
// ===

function saveState(key, state) {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(state))
    }
}
