import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useListDistribusiStore = defineStore('list_distribusi', {
  state: () => ({
    loading: false,
    meta: {},
    items: [],
    params: {
      q: '',
      per_page: 10,
      page: 1
    },
    columns: [
      'nomor',
      'tanggal',
      'asal',
      'menuju',
      'pic'
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
      await api.get('v1/distribusi/list')
        .then(resp => {
          this.loading = false
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
          console.log('resp', resp?.data)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
