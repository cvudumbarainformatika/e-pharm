import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useSettingUserStore = defineStore('setting_user', {
  state: () => ({
    loading: false,
    users: [],
    roles: [
      { nama: 'Owner', value: 'owner' },
      { nama: 'Admin', value: 'admin' },
      { nama: 'Gudang', value: 'gudang' },
      { nama: 'Kasir', value: 'kasir' }
    ],
    role: '',
    form: {},
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    assignForm(val) {
      this.form = val
    },
    setForm(key, val) {
      this.form[key] = val
    },
    resetForm() {
      this.form = {}
    },
    getAllUser() {
      this.loading = true
      const param = {
        params: this.params
      }
      return new Promise((resolve, reject) => {
        api.get('v1/user/all', param)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              console.log('user', resp.data)
              this.users = resp.data.data
            }
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    updateUser() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/user/update', this.form)
          .then(resp => {
            this.loading = false
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    registerUser() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/auth/register', this.form)
          .then(resp => {
            this.loading = false
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    deleteUser() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/user/delete', this.form)
          .then(resp => {
            this.loading = false
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
