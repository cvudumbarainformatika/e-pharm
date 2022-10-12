import { defineStore } from 'pinia'
import { notifErrCenterVue } from 'src/modules/utils'
import { useLaporanStokTable } from '../laporan/stok/table'
import { usePembelianTable } from '../transaksi/pembelian/table'
import { usePenjualanTable } from '../transaksi/penjualan/table'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    dark: false,
    info: {
      nama: 'apotek sehat selalu',
      alamat: 'alamat belum di isi',
      tlp: 'nomor telepon belum ada'
    },
    menu: 'user',
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
      console.log(val)
    }

  }
})
