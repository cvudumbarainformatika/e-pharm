import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getLocalToken } from 'src/modules/storage'
import { notifErr } from 'src/modules/utils'
import { setCssVar } from 'quasar'

// const base = 'http://192.168.1.11:3502'
// const base = 'https://servpharm.xenter.my.id'
// const base = 'http://api.eparm.apotik'
// const base = 'http://192.168.0.101/api.eparm/public' // server setiawan 1
// const base = 'http://192.168.1.100/api.eparm/public' // new server setiawan 1
// const base = 'http://api.epharm.test'
const base = 'http://localhost/api.e-pharm/public'
// const base = 'http://localhost/api.epharm/public' // local wawan
// const base = 'http://192.168.0.104/api.epharm/public' // test local wawan
// const base = 'http://api.eparm.test:8080'
// const base = 'https://api.udumbarainformatika.my.id'
// const base = 'http://192.168.137.20/api.eparm/public'
// const base = 'http://192.168.1.13/api.eparm/public' // server setiawan 2

const SERVER = base + '/api'
const imageSever = base + '/storage/'
const web = base

const api = axios.create({ baseURL: SERVER })
api.defaults.headers.get.Accepts = 'application/json'

api.defaults.headers.common.Authorization = `Bearer ${getLocalToken()}`

/* Response Interceptors */
const interceptResErrors = (err) => {
  try {
    // check for response code 123 and redirect to login
    // err = Object.assign(new Error(), { message: err.response.data })
    // console.log('1. interceptResErrors', err.response)
    notifErr(err.response)
  } catch (e) {
    // check for response code 123 and redirect to login
    // Will return err if something goes wrong
    console.log('1. catch', e)
  }
  return Promise.reject(err)
}
const interceptResponse = (res) => {
  try {
    // check for response code 123 and redirect to login
    // console.log('2. interceptResponse', res)
    return Promise.resolve(res)
  } catch (e) {
    // check for response code 123 and redirect to login
    console.log('2. catch interceptResponse', res)
    return Promise.resolve(res)
  }
}
api.interceptors.response.use(interceptResponse, interceptResErrors)

/* Request Interceptors */
const interceptReqErrors = err => Promise.reject(err)
const interceptRequest = (config) => {
  return config
}
api.interceptors.request.use(interceptRequest, interceptReqErrors)

const getDataSetting = () => {
  return new Promise(resolve => {
    api
      .get('v1/public/info')
      .then((resp) => {
        // console.log('setting axios', resp.data.themes)
        const themes = resp.data.themes
        for (let i = 0; i < themes.length; i++) {
          setCssVar(themes[i].name, themes[i].value)
        }
        resolve(resp)
      })
  })
}

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  getDataSetting()
})

// eslint-disable-next-line no-return-assign
const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}
const deleteToken = () => delete api.defaults.headers.common.Authorization

export { axios, api, web, setToken, deleteToken, imageSever }
