import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useSettingStore } from 'src/stores/setting/setting'

export const useKasirStore = defineStore('kasir_store', {
  state: () => ({
    loading: false,
    setting: useSettingStore(),
    hariIni: {},
    sisaHariIni: 0
  }),
  actions: {
    getInitialData() {
      this.getTransaksiHariIni()
    },
    // api related function
    getTransaksiHariIni() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/kasir/index')
          .then(resp => {
            this.loading = false
            this.setting.transaksiLoading = false
            console.log('kasir', resp.data)
            const data = resp.data
            const jual = data.penjualan[0].uang ? data.penjualan[0].uang : 0
            const jualNon = data.penjualanNon[0].uang ? data.penjualanNon[0].uang : 0
            const retur = data.retur_penjualan[0].uang ? data.retur_penjualan[0].uang : 0
            const returNon = data.retur_penjualanNon[0].uang ? data.retur_penjualanNon[0].uang : 0
            const beban = data.pengeluaran[0].beban ? data.pengeluaran[0].beban : 0
            this.hariIni = {
              penjualan: jual, retur_penjualan: retur, keluar: beban, penjualanNon: jualNon, retur_penjualanNon: returNon
            }
            this.sisaHariIni = jual - retur - beban
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
            this.setting.transaksiLoading = false
          })
      })
    }
  }
})
