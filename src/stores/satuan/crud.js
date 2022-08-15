import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { waitLoad } from 'src/modules/utils'

export const useSatuanStore = defineStore('satuan', {

  actions: {
    // ambil
    getSatuan(payload) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get('v1/satuan/index')
          .then(resp => {
            console.log(resp)
            waitLoad('done')
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    },
    // tambah
    addSatuan(payload) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('v1/satuan/store')
          .then(resp => {
            console.log(resp)
            waitLoad('done')
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    },
    // Update
    updateSatuan(payload) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('v1/satuan/update')
          .then(resp => {
            console.log(resp)
            waitLoad('done')
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    },
    // delete
    deleteSatuan(payload) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.post('v1/satuan/destroy')
          .then(resp => {
            console.log(resp)
            waitLoad('done')
            resolve(resp)
          })
          .catch(err => {
            console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    }
  }
})
