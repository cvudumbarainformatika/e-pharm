import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useListPemesananStore = defineStore('list_pemesanan', {
  state: () => ({
    loadingKunci: false,
    loading: false,
    // print
    printOpen: false,
    toPrint: null,
    // print end
    items: [],
    meta: {},
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    columns: [
      'nomor',
      'tanggal',
      'distributor',
      'Aksi'
    ],
    columnHide: []
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },

    setSearch (payload) {
      this.setParams('q', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    setPage (payload) {
      this.setParams('page', payload)
      this.getDataTable()
    },
    setPerPage (payload) {
      this.setParams('per_page', payload)
      this.setParams('page', 1)
      this.getDataTable()
    },
    refreshTable () {
      this.setParams('page', 1)
      this.getDataTable()
    },
    async getDataTable() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/pemesanan/get-list', param)
        .then(resp => {
          this.loading = false
          console.log('data pemesanan', resp?.data)
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
        })
        .catch(() => {
          this.loading = false
        })
    },
    async bukaKunci(val) {
      val.loading = true
      this.loadingKunci = true
      const form = { id: val.id }
      await api.post('v1/pemesanan/buka-kunci', form)
        .then(resp => {
          delete val.loading
          this.loadingKunci = false
          const index = this.items.findIndex(f => f.id === val.id)
          if (index >= 0) this.items.splice(index, 1)
          notifSuccess(resp)
        })
        .catch(() => {
          this.loadingKunci = false
          delete val.loading
        })
    }
  }
})
