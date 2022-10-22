import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { waitLoad } from 'src/modules/utils'

export const cobaMorphStore = defineStore('coba_morph', {
  state: () => ({
    loading: false,
    items: [],
    meta: {},
    transactions: [
      { name: 'Pembelian', value: 'PEMBELIAN' },
      { name: 'Penjualan', value: 'PENJUALAN' },
      { name: 'Beban / Biaya', value: 'PENGELUARAN' },
      { name: 'Penerimaan', value: 'PENERIMAAN' },
      { name: 'Retur Pembelian', value: 'RETUR PEMBELIAN' },
      { name: 'Retur Penjualan', value: 'RETUR PENJUALAN' }
    ],
    statuses: [
      { name: 'Selesai', value: 1 },
      { name: 'Draft', value: 0 },
      { name: 'Semua', value: '' }
    ],
    transaction: '',
    status: '',
    search: '',
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    resetInput() {
      this.transaction = ''
      this.status = ''
      this.search = ''
      this.params.nama = ''
      this.params.status = ''
      this.params.q = ''
    },
    getDataNamaStatus() {
      this.params.nama = this.transaction
      this.params.status = this.status
      const endPoint = this.status === '' ? 'nama' : 'nama-status'
      const params = { params: this.params }
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get(`v1/history/${endPoint}`, params)
          .then(resp => {
            if (resp.status === 200) {
              const data = resp.data.data
              this.items = data
              this.meta = resp.data.meta
              this.resetInput()
              console.log('history transaksi', resp)
              resolve(data)
            }
            waitLoad('done')
          })
          .catch(err => {
            reject(err)
            waitLoad('done')
          })
      })
    },
    getDataSearch() {
      this.params.q = this.search

      const params = { params: this.params }
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get('v1/history/cari', params)
          .then(resp => {
            if (resp.status === 200) {
              const data = resp.data.data
              this.items = data
              this.meta = resp.data.meta
              this.resetInput()
              console.log('history transaksi', resp)
              resolve(data)
            }
            waitLoad('done')
          })
          .catch(err => {
            reject(err)
            waitLoad('done')
          })
      })
    }
  }
})
