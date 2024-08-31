import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListPemesananStore = defineStore('list_pemesanan', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    }
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },

    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1', param)
        .then(resp => {
          this.loading = false
          console.log('data pemesanan', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
        })
    }
  }
})
