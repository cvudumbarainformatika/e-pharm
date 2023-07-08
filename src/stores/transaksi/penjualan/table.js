import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { dateExpire, formatRp } from 'src/modules/formatter'
import { date, Dialog } from 'quasar'
import { usePenjualanDialog } from './form'
import { routerInstance } from 'src/boot/router'
import { useCustomerTable } from 'src/stores/master/customer/table'
import { useDokterTable } from 'src/stores/master/dokter/table'
import { useCustomerFormStore } from 'src/stores/master/customer/form'
import { useDokterFormStore } from 'src/stores/master/dokter/form'
import { usePrintStore } from 'src/stores/print'
import { findWithAttr, notifErrVue } from 'src/modules/utils'
import { useSettingStore } from 'src/stores/setting/setting'

export const usePenjualanTable = defineStore('penjualan_table', {
  state: () => ({
    produkLoading: false,
    produkUpdateLoading: false,
    detailLoading: false,
    simpanDetailLoading: false,
    hapusDetailLoading: false,
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 30,
      order_by: 'created_at',
      sort: 'desc'
    },
    produk: null,
    form: {
      reff: '',
      product_id: '',
      harga_beli: 0,
      harga_jual_umum: 0,
      harga_jual_resep: 0,
      harga_jual_cust: 0,
      qty: 0,
      diskon: 0,
      harga: 0,
      total: 0,
      sub_total: 0,
      nama: 'PENJUALAN',
      customer_id: null,
      expired: null,
      dokter_id: null,
      pasien: null
    },
    dataPasien: {
      nokartu: null,
      noresep: null,
      nama: null,
      alamat: null
    },
    produkParams: {
      q: '',
      from: date.formatDate(Date.now(), 'YYYY-MM-DD')
      // selection: 'selection'
    },
    jenises: [
      { nama: 'Umum', value: 'umum' },
      { nama: 'BPJS', value: 'BPJS' }
    ],
    pasien: 'umum',
    produks: [],
    distributors: [],
    dokters: [],
    distributor: '',
    dokter: '',
    expireds: [],
    print: usePrintStore(),
    columns: [
      {
        name: 'id',
        align: 'left',
        label: '#',
        field: (row) => row.id,
        format: (val) => `${val}`,
        required: true
      },
      {
        name: 'produk',
        align: 'left',
        label: 'Produk',
        field: (row) => row.product ? row.product.nama : '-'
      },
      // {
      //   name: 'expired',
      //   align: 'left',
      //   label: 'Expired',
      //   field: (row) => dateExpire(row.expired)
      // },
      { name: 'qty', align: 'left', label: 'Jumlah', field: 'qty' },
      {
        name: 'harga',
        align: 'left',
        label: 'Harga',
        field: 'harga',
        format: (val) => formatRp(val)
      },
      // {
      //   name: 'harga_jual_umum',
      //   align: 'left',
      //   label: 'Harga Jual Umum',
      //   field: (row) => row.product.harga_jual_umum
      // },
      // {
      //   name: 'harga_jual_resep',
      //   align: 'left',
      //   label: 'Harga Jual Resep',
      //   field: (row) => row.product.harga_jual_resep
      // },
      // {
      //   name: 'harga_jual_cust',
      //   align: 'left',
      //   label: 'Harga Jual Distributor',
      //   field: (row) => row.product.harga_jual_cust
      // },
      {
        name: 'sub_total',
        align: 'left',
        label: 'Sub total',
        field: (row) => row.harga * row.qty,
        format: (val) => formatRp(val)
      }
    ],
    visbleColumns: [
      '#',
      'produk',
      'qty',
      'harga',
      'harga_beli',
      'harga-jual_umum',
      'harga_jual_resep',
      'harga_jual_customer',
      'sub_total'
    ],

    columnHide: [
      'id',
      'transaction_id',
      'product_id',
      'uuid',
      'created_at',
      'updated_at'
    ],
    rows: []
  }),

  actions: {
    // local relaated functions

    resetData() {
      this.form = {}
      this.produk = null
      this.form.nama = 'PENJUALAN'
      this.params.transaction_id = null
      this.form.reff = null
      this.form.customer_id = null
      this.form.dokter_id = null
      this.form.product_id = ''
      this.form.harga_beli = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.harga_jual_cust = 0
      this.form.qty = 0
      this.form.diskon = 0
      this.form.expired = null
      this.form.harga = 0
      this.form.total = 0
      this.form.sub_total = 0
      this.rows = []
      this.dokter = ''
      this.form.pasien = null
      this.distributor = ''
      this.pasien = 'umum'
      this.dataPasien = {

      }
    },
    // setForm(key, val) {
    //   this.form[key] = val
    // },
    dokterSelected(val) {
      // console.log('dokter ', val)
      const store = usePenjualanDialog()
      const apem = this.dokters
      if (val !== null) {
        const dokter = apem.filter((data) => {
          return data.id === val
        })
        this.dokter = dokter[0].nama
        store.form.dokter = dokter[0].nama
        // console.log('dokter ', dokter[0])
      } else {
        this.dokter = ''
      }
      store.form.dokter_id = val
      this.dokterOrDistSelected()
      // console.log('form ', store.form)
    },
    distributorSelected(val) {
      // console.log('distributor ', val)
      const store = usePenjualanDialog()
      const apem = this.distributors
      if (val !== null) {
        const distributor = apem.filter((data) => {
          return data.id === val
        })
        this.distributor = distributor[0].nama
        store.form.distributor = distributor[0].nama
        // console.log('distributor  ', distributor[0])
      } else {
        this.distributor = ''
      }
      store.form.customer_id = val
      this.dokterOrDistSelected()
      // console.log('form  ', store.form)
    },
    dokterOrDistSelected() {
      if (this.form.customer_id !== null) {
        this.form.harga = this.form.harga_jual_cust
      } else if (this.form.dokter_id !== null) {
        this.form.harga = this.form.harga_jual_resep
      } else {
        this.form.harga = this.form.harga_jual_umum
      }
    },
    jenisPasienSelect(val) {
      console.log(val)
      this.pasien = val
    },
    produkSelected(val) {
      const apem = this.produks

      const produk = apem.filter((data) => {
        return data.id === val
      })
      if (produk.length) {
        this.produk = produk[0]
        // console.log('selected', val, produk[0])
        this.form.product_id = produk[0].id
        this.form.harga_beli = produk[0].harga_beli
        this.form.harga_jual_cust = produk[0].harga_jual_cust
        this.form.harga_jual_umum = produk[0].harga_jual_umum
        this.form.harga_jual_resep = produk[0].harga_jual_resep
        this.form.qty = 1
        if (this.form.customer_id !== null) {
          this.form.harga = this.form.harga_jual_cust
        } else if (this.form.dokter_id !== null) {
          this.form.harga = this.form.harga_jual_resep
        } else {
          this.form.harga = this.form.harga_jual_umum
        }
      }
      // console.log('Product ', this.form)
    },
    resetInput() {
      this.form.product_id = ''
      this.form.harga = 0
      this.form.harga_jual_cust = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.qty = 0
      this.form.expired = ''
      console.log('reset input')
    },
    clearNullForm() {
      const key = Object.keys(this.form)
      key.forEach(val => {
        if (this.form[val] === null) {
          delete this.form[val]
        }
      })
    },
    onEnter() {
      const store = usePenjualanDialog()
      // store.form.reff = this.form.reff
      store.setToday()
      this.produkParams.product_id = this.form.product_id
      // const store = usePenjualanDialog();

      // data.product_id = this.form.product_id
      // data.harga = olahUang(this.form.harga)
      // data.qty = this.form.qty
      // data.sub_total = olahUang(this.form.qty) * olahUang(this.form.harga)
      // console.log('form ', this.form)
      // store.setForm('product_id', this.form.product_id)
      // store.setForm('harga', olahUang(this.form.harga))
      // store.setForm('qty', olahUang(this.form.qty))
      // store.setForm('sub_total', olahUang(this.form.qty) * olahUang(this.form.harga))
      if (this.form.expired !== null) {
        store.setForm('expired', this.form.expired)
        // data.expired = this.form.expired
      }
      // this.clearNullForm()
      const data = store.form

      // console.log('form penjualan', data)
      const index = findWithAttr(this.produks, 'id', this.form.product_id)
      this.simpanDetailTransaksi(data).then(() => {
        return new Promise(resolve => {
          this.getSingleProduct().then(resp => {
            this.produks[index] = resp
            resolve(resp)
          })
        })
      })
      this.resetInput()
      const produk = this.produks[index]
      // produk.keluar.periode = this.form.qty

      // console.log('produk', produk)
      // produk.stokSekarang -= this.form.qty
      if (produk.limit_stok > produk.stokSekarang) {
        notifErrVue(`stok ${produk.nama} sejumlah ${produk.stokSekarang}, kurang dari limit_stok ${produk.limit_stok}`)
      }
      // console.log('produk', produk)
    },

    setTotal() {
      // console.log('rows ', this.rows)
      if (this.rows.length) {
        const subTotal = []
        this.rows.forEach((val, index) => {
          subTotal[index] = val.harga * val.qty
        })
        // console.log('sub total', subTotal)
        const total = subTotal.reduce((total, num) => {
          return total + num
        })
        // console.log('sum total', total)
        this.form.total = total
      }
    },
    clicked(val) {
      const params = val.row
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Produk:<strong> ${params.produk ? params.produk.nama : '-'}</strong> dengan Qty :<strong> ${params.qty}</strong> akan di hapus?`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.hapusDetailTransaksi(params)
        })
        .onCancel(() => {
          // console.log('cancel')
        })
      // console.log('params ', params)
      // console.log('val ', val.row.id)
    },
    prosesData(val) {
      const product = val.product
      const stok = val
      product.forEach((data) => {
        data.keluar = {}
        data.masuk = {}
        data.returPembelian = {}
        data.returPenjualan = {}
        data.penyesuaian = {}
      })
      product.forEach((data) => {
        const keluarB = stok.keluar.before
          ? findWithAttr(stok.keluar.before, 'product_id', data.id)
          : -1
        const keluarP = stok.keluar.period
          ? findWithAttr(stok.keluar.period, 'product_id', data.id)
          : -1
        const masukB = stok.masuk.before
          ? findWithAttr(stok.masuk.before, 'product_id', data.id)
          : -1
        const masukP = stok.masuk.period
          ? findWithAttr(stok.masuk.period, 'product_id', data.id)
          : -1
        const returPembelianB = stok.returPembelian.before
          ? findWithAttr(stok.returPembelian.before, 'product_id', data.id)
          : -1
        const returPembelianP = stok.returPembelian.period
          ? findWithAttr(stok.returPembelian.period, 'product_id', data.id)
          : -1
        const returPenjualanB = stok.returPenjualan.before
          ? findWithAttr(stok.returPenjualan.before, 'product_id', data.id)
          : -1
        const returPenjualanP = stok.returPenjualan.period
          ? findWithAttr(stok.returPenjualan.period, 'product_id', data.id)
          : -1
        const penyesuaianB = stok.penyesuaian.before
          ? findWithAttr(stok.penyesuaian.before, 'product_id', data.id)
          : -1
        const penyesuaianP = stok.penyesuaian.period
          ? findWithAttr(stok.penyesuaian.period, 'product_id', data.id)
          : -1

        data.keluar.before = stok.keluar.before[keluarB]
          ? stok.keluar.before[keluarB].jml
          : 0
        data.keluar.periode = stok.keluar.period[keluarP]
          ? stok.keluar.period[keluarP].jml
          : 0
        data.masuk.before = stok.masuk.before[masukB]
          ? stok.masuk.before[masukB].jml
          : 0
        data.masuk.periode = stok.masuk.period[masukP]
          ? stok.masuk.period[masukP].jml
          : 0
        data.returPembelian.before = stok.returPembelian.before[returPembelianB]
          ? stok.returPembelian.before[returPembelianB].jml
          : 0
        data.returPembelian.periode = stok.returPembelian.period[
          returPembelianP
        ]
          ? stok.returPembelian.period[returPembelianP].jml
          : 0
        data.returPenjualan.before = stok.returPenjualan.before[returPenjualanB]
          ? stok.returPenjualan.before[returPenjualanB].jml
          : 0
        data.returPenjualan.periode = stok.returPenjualan.period[
          returPenjualanP
        ]
          ? stok.returPenjualan.period[returPenjualanP].jml
          : 0
        data.penyesuaian.before = stok.penyesuaian.before[penyesuaianB]
          ? stok.penyesuaian.before[penyesuaianB].jml
          : 0
        data.penyesuaian.periode = stok.penyesuaian.period[penyesuaianP]
          ? stok.penyesuaian.period[penyesuaianP].jml
          : 0
        // sebelum
        data.stokSebelum =
          data.masuk.before -
          data.keluar.before +
          data.returPenjualan.before -
          data.returPembelian.before +
          data.penyesuaian.before
        // berjalan
        data.stokBerjalan =
          data.masuk.periode -
          data.keluar.periode +
          data.returPenjualan.periode -
          data.returPembelian.periode +
          data.penyesuaian.periode
        data.stok_awal += data.stokSebelum
        data.stokSekarang = data.stok_awal + data.stokBerjalan
      })
      this.produks = product
      // console.log('produk', product)
    },

    // api related functions
    // get from another pinia file
    // from produk table
    ambilDataDistributor() {
      const dist = useCustomerTable()
      return new Promise((resolve) => {
        dist.getDataTable().then((resp) => {
          this.distributors = resp
          // console.log('distributor',this.form.customer_id,' distributors ',this.distributors)
          resolve(resp)
        })
      })
    },
    ambilDataDokter() {
      const dokter = useDokterTable()
      return new Promise((resolve) => {
        dokter.getDataTable().then((resp) => {
          this.dokters = resp
          // console.log('dokter', this.form.dokter_id, ' dokters ', this.dokters)
          resolve(resp)
        })
      })
    },
    addDistributor(val) {
      const store = useCustomerFormStore()
      store.form.nama = val
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Distributor:<strong> ${val}</strong> akan ditambahkan?, <strong> jangan lupa untuk melengkapi data Distributor</strong>`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.loading = true
          store.saveForm().then(() => {
            this.ambilDataDistributor()
            this.loading = false
          })
        })
        .onCancel(() => {
          // console.log('cancel')
        })
        // console.log('distributor ', val)
    },
    addDokter(val) {
      const store = useDokterFormStore()
      store.form.nama = val
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Dokter:<strong> ${val}</strong> akan ditambahkan?, <strong> jangan lupa untuk melengkapi data Dokter</strong>`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.loading = true
          store.saveForm().then(() => {
            this.ambilDataDokter()
            this.loading = false
          })
        })
        .onCancel(() => {
          // console.log('cancel')
        })
        // console.log('dokter ', val)
    },
    setDokterOrDistributor() {
      if (this.form.dokter_id !== null) {
        const dokter = this.dokters.filter((data) => {
          return data.id === this.form.dokter_id
        })
        this.dokter = dokter[0].nama
        // console.log('dokter ', dokter[0].nama)
      }
      if (this.form.customer_id !== null) {
        const dist = this.distributors.filter((data) => {
          return data.id === this.form.customer_id
        })
        this.distributor = dist[0].nama
        // console.log('dist ', dist[0].nama)
      }
    },
    setForm(value) {
      // console.log('set form', value)
      const store = usePenjualanDialog()
      store.form = value
      this.form = value
      this.dataPasien = value.pasien !== null ? value.pasien : {}
      this.pasien = value.pasien !== null ? 'BPJS' : 'umum'
    },
    setExpire(val) {
      const temp = []
      val.will_expire.forEach((data, index) => {
        temp[index] = { name: dateExpire(data), value: data }
      })
      this.expireds = temp
      // console.log('set expire ', temp)
    },
    // api related function
    // ambil data produk seluruhnya
    ambilDataProduk() {
      const params = {
        params: this.produkParams
      }
      this.produkLoading = true
      return new Promise((resolve, reject) => {
        api.get('v1/laporan/all-stok', params)
          .then(resp => {
            console.log('produk penjualan', resp.data)
            this.produkLoading = false
            this.prosesData(resp.data)
            // this.produks = resp.data.data
            resolve(resp.data)
          }).catch(err => {
            reject(err)
            this.produkLoading = false
          })
      })
    },
    // ambil data expired
    getDataExpired() {
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/expired')
          .then(resp => {
            // console.log('expired', resp.data)
            if (resp.status === 200) {
              const data = resp.data
              this.setExpire(data)
              resolve(data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // ambil data transaksi
    getDetailTransaksi(val) {
      // console.log('get detail transaksi ', val)
      this.detailLoading = true
      let slug = ''
      if (val === undefined) {
        slug = routerInstance.currentRoute.value.params.slug
      } else {
        slug = val
      }
      this.params.reff = slug
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/with-detail', params)
          .then((resp) => {
            this.detailLoading = false
            // console.log('penjualan ', resp.data)
            if (resp.status === 200) {
              if (resp.data.data[0] !== undefined) {
                this.setForm(resp.data.data[0])
                this.rows = resp.data.data[0].detail_transaction
                this.print.produks = this.rows
                this.setTotal()
                this.meta = resp.data.meta
              }
              // this.setColumns(resp.data.data)
              resolve(resp.data.data[0])
            }
          })
          .catch((err) => {
            useSettingStore().transaksiLoading = false
            this.detailLoading = false
            reject(err)
          })
      })
    },
    getSingleProduct() {
      const params = { params: this.produkParams }
      this.produkUpdateLoading = true
      return new Promise((resolve, reject) => {
        api.get('v1/laporan/single-product', params)
          .then(resp => {
            this.produkUpdateLoading = false
            // console.log('update produk', resp.data)
            resolve(resp.data)
          })
          .catch(err => {
            this.produkUpdateLoading = false
            reject(err)
          })
      })
    },
    detailTransaksi() {},
    simpanDetailTransaksi(data) {
      this.simpanDetailLoading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', data)
          .then((resp) => {
            this.simpanDetailLoading = false
            // console.log('save detail ', resp.data)
            resolve(resp.data.data)
            this.getDetailTransaksi()
          })
          .catch((err) => {
            this.simpanDetailLoading = false
            reject(err)
          })
      })
    },
    hapusDetailTransaksi(params) {
      this.hapusDetailLoading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/detail-transaksi/destroy', params)
          .then((resp) => {
            this.hapusDetailLoading = false
            // console.log('hapus detail ', resp)
            resolve(resp.data.data)
            this.getDetailTransaksi()
          })
          .catch((err) => {
            this.hapusDetailLoading = false
            reject(err)
          })
      })
    }
  }
})
