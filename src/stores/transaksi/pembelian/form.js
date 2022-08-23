import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { olahUang } from 'src/modules/formatter'
import { useAuthStore } from 'src/stores/auth'
import { usePembelianTable } from './table'

export const usePembelianDialog = defineStore('pembelian_store', {
  state: () => ({
    isOpen: false,
    form: {
      faktur: '',
      reff: '',
      tanggal: '',
      nama: '',
      jenis: '',
      total: 0,
      ongkir: 0,
      potongan: 0,
      bayar: 0,
      kembali: 0,
      tempo: '',
      kasir_id: '',
      supplier_id: ''
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
      console.log('bayar ', bayar, ' total semua ', this.totalSemua)
      console.log('kembali ', this.form.kembali)
    },
    openDialog() {
      const table = usePembelianTable()
      this.form.faktur = table.form.faktur
      this.form.reff = table.form.reff
      this.form.total = table.form.total
      this.totalSeluruhnya()
      this.setOpen()
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    searchSupplier(val) {
      this.ambilDataSupplier(val)
      console.log(val)
    },
    jenisSelected(val) {
      console.log('jenis selected ', val)
      if (val === 'tunai') {
        this.ambilDataKasir()
      } else {
        this.ambilDataSupplier()
      }
    },
    ambilDataKasir() {
      const user = useAuthStore()
      this.kasirs = [user.userGetter]
      // console.log('user ', user.user)
      // console.log('user getter', user.userGetter)
    },
    ambilDataSupplier(val) {
      if (val !== '') { this.params.q = val }
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/supplier/index', params)
          .then((resp) => {
            this.loading = false
            console.log('suppliers ', resp)
            if (resp.status === 200) {
              this.suppliers = resp.data.data
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
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

      console.log('form', this.form)
    }
  }
})
