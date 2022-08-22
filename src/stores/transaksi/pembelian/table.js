import { defineStore } from 'pinia'
import { useProdukTable } from 'src/stores/master/produk/table'
import { api } from 'boot/axios'
import { waitLoad } from 'src/modules/utils'
import { olahUang } from 'src/modules/formatter'
import { Dialog } from 'quasar'

export const usePembelianTable = defineStore('pembelian_table', {
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
      faktur: '',
      reff: '',
      product_id: '',
      transaction_id: 1, // sementara untuk percobaan
      harga_beli: 0,
      harga_jual_umum: 0,
      harga_jual_resep: 0,
      harga_jual_cust: 0,
      qty: 0,
      harga: 0,
      total: 0,
      sub_total: 0
    },
    produks: [],
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
        field: (row) => row.produk.nama
      },
      { name: 'qty', align: 'left', label: 'Qty', field: 'qty' },
      { name: 'harga', align: 'left', label: 'Harga', field: 'harga' },
      {
        name: 'harga_jual_umum',
        align: 'left',
        label: 'Harga Jual Umum',
        field: (row) => row.produk.harga_jual_umum
      },
      {
        name: 'harga_jual_resep',
        align: 'left',
        label: 'Harga Jual Resep',
        field: (row) => row.produk.harga_jual_resep
      },
      {
        name: 'harga_jual_cust',
        align: 'left',
        label: 'Harga Jual Customer',
        field: (row) => row.produk.harga_jual_cust
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
      this.form.harga_beli = 0
      this.form.harga_jual_cust = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.qty = 0
    },
    onEnter() {
      const data = {
        transaction_id: this.form.transaction_id,
        product_id: this.form.product_id,
        harga: olahUang(this.form.harga_beli),
        qty: this.form.qty,
        sub_total: olahUang(this.form.qty) * olahUang(this.form.harga_beli)
      }
      this.simpanDetailTransaksi(data)
      console.log(' form ', data)
    },

    setTotal() {
      const subTotal = []
      this.rows.forEach((val, index) => { subTotal[index] = val.harga * val.qty })
      console.log('sub total', subTotal)
      const total = subTotal.reduce((total, num) => {
        return total + num
      })
      console.log('sum total', total)
      this.form.total = total
    },
    clicked(val) {
      const params = val.row
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Produk:<strong> ${params.produk.nama}</strong> dengan Qty :<strong> ${params.qty}</strong> akan di hapus?`,
        cancel: true,
        html: true
      }).onOk(() => {
        this.hapusDetailTransaksi(params)
      }).onCancel(() => { console.log('cancel') })
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

    getDetailTransaksi() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/detail-transaksi/index', params)
          .then((resp) => {
            this.loading = false
            console.log('pembelian ', resp)
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
              this.setTotal()
              // this.setColumns(resp.data.data)
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    simpanDetailTransaksi(params) {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api
          .post('v1/detail-transaksi/store', params)
          .then((resp) => {
            waitLoad('done')
            console.log('save detail ', resp)
            resolve(resp.data.data)
            this.getDetailTransaksi()
            this.resetInput()
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
