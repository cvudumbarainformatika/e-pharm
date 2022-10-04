import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLaporanKeuanganStore = defineStore('store_laporan_keuangan', {
  state: () => ({
    penjualan: 0,
    returPenjualan: 0,
    penjualanBersih: 0,
    HPP: 0,
    pembelian: 0,
    returPembelian: 0,
    pembelianBersih: 0,
    bebans: [],
    beban: 0,
    penerimaans: [],
    penerimaan: 0,
    labaRugi: 0
  }),
  actions: {
    getBebans() {
      return new Promise(resolve => {
        api.get('v1/beban/beban')
          .then(resp => {
            console.log('beben keuangan', resp.data)
            if (resp.status === 200) {
              this.bebans = resp.data.data
              resolve(resp.data.data)
            }
          })
      })
    },
    getPenerimaan() {
      return new Promise(resolve => {
        api.get('v1/penerimaan/penerimaan')
          .then(resp => {
            console.log('penerimaan keuangan', resp.data)
            if (resp.status === 200) {
              this.penerimaans = resp.data.data
              resolve(resp.data.data)
            }
          })
      })
    }
  }
})
