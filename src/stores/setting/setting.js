import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrCenterVue } from 'src/modules/utils'
import { useDashboardStore } from '../dashboard'
import { useLaporanStokTable } from '../laporan/stok/table'
import { usePembelianTable } from '../transaksi/pembelian/table'
import { usePenjualanTable } from '../transaksi/penjualan/table'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    dark: false,
    loading: false,
    transaksiLoading: false,
    info: {
      nama: 'apotek sehat selalu',
      alamat: 'alamat belum di isi',
      tlp: 'nomor telepon belum ada'
    },
    menus: [],
    levels: [],
    themes: [
      { name: 'primary', value: '#30268f' },
      { name: 'secondary', value: '#06b8b8' },
      { name: 'accent', value: '#9C27B0' },
      // { name: 'primary-light', value: '#cac5f0' },
      { name: 'dark', value: '#0d101a' },
      // { name: 'dark-page', value: '#0d101a' },
      // { name: 'dark-light', value: '#262e47' },
      { name: 'positive', value: '#198754' },
      { name: 'negative', value: '#dc3545' },
      { name: 'info', value: '#0d6efd' },
      { name: 'warning', value: '#d6a100' }
      // { name: 'danger', value: '#990000' }
      // { name: 'white', value: '#ffffff' }
    ],
    infos: [],
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
    pembelian: usePembelianTable(),
    dashboar: useDashboardStore()
  }),
  actions: {
    getInitialData() {
      this.getDataSetting()
      this.stok.getDataRak()
      this.penjualan.ambilDataDistributor()
      this.penjualan.ambilDataDokter()
      this.penjualan.ambilDataProduk().then((resp) => {
        this.dashboar.produks = resp.product
        this.dashboar.getDataRank()
      })
      this.pembelian.ambilDataProduk()
      this.dashboar.getDataHutang()
      this.dashboar.getDataTagihan()
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
      // console.log('menu', this.menu)
      // console.log(val)
    },
    setTheme(key, val) {
      this.themes[key].value = val
      this.saveSetting()
    },
    // api related function

    getDataSetting() {
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/info')
          .then((resp) => {
            // console.log('setting', resp.data[0])
            this.menus = resp.data[0].menus
            // this.levels = resp.data[0].levels
            this.themes = resp.data[0].themes
            this.infos = resp.data[0].infos
            this.info = this.infos
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    saveSetting() {
      this.form.menus = this.menus
      this.form.infos = this.infos
      // this.form.levels = this.levels
      this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/setting/store-info', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('simpan', resp)
            this.getDataSetting()
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
