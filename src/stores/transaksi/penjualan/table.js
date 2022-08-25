import { defineStore } from 'pinia'
import { useProdukTable } from 'src/stores/master/produk/table'
import { api } from 'boot/axios'
import { waitLoad } from 'src/modules/utils'
import { olahUang } from 'src/modules/formatter'
import { Dialog } from 'quasar'
import { usePenjualanDialog } from './form'
import { routerInstance } from 'src/boot/router'
import { useCustomerTable } from 'src/stores/master/customer/table'
import { useDokterTable } from 'src/stores/master/dokter/table'
import { useCustomerFormStore } from 'src/stores/master/customer/form'
import { useDokterFormStore } from 'src/stores/master/dokter/form'

export const usePenjualanTable = defineStore('penjualan_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    form: {
      reff: '',
      product_id: '',
      harga_beli: 0,
      harga_jual_umum: 0,
      harga_jual_resep: 0,
      harga_jual_cust: 0,
      qty: 0,
      harga: 0,
      total: 0,
      sub_total: 0,
      nama: 'PENJUALAN'
    },
    produks: [],
    distributors: [],
    dokters: [],
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
        field: (row) => row.product.nama
      },
      { name: 'qty', align: 'left', label: 'Qty', field: 'qty' },
      { name: 'harga', align: 'left', label: 'Harga', field: 'harga' },
      {
        name: 'harga_jual_umum',
        align: 'left',
        label: 'Harga Jual Umum',
        field: (row) => row.product.harga_jual_umum
      },
      {
        name: 'harga_jual_resep',
        align: 'left',
        label: 'Harga Jual Resep',
        field: (row) => row.product.harga_jual_resep
      },
      {
        name: 'harga_jual_cust',
        align: 'left',
        label: 'Harga Jual Distributor',
        field: (row) => row.product.harga_jual_cust
      },
      {
        name: 'sub_total',
        align: 'left',
        label: 'Sub total',
        field: (row) => row.harga * row.qty
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
      this.params.transaction_id = null
      this.form.reff = null
      this.form.product_id = ''
      this.form.harga_beli = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.harga_jual_cust = 0
      this.form.qty = 0
      this.form.harga = 0
      this.form.total = 0
      this.form.sub_total = 0
      this.rows = []
    },
    produkSelected(val) {
      const apem = this.produks

      const produk = apem.filter((data) => {
        return data.id === val
      })
      this.form.product_id = produk[0].id
      this.form.harga_beli = produk[0].harga_beli
      this.form.harga_jual_cust = produk[0].harga_jual_cust
      this.form.harga_jual_umum = produk[0].harga_jual_umum
      this.form.harga_jual_resep = produk[0].harga_jual_resep
      this.form.qty = 1
      // console.log('nama ', produk[0])
    },
    resetInput() {
      this.form.product_id = ''
      this.form.harga = 0
      this.form.harga_jual_cust = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.qty = 0
    },
    onEnter() {
      const store = usePenjualanDialog()
      // store.form.reff = this.form.reff
      store.setToday()
      this.simpanDetailTransaksi()
    },

    setTotal() {
      console.log('rows ', this.rows)
      if (this.rows !== undefined) {
        const subTotal = []
        this.rows.forEach((val, index) => {
          subTotal[index] = val.harga * val.qty
        })
        console.log('sub total', subTotal)
        const total = subTotal.reduce((total, num) => {
          return total + num
        })
        console.log('sum total', total)
        this.form.total = total
      }
    },
    clicked(val) {
      const params = val.row
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Produk:<strong> ${params.produk.nama}</strong> dengan Qty :<strong> ${params.qty}</strong> akan di hapus?`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.hapusDetailTransaksi(params)
        })
        .onCancel(() => {
          console.log('cancel')
        })
      console.log('params ', params)
      console.log('val ', val.row.id)
    },

    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      const temp = thumb[0]
      this.columnHide.forEach((hide) => {
        console.log('hide', hide)
        const apem = temp.indexOf(hide)
        if (apem > -1) {
          temp.splice(apem, 1)
        }
      })
      console.log('temp ', temp)
      const tTemp = []
      temp.forEach((val, index) => {
        console.log('val ', val, ' index ', index)
        console.log('temp ', val)
        tTemp[index] = Object.assign({
          name: val,
          align: 'left',
          label: val,
          field: val
        })
      })
      this.columns = tTemp

      console.log('columns', tTemp)
    },
    // api related functions
    // get from another pinia file
    // from produk table
    ambilDataProduk() {
      const produk = useProdukTable()
      produk.getDataTable().then((resp) => {
        this.produks = resp
      })
    },
    ambilDataDistributor() {
      const dist = useCustomerTable()
      dist.getDataTable().then(resp => {
        this.distributors = resp
      })
    },
    ambilDataDokter() {
      const dokter = useDokterTable()
      dokter.getDataTable().then(resp => {
        this.dokters = resp
      })
    },
    addDistributor(val) {
      this.loading = true
      const store = useCustomerFormStore()
      store.form.nama = val
      store.saveForm().then(() => {
        this.ambilDataDistributor()
        this.loading = false
      })
      console.log('distributor ', val)
    },
    addDokter(val) {
      const store = useDokterFormStore()
      store.form.nama = val
      // store.setOpen()
      console.log('dokter ', val)
    },
    cariDistributor(val) {
      // this.ambilDataDistributor()
      console.log('cari Distributor ', val)
    },
    cariDokter(val) {
      // this.ambilDataDokter()
      console.log('cari Dokter ', val)
    },
    setForm(name, value) {
      // const store = usePenjualanDialog()
      // if (data.faktur !== '') {
      //   this.form.faktur = data.faktur
      // }
      this.form[name] = value
      // store.form.total = data.total
      // store.form.jenis = data.jenis
      // store.form.potongan = data.potongan
      // store.form.ongkir = data.ongkir
    },
    getDetailTransaksi() {
      this.loading = true
      const slug = routerInstance.currentRoute.value.params.slug
      this.params.reff = slug
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/with-detail', params)
          .then((resp) => {
            this.loading = false
            console.log('penjualan ', resp.data.data[0])
            if (resp.status === 200) {
              if (resp.data.data[0] !== undefined) {
                this.setForm(resp.data.data[0])
                this.rows = resp.data.data[0].detail_transaction
                this.setTotal()
                this.meta = resp.data.meta
              }
              // this.setColumns(resp.data.data)
              resolve(resp.data.data[0])
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    simpanDetailTransaksi() {
      const store = usePenjualanDialog()
      const data = store.form

      data.product_id = this.form.product_id
      data.harga = olahUang(this.form.harga)
      data.qty = this.form.qty
      data.sub_total = olahUang(this.form.qty) * olahUang(this.form.harga)

      waitLoad('show')
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', data)
          .then((resp) => {
            waitLoad('done')
            console.log('save detail ', resp)
            resolve(resp.data.data)
            this.getDetailTransaksi()
            // this.resetInput()
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    },
    hapusDetailTransaksi(params) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api
          .post('v1/detail-transaksi/destroy', params)
          .then((resp) => {
            waitLoad('done')
            console.log('hapus detail ', resp)
            resolve(resp.data.data)
            this.getDetailTransaksi()
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    }
  }
})
