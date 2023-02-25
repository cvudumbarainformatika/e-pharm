import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { olahUang } from 'src/modules/formatter'
import { notifErrVue, notifSuccess, uniqueId } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useDashboardStore } from 'src/stores/dashboard'
import { usePrintStore } from 'src/stores/print'
import { usePenjualanTable } from './table'

export const usePenjualanDialog = defineStore('penjualan_store', {
  state: () => ({
    isOpen: false,
    form: {
      reff: null,
      tanggal: null,
      nama: 'PENJUALAN',
      jenis: 'tunai',
      total: 0,
      diskon: 0,
      ongkir: 0,
      potongan: 0,
      bayar: 0,
      kembali: 0,
      tempo: null,
      kasir_id: null,
      supplier_id: null,
      dokter_id: null,
      customer_id: null,
      status: 1,
      pasien: {}
    },
    piutang: false,
    totalSemua: 0,
    jenises: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'PIUTANG', value: 'piutang' }
    ],
    jenisTunai: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'NON-TUNAI', value: 'non-tunai' }
    ],
    kasirs: [],
    suppliers: [],
    dokter: '',
    ditributor: '',
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
      this.form.nama = 'PENJUALAN'
      this.form.faktur = null
      this.form.reff = null
      this.form.tanggal = null
      this.form.jenis = 'tunai'
      this.form.total = 0
      this.form.diskon = 0
      this.form.ongkir = 0
      this.form.potongan = 0
      this.form.bayar = 0
      this.form.kembali = 0
      this.form.status = 1
      this.form.pasien = null
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
      this.print.totalSemua = this.totalSemua
      this.print.potongan = potongan
      this.print.ongkir = ongkir
      // console.log('ongkir ', ongkir, ' total semua ', this.totalSemua)
    },
    kembalian() {
      const bayar = olahUang(this.form.bayar)
      this.form.kembali = bayar - olahUang(this.totalSemua)
      // console.log('bayar ', bayar, ' total semua ', this.totalSemua)
      // console.log('kembali ', this.form.kembali)
    },
    openDialog() {
      const table = usePenjualanTable()
      table.setDokterOrDistributor()
      this.form.reff = table.form.reff
      this.form.total = table.form.total
      this.form.dokter_id = table.form.dokter_id
      this.form.customer_id = table.form.customer_id
      this.distributor = table.distributor
      this.dokter = table.dokter
      this.form.distributor = table.distributor
      this.form.dokter = table.dokter
      this.form.pasien = Object.keys(table.dataPasien).length ? table.dataPasien : null
      if (table.form.dokter_id !== null && table.pasien === 'BPJS') {
        this.form.jenis = 'piutang'
      } else {
        this.form.jenis = 'tunai'
      }
      this.totalSeluruhnya()
      this.form.bayar = ''
      this.setOpen()
      this.print.form = this.form
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setForm(key, val) {
      this.form[key] = val
    },
    searchSupplier(val) {
      this.ambilDataSupplier(val)
      // console.log(val)
    },
    jenisSelected(val) {
      // console.log('jenis selected ', val)
      if (val === 'tunai' || val === 'non-tunai') {
        this.piutang = false
      } else {
        this.piutang = true
      }
    },
    ambilDataKasir() {
      const user = useAuthStore()
      this.kasirs = [user.user]
    },
    // ambilDataSupplier(val) {
    //   if (val !== '') {
    //     this.params.q = val
    //   }
    //   this.loading = true
    //   const params = { params: this.params }
    //   return new Promise((resolve, reject) => {
    //     api
    //       .get('v1/supplier/index', params)
    //       .then((resp) => {
    //         this.loading = false
    //         console.log('suppliers ', resp)
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
    simpanTransaksi() {
      const user = useAuthStore()
      const kasir = user.user
      const total = olahUang(this.form.total)
      const ongkir = olahUang(this.form.ongkir)
      const potongan = olahUang(this.form.potongan)
      const bayar = olahUang(this.form.bayar)
      const kembali = olahUang(this.form.kembali)

      this.form.kasir_id = kasir.id
      this.form.total = total
      this.form.ongkir = ongkir
      this.form.potongan = potongan
      this.form.bayar = bayar
      this.form.kembali = kembali
      this.form.status = 2
      this.print.form = this.form
      // console.log('kasir', kasir)
      // console.log(this.form)
      if (bayar < total && this.form.jenis === 'tunai') {
        notifErrVue('periksa input bayar')
        return
      }
      if (this.printChek) {
        window.print()
      }
      // console.log('form', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('transaksi ', resp)
            const table = usePenjualanTable()
            if (resp.status === 201) {
              notifSuccess(resp)
              table.resetData()
              this.resetData()
              const slug = 'PJL-' + uniqueId()
              routerInstance.replace({
                name: 'transaksi.penjualan',
                params: { slug }
              })
              // routerInstance.currentRoute.value.params.slug = slug
              this.form.reff = slug
              table.form.reff = slug
              table.getDetailTransaksi(slug)
              this.isOpen = false
              useDashboardStore().getDataRank()
              resolve(resp.data.data)
            }
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
