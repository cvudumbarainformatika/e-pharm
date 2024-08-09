import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useSettingStore } from 'src/stores/setting/setting'

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
      'pic',
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
    async getDataTable(val) {
      this.loading = !val
      const param = {
        params: this.params
      }
      await api.get('v1/distribusi/list', param)
        .then(resp => {
          this.loading = false
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
          if (this.items.length) {
            const setting = useSettingStore()
            this.items.forEach(it => {
              if (it?.status === 2) {
                it?.details?.forEach(det => {
                  if (det.qty === 0 && it?.dari === setting?.kodecabang) det.qty = det.jumlah
                })
              }
            })
          }
          console.log('resp', resp?.data)
        })
        .catch(() => {
          this.loading = false
        })
    },
    distribusikan(val) {
      return new Promise(resolve => {
        val.loading = true
        api.post('v1/distribusi/distribusi', val)
          .then(resp => {
            val.loading = false
            this.getDataTable()
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => { val.loading = false })
      })
    }
  }
})
