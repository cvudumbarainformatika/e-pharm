import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrCenterVue } from 'src/modules/utils'
import { useLaporanStokTable } from '../laporan/stok/table'
import { usePembelianTable } from '../transaksi/pembelian/table'
import { usePenjualanTable } from '../transaksi/penjualan/table'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    dark: false,
    transaksiLoading: false,
    info: {
      nama: 'apotek sehat selalu',
      alamat: 'alamat belum di isi',
      tlp: 'nomor telepon belum ada'
    },
    menus: [],
    levels: [],
    themes: [],
    menu: 'user',
    form: {
      nama: 'eAchy'
    },
    penyesuaianProduk: {
      rak: true,
      stok_awal: true,
      harga_beli: false,
      harga_jual_umum: false,
      harga_jual_resep: false,
      harga_jual_cust: false
    },
    stok: useLaporanStokTable(),
    penjualan: usePenjualanTable(),
    pembelian: usePembelianTable()
  }),
  actions: {
    getInitialData() {
      this.getDataSetting()
      this.stok.getDataRak()
      this.penjualan.ambilDataDistributor()
      this.penjualan.ambilDataDokter()
      this.penjualan.ambilDataProduk()
      this.pembelian.ambilDataProduk()
    },
    increment() {
      this.counter++
    },
    setInfo(key, val) {
      this.info[key] = val
    },
    setPenyesuaianProoduk(key, val) {
      if (typeof val === 'boolean') {
        this.penyesuaianProduk[key] = val
      } else {
        notifErrCenterVue('nilai yang masuk harus boolean (true / false)')
      }
    },
    pilihItem(val) {
      this.menu = val.value
      console.log('menu', this.menu)
      console.log(val)
    },
    // api related function

    getDataSetting() {
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/info')
          .then((resp) => {
            console.log('setting', resp.data[0])
            this.menus = resp.data[0].menus
            this.levels = resp.data[0].levels
            this.themes = resp.data[0].themes
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    saveSetting() {
      this.form.menus = this.menus
      // this.form.levels = this.levels
      // this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/setting/store-info', this.form)
          .then((resp) => {
            this.loading = false
            console.log('simpan', resp)
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
