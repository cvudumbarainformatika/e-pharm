import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'

export const useBebanTransaksiHutang = defineStore('beban_hutang', {
  state: () => ({
    loading: false,
    form: {},
    items: []
  }),
  actions: {
    // local related function
    setForm(key, val) {
      this.form[key] = val
    },
    setNotaBaru() {
      this.form.reff = 'BBN-' + uniqueId()
    },
    // api related function
    // ambil data hutang
    getHutang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/hutang/hutang')
          .then((resp) => {
            console.log('hutnag', resp)
            this.loading = false
            if (resp.status === 200) {
              this.items = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
