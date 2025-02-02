import { defineStore } from 'pinia'
import { date, Dialog } from 'quasar'
import { api } from 'src/boot/axios'
// eslint-disable-next-line no-unused-vars
import { notifSuccess } from 'src/modules/utils'

export const useStokOpnameStore = defineStore('stok_opname', {
  state: () => ({
    loadingSimpan: false,
    loading: false,
    items: [],
    params: {
      q: '',
      page: 1,
      per_page: 10
    },
    meta: {},
    columns: [
      'nama',
      'tanggal',
      'jumlah'
    ]
  }),
  actions: {
    setParams(key, val) {
      this.params[key] = val
    },
    setSearch(val) {
      this.setParams('q', val)
      this.setParams('page', 1)
      this.getListOpname()
    },
    setPage(val) {
      this.setParams('page', val)
      this.getListOpname()
    },
    setPerPage(val) {
      this.setParams('per_page', val)
      this.setParams('page', 1)
      this.getListOpname()
    },
    refreshTable() {
      // this.setParams('page', 1)
      this.getListOpname()
    },
    seblumSimpan() {
      const date1 = new Date(date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
      const date2 = new Date(date.formatDate(Date.now(), 'YYYY-MM-DD 21:00:00'))

      const difference = date.getDateDiff(date1, date2, 'hours')
      console.log('diff', difference)
      if (difference < 0) {
        Dialog.create({
          title: 'Peringatan',
          message: 'Stok Opname di jalankan di atas jam 21.00 sebagai asumsi bahwa toko sudah tutup, karena data penjualan hari ini tidak akan di hitung sebagai data keluar di stok produk',
          ok: true
        })
      } else {
        this.simpan()
      }
    },
    async simpan() {
      this.loadingSimpan = true
      await api.post('v1/opname/store')
        .then(resp => {
          this.loadingSimpan = false
          notifSuccess(resp)
          this.setPage(1)
        })
        .catch(() => {
          this.loadingSimpan = false
        })
    },
    async getListOpname() {
      this.loading = true
      const param = { params: this.params }
      await api.get('v1/opname/list', param)
        .then(resp => {
          this.loading = false
          this.items = resp?.data?.data ?? resp?.data
          this.meta = resp?.data?.meta ?? resp?.data
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
