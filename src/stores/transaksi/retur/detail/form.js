import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { olahUang } from 'src/modules/formatter'
import { notifSuccess } from 'src/modules/utils'
import { useReturDetailTable } from './transaction'

export const useReturDialog = defineStore('retur_store', {
  state: () => ({
    isOpen: false,
    form: {
      faktur: null,
      reff: null,
      tanggal: null,
      nama: 'RETUR',
      jenis: 'tunai',
      total: 0,
      ongkir: 0,
      potongan: 0,
      bayar: 0,
      kembali: 0,
      tempo: null,
      kasir_id: null,
      supplier_id: null,
      status: 1
    },
    totalSemua: 0,
    jenises: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'HUTANG', value: 'hutang' }
    ],
    kasirs: [],
    suppliers: [],
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    loading: false
  }),
  actions: {
    resetData() {
      this.form.id = null
      this.form.faktur = null
      this.form.reff = null
      this.form.tanggal = null
      this.form.nama = null
      this.form.jenis = 'tunai'
      this.form.total = 0
      this.form.ongkir = 0
      this.form.potongan = 0
      this.form.bayar = 0
      this.form.kembali = 0
      this.form.tempo = null
      this.form.kasir_id = null
      this.form.supplier_id = null
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
    totalSeluruhnya() {
      const total = olahUang(this.form.total)
      const potongan = olahUang(this.form.potongan)
      const ongkir = olahUang(this.form.ongkir)
      // console.log('total ', total, ' potongan ', potongan)
      this.totalSemua = total - potongan + ongkir
      // console.log('ongkir ', ongkir, ' total semua ', this.totalSemua)
    },
    kembalian() {
      const bayar = olahUang(this.form.bayar)
      this.form.kembali = bayar - olahUang(this.totalSemua)
      // console.log('bayar ', bayar, ' total semua ', this.totalSemua)
      // console.log('kembali ', this.form.kembali)
    },
    openDialog() {
      const table = useReturDetailTable()
      this.form.faktur = table.form.faktur
      this.form.reff = table.form.reff
      this.form.total = table.form.total
      this.totalSeluruhnya()
      this.setOpen()
    },
    setOpen() {
      this.isOpen = !this.isOpen
      this.form.jenis = ''
    },
    searchSupplier(val) {
      this.ambilDataSupplier(val)
      // console.log(val)
    },
    jenisSelected(val) {
      // console.log('jenis selected ', val)
      if (val === 'tunai') {
        this.ambilDataKasir()
      } else {
        this.ambilDataSupplier()
      }
    },
    simpanTransaksi() {
      const total = olahUang(this.form.total)
      const ongkir = olahUang(this.form.ongkir)
      const potongan = olahUang(this.form.potongan)
      const bayar = olahUang(this.form.bayar)
      const kembali = olahUang(this.form.kembali)

      this.form.total = total
      this.form.ongkir = ongkir
      this.form.potongan = potongan
      this.form.bayar = bayar
      this.form.kembali = kembali
      this.form.status = 2

      // console.log('form', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('transaksi ', resp)
            const table = useReturDetailTable()
            if (resp.status === 201) {
              notifSuccess(resp)
              table.resetData()
              this.resetData()
              resolve(resp.data.data)
            }
            // const slug = 'PBL-' + uniqueId()
            routerInstance.replace({ name: 'retur' })
            // routerInstance.currentRoute.value.params.slug = slug
            // this.form.reff = slug
            // table.form.reff = slug
            // table.getDetailTransaksi(slug)
            this.isOpen = false
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
