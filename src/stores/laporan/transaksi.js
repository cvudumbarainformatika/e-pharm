import { defineStore } from 'pinia'
import { useLaporanTable } from './table'

export const useLaporanTransaksiStore = defineStore('laporan_transaksi_store', {
  state: () => ({
    table: useLaporanTable(),

    pembelians: [
      { nama: 'all', label: 'Semua' },
      { nama: 'supplier', label: 'Pilih Supplier' }
    ],
    pembelian: 'all',
    penjualans: [
      { nama: 'all', label: 'Semua' },
      { nama: 'dokter', label: 'Berdasarkan Dokter' },
      { nama: 'customer', label: 'Berdasarkan Distributor' }
    ],
    penjualan: 'all',
    suppliers: [],
    distributors: [],
    dokters: [],
    kasirs: [],
    admins: [],
    form: {},
    params: {
      q: '',
      per_page: 10
    }
  }),
  actions: {
    resetForm() {
      this.form = {}
    }
  }
})
