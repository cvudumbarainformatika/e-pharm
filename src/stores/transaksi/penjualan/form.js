import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { olahUang } from 'src/modules/formatter'
import { notifErrVue, uniqueId } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useDashboardStore } from 'src/stores/dashboard'
import { usePrintStore } from 'src/stores/print'
import { usePenjualanTable } from './table'
// import { useRouter } from 'vue-router'

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
      embalase: 0,
      bayar: 0,
      kembali: 0,
      tempo: null,
      kasir_id: null,
      supplier_id: null,
      dokter_id: null,
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
    distributor: '',
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
      this.form.embalase = 0
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
      const embalase = this.form.embalase ? olahUang(this.form.embalase) : 0
      this.totalSemua = total - potongan + ongkir + embalase
      this.print.totalSemua = this.totalSemua
      this.print.potongan = potongan
      this.print.ongkir = ongkir
      if (embalase > 0) this.print.embalase = embalase
    },
    kembalian() {
      const bayar = olahUang(this.form.bayar)
      this.totalSeluruhnya()
      this.form.kembali = bayar - olahUang(this.totalSemua)
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
      // this.print.form = this.form
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setForm(key, val) {
      this.form[key] = val
    },
    searchSupplier(val) {
      this.ambilDataSupplier(val)
    },
    jenisSelected(val) {
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
      const embalase = this.form.embalase ? olahUang(this.form.embalase) : 0

      this.form.kasir_id = kasir.id
      this.form.total = total
      this.form.ongkir = ongkir
      this.form.potongan = potongan
      this.form.bayar = bayar
      this.form.kembali = kembali
      this.form.embalase = embalase
      this.form.status = 2
      // this.print.form = this.form
      // this.print.form.embalase = embalase
      // this.print.form.customer = this.distributor
      // this.print.form.dokter = this.dokter
      // this.print.form.kasir = kasir.name
      this.print.setWholeForm(this.form)
      this.print.setForm('embalase', embalase)
      this.print.setForm('customer', this.distributor)
      this.print.setForm('dokter', this.dokter)
      this.print.setForm('kasir', kasir.name)

      const slug = 'PJL-' + uniqueId()
      // this.print.prevUrl = '/transaksi/penjualan/' + slug
      this.print.setUrl('/transaksi/penjualan/' + slug)
      // console.log('kasir', kasir)
      // console.log(this.form)
      if (bayar < total && this.form.jenis === 'tunai') {
        notifErrVue('periksa input bayar')
        return
      }
      // console.log('form', this.form)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            this.loading = false
            const table = usePenjualanTable()
            if (resp.status === 201) {
              // notifSuccess(resp)
              table.resetData()
              this.resetData()
              // const slug = 'PJL-' + uniqueId()

              if (this.printChek) {
                // const router = useRouter()
                // this.print.form.nota = resp.data.data.nota
                this.print.setForm('nota', resp.data.data.nota)
                const newRoute = routerInstance.resolve({
                  path: '/print'
                })
                window.open(newRoute.href, '_blank')
                // routerInstance.push({ path: '/print' })
              }
              // if (!this.printChek) {
              // const route = routerInstance.resolve({
              //   name: 'transaksi.penjualan',
              //   params: { slug }
              // })
              // window.open(route.href)
              routerInstance.replace({
                name: 'transaksi.penjualan',
                params: { slug }
              })
              // }
              // routerInstance.currentRoute.value.params.slug = slug
              this.form.reff = slug
              table.form.reff = slug
              table.produkParams.reff = slug
              // table.getDetailTransaksi(slug)
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
