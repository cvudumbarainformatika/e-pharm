import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useSettingStore } from 'src/stores/setting/setting'

export const useKasirStore = defineStore('kasir_store', {
  state: () => ({
    loading: false,
    items: [],
    setting: useSettingStore(),
    hariIni: {},
    sisaHariIni: 0
  }),
  actions: {
    getInitialData() {
      this.getTransaksiHariIni()
    },
    metaniData(val) {
      this.items = []
      if (val?.newpenjualan?.length) {
        val?.newpenjualan.forEach(a => { this.items.push(a?.transaction?.kasir) })
      }
      if (this.items?.length) {
        this.items.forEach(kasir => {
          kasir.penjualan = val?.newpenjualan.filter(penj => penj.kasir_id === kasir.id)?.reduce((a, b) => a + (isNaN(b.uang) ? 0 : b.uang), 0)
          kasir.retur = val?.newretur_penjualan.filter(penj => penj.kasir_id === kasir.id).reduce((a, b) => a + (isNaN(b.uang) ? 0 : b.uang), 0)
          kasir.sisaHariIni = kasir.penjualan - kasir.retur
        })
      }
      console.log('kasirs', this.items)
    },
    // api related function
    getTransaksiHariIni() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/kasir/index')
          .then(resp => {
            this.loading = false
            this.setting.transaksiLoading = false
            // this.items = resp?.data
            this.metaniData(resp?.data)
            console.log('kasir', resp.data, this.items)
            const data = resp.data
            const jual = data.penjualan[0].uang ? data.penjualan[0].uang : 0
            // const jualNon = data.penjualanNon[0].uang ? data.penjualanNon[0].uang : 0
            const retur = data.retur_penjualan[0].uang ? data.retur_penjualan[0].uang : 0
            // const returNon = data.retur_penjualanNon[0].uang ? data.retur_penjualanNon[0].uang : 0
            // const beban = data.pengeluaran[0].beban ? data.pengeluaran[0].beban : 0
            this.hariIni = {
              penjualan: jual, retur_penjualan: retur
            }
            this.sisaHariIni = jual - retur
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
