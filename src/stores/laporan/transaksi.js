import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useLaporanTable } from './table'

export const useLaporanTransaksiStore = defineStore('laporan_transaksi_store', {
  state: () => ({
    table: useLaporanTable(),

    pembelians: [
      { nama: 'all', label: 'Semua' },
      { nama: 'supplier', label: 'Pilih Supplier' }
    ],
    pembelian: 'all',
    pembelianL: 'Senua',
    hutangs: [
      { nama: 'all', label: 'Semua' },
      { nama: 'supplier', label: 'Pilih Supplier' }
    ],
    hutang: 'all',
    hutangL: 'Semua',
    penjualans: [
      { nama: 'all', label: 'Semua' },
      { nama: 'dokter', label: 'Berdasarkan Dokter' },
      { nama: 'customer', label: 'Berdasarkan Distributor' },
      { nama: 'umum', label: 'Penjualan Umum' }
    ],
    penjualan: 'all',
    penjualanL: 'semua',
    piutangs: [
      { nama: 'all', label: 'Semua' },
      { nama: 'customer', label: 'Berdasarkan Distributor' }
    ],
    piutang: 'all',
    piutangL: 'Semua',
    suppliers: [],
    distributors: [],
    dokters: [],
    kasirs: [],
    admins: [],
    form: {},
    params: {
      q: '',
      per_page: 10
    },
    loading: false
  }),
  actions: {
    resetForm() {
      this.form = {}
    },

    // api related function

    getDataTransactions() {
      // this.rows = []
      this.selected = true
      this.loading = true
      const params = { params: this.table.form }
      // this.setColumns();
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/get-by-date', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.transactions = resp.data
              // this.setRows()
              console.log(resp)
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
