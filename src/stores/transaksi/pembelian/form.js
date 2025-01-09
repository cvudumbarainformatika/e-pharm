import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { hurufBesar, olahUang } from 'src/modules/formatter'
import { notifSuccess, uniqueId } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
// import { useAuthStore } from 'src/stores/auth'
import { usePrintStore } from 'src/stores/print'
import { usePenjualanTable } from '../penjualan/table'
import { usePembelianTable } from './table'

export const usePembelianDialog = defineStore('pembelian_store', {
  state: () => ({
    isOpen: false,
    loadingPerusahaan: false,
    form: {
      faktur: null,
      reff: null,
      tanggal: null,
      tanggal_faktur: null,
      nama: 'PEMBELIAN',
      jenis: 'tunai',
      total: 0,
      ongkir: 0,
      potongan: 0,
      bayar: 0,
      kembali: 0,
      tempo: null,
      kasir_id: null,
      perusahaan_id: null,
      status: 1
    },
    totalSemua: 0,
    jenises: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'HUTANG', value: 'hutang' }
    ],
    kasirs: [],
    suppliers: [],
    perusahaans: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    loading: false,
    printChek: true,
    print: usePrintStore()
  }),
  actions: {
    resetData() {
      this.form = {}
      this.form.nama = 'PEMBELIAN'
      this.form.jenis = 'tunai'
      this.form.total = 0
      this.form.ongkir = 0
      this.form.potongan = 0
      this.form.bayar = 0
      this.form.kembali = 0
      this.form.status = 1
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal = formatDb
    },
    setKasir(val) {
      const temp = this.kasirs.filter(data => { return data.id === val })
      this.print.form.kasir = temp[0].name
    },
    // setSupplier(val) {
    //   const temp = this.suppliers.filter(data => { return data.id === val })
    //   this.print.form.supplier = temp[0].nama
    //   // console.log('supplier', temp)
    //   // console.log('supplier keys', Object.keys(this.print.form.supplier))
    //   // console.log('supplier keys leng', Object.keys(this.print.form.supplier).length)
    // },
    setPerusahaan(val) {
      const temp = this.perusahaans.filter(data => { return data.id === val })
      this.print.form.supplier = temp[0].nama
      // console.log('supplier', temp)
      // console.log('supplier keys', Object.keys(this.print.form.supplier))
      // console.log('supplier keys leng', Object.keys(this.print.form.supplier).length)
    },

    totalSeluruhnya() {
      const total = olahUang(this.form.total)
      // potongan = diskon
      const potongan = this.form.potongan > 0 ? parseFloat(this.form.potongan / 100 * total).toFixed(2) : 0
      const totalDgPotongan = total - parseFloat(potongan)
      // ongkir = ppn
      const ongkir = this.form.ongkir > 0 ? parseFloat(this.form.ongkir / 100 * totalDgPotongan).toFixed(2) : 0

      // console.log('total ', total, ' potongan ', potongan, 'onkir', ongkir)

      this.totalSemua = parseFloat(totalDgPotongan + parseFloat(ongkir)).toFixed(0)
      this.print.totalSemua = this.totalSemua
      this.print.potongan = potongan
      this.print.ongkir = ongkir
      // console.log('ongkir ', ongkir, ' total semua ', this.totalSemua)
    },
    kembalian() {
      this.totalSeluruhnya()
      const bayar = olahUang(this.form.bayar)
      this.form.kembali = parseFloat(parseFloat(bayar) - parseFloat(this.totalSemua)).toFixed(0)
      // console.log('bayar ', bayar, ' total semua ', this.totalSemua)
      // console.log('kembali ', this.form.kembali)
    },
    openDialog() {
      const table = usePembelianTable()

      this.form.faktur = table.form.faktur
      this.form.reff = table.form.reff
      this.form.tanggal_faktur = table.form.tanggal_faktur
      this.form.total = table.form.total
      this.totalSeluruhnya()
      this.print.form = this.form
      this.setOpen()
    },
    setOpen() {
      this.isOpen = !this.isOpen
      this.form.jenis = ''
    },
    // searchSupplier(val) {
    //   this.ambilDataSupplier(val)
    //   // console.log(val)
    // },
    searchPerusahaan(val) {
      this.ambilDataPerusahaan(val)
      // console.log(val)
    },
    jenisSelected(val) {
      // console.log('jenis selected ', val)
      this.ambilDataKasir()
      this.searchPerusahaan()
      this.form.perusahaan_id = null
      this.form.kasir_id = null
    },
    ambilDataKasir() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/user/kasir')
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              this.kasirs = resp.data.data
              // console.log('kasir ', resp.data)
              resolve(resp.data)
            }
          }).catch(err => {
            this.loading = false
            reject(err)
          })
      })
      // console.log('user ', user.user)
      // console.log('user getter', user.user)
    },
    // ambilDataSupplier(val) {
    //   if (val !== '') { this.params.q = val }
    //   this.loading = true
    //   const params = { params: this.params }
    //   return new Promise((resolve, reject) => {
    //     api
    //       .get('v1/supplier/index', params)
    //       .then((resp) => {
    //         this.loading = false
    //         // console.log('suppliers ', resp)
    //         if (resp.status === 200) {
    //           this.suppliers = resp.data.data
    //           resolve(resp.data)
    //         }
    //       })
    //       .catch((err) => {
    //         this.loading = false
    //         reject(err)
    //       })
    //   })
    // },
    ambilDataPerusahaan(val) {
      if (val !== '') { this.params.q = val }
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/perusahaan/index', params)
          .then((resp) => {
            this.loading = false
            // console.log('suppliers ', resp)
            if (resp.status === 200) {
              this.perusahaans = resp.data.data
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    addPerusahaan(val) {
      // const temp = this.perusahaans.filter(data => { return data.id === val })
      // this.print.form.supplier = temp[0].nama
      console.log('perusahaan', val)
      this.loadingPerusahaan = true
      const data = { nama: hurufBesar(val) }

      return new Promise((resolve, reject) => {
        api
          .post('v1/perusahaan/store', data)
          .then((resp) => {
            console.log('save data', resp?.data)
            notifSuccess(resp)
            this.ambilDataPerusahaan().then(() => {
              this.form.perusahaan_id = resp.data.data.id
            })
            this.loadingPerusahaan = false
            resolve(resp)
          })
          .catch((err) => {
            this.loadingPerusahaan = false
            reject(err)
          })
      })
      // console.log('supplier keys', Object.keys(this.print.form.supplier))
      // console.log('supplier keys leng', Object.keys(this.print.form.supplier).length)
    },
    simpanTransaksi() {
      const penjualan = usePenjualanTable()
      const user = useAuthStore()
      const admin = user.user
      const total = olahUang(this.form.total)
      // const total = olahUang(this.totalSemua)
      const ongkir = olahUang(this.form.ongkir)
      const potongan = olahUang(this.form.potongan)
      const bayar = olahUang(this.form.bayar)
      const kembali = olahUang(this.form.kembali)

      this.form.user_id = admin.id
      this.form.total = total
      this.form.ongkir = ongkir
      this.form.potongan = potongan
      this.form.bayar = bayar
      this.form.kembali = kembali
      this.form.status = 2
      this.form.totalSemua = olahUang(this.totalSemua)
      print.form = this.form
      // console.log('form', this.form)
      // console.log('print form', this.print.form)
      if (this.printChek) { window.print() }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('transaksi ', resp)
            const table = usePembelianTable()
            if (resp.status === 201) {
              notifSuccess(resp)
              table.resetData()
              this.resetData()
              if (resp.data.update_harga !== '') {
                table.ambilDataProduk()
              }
              resolve(resp.data.data)
            }
            const slug = 'PBL-' + uniqueId()
            routerInstance.replace({
              name: 'transaksi.pembelian',
              params: { slug }
            })
            // routerInstance.currentRoute.value.params.slug = slug
            this.form.reff = slug
            table.form.reff = slug
            table.getDetailTransaksi(slug)
            this.isOpen = false
            penjualan.ambilDataProduk()
          })
          .catch((err) => {
            this.loading = false
            this.isOpen = false
            reject(err)
          })
      })
    }
  }
})
