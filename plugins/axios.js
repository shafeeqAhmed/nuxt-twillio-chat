import Vue from 'vue'

export default function ({ $axios, redirect }) {

  $axios.onRequest((config) => {

    if (localStorage.getItem('auth.accessToken')) {
      config.withCredentials = true
      config.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth.accessToken')}`
    }
  })

  }
