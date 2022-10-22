import { defineStore } from 'pinia'

export const useLaporanMorphStore = defineStore('laporan_morph_button', {
  state: () => ({
    isOpen: false,
    loading: false,
    transactions: [
      { name: 'Pembelian', value: 'PEMBELIAN' },
      { name: 'Penjualan', value: 'PENJUALAN' },
      { name: 'Pengeluaran', value: 'PENGELUARAN' },
      { name: 'Pendapatan', value: 'PENDAPATAN' },
      { name: 'Retur Pembelian', value: 'RETUR PEMBELIAN' },
      { name: 'Retur Penjualan', value: 'RETUR PENJUALAN' }
    ],
    dates: [
      {
        nama: 'Hari Ini',
        value: 'today',
        next: 'btn',
        date: 'hari',
        param: null
      },
      {
        nama: 'Bulan Ini',
        value: 'month',
        next: 'btn',
        date: 'bulan',
        param: null
      },
      {
        nama: 'Harian',
        value: 'harian',
        next: 'card3',
        date: 'hari',
        param: null
      },
      {
        nama: 'Bulanan',
        value: 'bulanan',
        next: 'card3',
        date: 'bulan',
        param: null
      },

      {
        nama: 'Pilih Range Tanggal',
        value: 'range',
        next: 'card3',
        date: 'range',
        param: null
      },
      {
        nama: 'Pilih Tanggal',
        value: 'spesifik',
        next: 'card3',
        date: 'spesifik',
        param: null
      }
    ],
    date: 'month',
    days: [],
    months: []
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setDays() {
      for (let i = 0; i < 31; i++) {
        this.days[i] = { nama: i + 1, value: i < 10 ? '0' + i + 1 : i + 1 }
      }
    },
    setMonths() {
      this.months = [
        { nama: 'Januari', value: '01' },
        { nama: 'Februari', value: '02' },
        { nama: 'Maret', value: '03' },
        { nama: 'April', value: '04' },
        { nama: 'Mei', value: '05' },
        { nama: 'Juni', value: '06' },
        { nama: 'Juli', value: '07' },
        { nama: 'Agustus', value: '08' },
        { nama: 'September', value: '09' },
        { nama: 'Oktober', value: '10' },
        { nama: 'November', value: '11' },
        { nama: 'Desember', value: '12' }
      ]
    }
  }
})
