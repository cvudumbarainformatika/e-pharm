import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Dialog } from 'quasar'
import { routerInstance } from 'src/boot/router'
import { formatRp, olahUang } from 'src/modules/formatter'

export const useReturTable = defineStore('retur_table', {
  state: () => ({
    isOpen: false,
    meta: {},
    loading: false,
    params: {
      q: '',
      order_by: 'created_at',
      sort: 'desc'
    },
    form: {
      faktur: '',
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
      nama: 'RETUR',
      tanggal: null,
      jenis: 'tunai',
      ongkir: 0,
      potongan: 0,
      bayar: 0,
      kembali: 0,
      tempo: null,
      kasir_id: null,
      supplier_id: null,
      status: 1
    },
    jenises: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'HUTANG', value: 'hutang' }
    ],
    produk: '',
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
      { name: 'harga', align: 'left', label: 'Harga', field: 'harga', format: val => formatRp(val) },
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
        field: (row) => formatRp(row.harga * row.qty)
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
      this.form.faktur = null
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
      this.form.tanggal = null
      this.form.nama = null
      this.form.jenis = 'tunai'
      this.form.ongkir = 0
      this.form.potongan = 0
      this.form.bayar = 0
      this.form.kembali = 0
      this.form.tempo = null
      this.form.kasir_id = null
      this.form.supplier_id = null
      this.form.status = 1
      this.rows = []
    },
    resetInput() {
      this.form.product_id = ''
      this.form.harga_beli = 0
      this.form.harga_jual_cust = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.qty = 0
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal = formatDb
    },
    setTotal() {
      // console.log('rows ', this.rows)
      if (this.rows !== undefined) {
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
      // console.log('params ', params)
      // console.log('val ', val.row.id)
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Produk:<strong> ${params.product.nama}</strong> dengan Qty :<strong> ${params.qty}</strong> akan di hapus?`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.hapusDetailTransaksi(params)
        })
        .onCancel(() => {
          // console.log('cancel')
        })
    },

    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      const temp = thumb[0]
      this.columnHide.forEach((hide) => {
        // console.log('hide', hide)
        const apem = temp.indexOf(hide)
        if (apem > -1) {
          temp.splice(apem, 1)
        }
      })
      // console.log('temp ', temp)
      const tTemp = []
      temp.forEach((val, index) => {
        // console.log('val ', val, ' index ', index)
        // console.log('temp ', val)
        tTemp[index] = Object.assign({
          name: val,
          align: 'left',
          label: val,
          field: val
        })
      })
      this.columns = tTemp

      // console.log('columns', tTemp)
    },
    setFaktur(data) {
      // const store = usePembelianDialog()
      this.form.reff = 'R' + routerInstance.currentRoute.value.params.slug
      this.form.nama = data.nama
      if (data.faktur !== '') {
        this.form.faktur = data.faktur
      }
    },
    setForm(name, value) {
      this.form[name] = value
      // console.log('set form', this.form[name])
    },
    // api related functions
    // get from another pinia file
    // from produk table
    getDetailTransaksi(val) {
      this.loading = true
      let slug = ''
      if (val === undefined) {
        slug = 'R' + routerInstance.currentRoute.value.params.slug
      } else {
        slug = val
      }
      this.form.reff = slug
      this.params.reff = slug
      const params = { params: this.params }
      this.resetData()
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/with-detail', params)
          .then((resp) => {
            this.loading = false
            // console.log('retur ', resp.data.data[0])
            if (resp.status === 200) {
              if (resp.data.data[0] !== undefined) {
                this.setFaktur(resp.data.data[0])
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
      this.form.product_id = this.produk.product_id
      this.form.harga = olahUang(this.produk.harga)
      this.form.sub_total =
        olahUang(this.form.qty) * olahUang(this.produk.harga)
      const reff = 'R' + routerInstance.currentRoute.value.params.slug
      this.form.reff = reff
      this.loading = true
      this.form.status = 2
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('save detail ', resp)
            resolve(resp.data.data)
            // this.getDetailTransaksi()
            // this.resetInput()
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    hapusDetailTransaksi(params) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/detail-transaksi/destroy', params)
          .then((resp) => {
            this.loading = false
            // console.log('hapus detail ', resp)
            resolve(resp.data.data)
            this.getDetailTransaksi()
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
