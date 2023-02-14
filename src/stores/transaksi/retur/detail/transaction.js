import { defineStore } from 'pinia'
// import { useProdukTable } from 'src/stores/master/produk/table'
import { api } from 'boot/axios'
// import { notifErrVue, waitLoad } from 'src/modules/utils'
// import { olahUang } from 'src/modules/formatter'
// import { Dialog } from 'quasar'
import { routerInstance } from 'src/boot/router'
import { formatRp, olahUang } from 'src/modules/formatter'
import { useReturTable } from './retur'
import { useAuthStore } from 'src/stores/auth'

export const useReturDetailTable = defineStore('retur_detail_table', {
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
    jenisJuales: [
      { nama: 'TUNAI', value: 'tunai' },
      { nama: 'NON-TUNAI', value: 'non-tunai' }
    ],
    prevjenis: 'tunai',
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
      this.form = {}
      this.params.transaction_id = null
      this.form.jenis = 'tunai'
      this.form.nama = 'RETUR'
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
    setReturTotal() {
      const retur = useReturTable()
      if (retur.rows !== undefined) {
        const subTotal = []
        const indexDari = retur.rows.filter(data => { return data.product_id === this.form.product_id })
        const panjang = retur.rows.length
        // update
        if (indexDari.length >= 1) {
          retur.rows.forEach((val, index) => {
            if (val.product_id === this.form.product_id) {
              subTotal[index] =
              olahUang(this.form.qty) * olahUang(this.produk.harga)
            } else {
              subTotal[index] = val.harga * val.qty
            }
          })
        // create
        } else {
          retur.rows.forEach((val, index) => {
            subTotal[index] = val.harga * val.qty
          })
          subTotal[panjang] =
          olahUang(this.form.qty) * olahUang(this.produk.harga)
        }
        // console.log('index dari', indexDari.length)
        // console.log('sub total', subTotal)
        const total = subTotal.reduce((total, num) => {
          return total + num
        })
        retur.form.total = total
        this.form.total = total
        // empty
      } else {
        retur.form.total = olahUang(this.form.qty) * olahUang(this.produk.harga)
        this.form.total = olahUang(this.form.qty) * olahUang(this.produk.harga)
      }
    },
    clicked(val) {
      const params = val.row
      this.produk = params
      this.setOpen()
      // console.log('params ', params)
      console.log('clicked val ', val)
    },

    setFaktur(data) {
      // const store = usePembelianDialog()
      this.form.reff = routerInstance.currentRoute.value.params.slug
      this.form.nama = 'RETUR ' + data.nama
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
        slug = routerInstance.currentRoute.value.params.slug
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
                this.prevjenis = resp.data.data[0].jenis
                this.rows = resp.data.data[0].detail_transaction
                this.setTotal()
                this.meta = resp.data.meta
                console.log('retur table', this.prevjenis)
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
    gantiStatus() {
      const data = {
        reff: routerInstance.currentRoute.value.params.slug,
        status: 3
      }
      return new Promise(resolve => {
        api.post('v1/transaksi/store', data)
          .then(resp => {
            resolve(resp)
          })
      })
    },
    simpanDetailTransaksi() {
      const retur = useReturTable()
      const reff = 'R' + routerInstance.currentRoute.value.params.slug
      this.setToday()
      // this.setReturTotal()
      // this.form.total = this.setReturTotal()
      const data = this.form
      data.product_id = this.produk.product_id
      data.harga = olahUang(this.produk.harga)
      data.sub_total = olahUang(this.form.qty) * olahUang(this.produk.harga)
      this.loading = true
      this.setReturTotal()
      data.total = retur.form.total
      data.status = 2
      data.reff = reff
      const auth = useAuthStore()
      // console.log('kasir transaksi', auth.user)
      if (auth.user.role === 'kasir') {
        data.kasir_id = auth.user.id
      }

      // console.log('total ', this.form.total)
      // console.log('form ', this.form)
      // console.log('data ', data)

      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', data)
          .then((resp) => {
            this.loading = false
            // console.log('save detail ', resp)
            resolve(resp.data.data)
            retur.getDetailTransaksi()
            this.setTotal()
            this.form.reff = routerInstance.currentRoute.value.params.slug
            // this.resetInput()
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    hapusDetailTransaksi(params) {}
  }
})
