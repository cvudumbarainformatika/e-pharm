import { defineStore } from 'pinia'

export const useLaporanMorphStore = defineStore('laporan_morph_button', {
  state: () => ({
    loading: false,
    transactions: [
      { name: 'Pembelian', value: 'PEMBELIAN' },
      { name: 'Penjualan', value: 'PENJUALAN' },
      { name: 'Beban / Biaya', value: 'BEBAN' },
      { name: 'Penerimaan', value: 'PENERIMAAN' },
      { name: 'Retur Pembelian', value: 'RETUR PEMBELIAN' },
      { name: 'Retur Penjualan', value: 'RETUR PENJUALAN' }
    ],
    dates: [
      {
        nama: 'Hari Ini',
        value: 'hari ini',
        next: 'btn',
        date: 'hari',
        param: null
      },
      {
        nama: 'Bulan Ini',
        value: 'bulan ini',
        next: 'btn',
        date: 'bulan',
        param: null
      },
      {
        nama: 'Tahun Ini',
        value: 'tahun ini',
        next: 'btn',
        date: 'tahun',
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
        nama: 'Tahunan',
        value: 'tahunan',
        next: 'card3',
        date: 'tahun',
        param: null
      },
      {
        nama: 'Pilih Range Tanggai',
        value: 'range',
        next: 'card3',
        date: 'range',
        param: null
      }
    ],
    date: '',
    days: [],
    months: []
  }),
  actions: {
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
