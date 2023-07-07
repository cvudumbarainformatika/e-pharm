import { defineStore } from 'pinia'
import { useProdukTable } from 'src/stores/master/produk/table'
import { api } from 'boot/axios'
import { notifErrVue, detailBesar, detailKecil } from 'src/modules/utils'
import { formatRp, formatRpDouble, olahUang } from 'src/modules/formatter'
import { Dialog, date } from 'quasar'
import { usePembelianDialog } from './form'
import { routerInstance } from 'src/boot/router'
import { usePrintStore } from 'src/stores/print'
import { useSettingStore } from 'src/stores/setting/setting'

export const usePembelianTable = defineStore('pembelian_table', {
  state: () => ({
    toFocus: '',
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
      transaction_id: null
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
      diskon: 0,
      total: 0,
      sub_total: 0,
      nama: 'PEMBELIAN',
      expired: null,
      tanggal_faktur: null,
      tanggal: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      update_harga: false
    },
    satuan: {
      besar: 0, kecil: 0, pengali: 0
    },
    namaSatuan: {
      besar: '',
      kecil: ''
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
        field: (row) => row.product ? row.product.nama : row.product_id
      },
      {
        name: 'expired',
        align: 'left',
        label: 'Expired',
        field: 'expired'
      },
      { name: 'satuanBesar', align: 'left', label: 'sat. besar', field: (row) => row.product.satuan_besar ? detailBesar(row.qty, row.product.pengali) + ' ' + row.product.satuan_besar.nama : '-' },
      { name: 'satuan', align: 'left', label: 'sat', field: (row) => row.product.satuan ? detailKecil(row.qty, row.product.pengali) + ' ' + row.product.satuan.nama : '-' },
      { name: 'pengali', align: 'left', label: 'pengali', field: (row) => row.product ? row.product.pengali : 0 },
      { name: 'qty', align: 'left', label: 'Jumlah', field: 'qty' },
      {
        name: 'harga',
        align: 'right',
        label: 'Harga ',
        field: 'harga',
        format: (val) => formatRp(val)
      },
      {
        name: 'diskon',
        align: 'right',
        label: 'Diskon ',
        field: 'diskon',
        format: (val) => val + ' %'
      },
      // {
      //   name: 'harga_jual_umum',
      //   align: 'right',
      //   label: 'Harga Umum',
      //   field: (row) => row.product ? row.product.harga_jual_umum : row.product_id,
      //   format: (val) => formatRp(val)
      // },
      // {
      //   name: 'harga_jual_resep',
      //   align: 'right',
      //   label: 'Harga Resep',
      //   field: (row) => row.product ? row.product.harga_jual_resep : row.product_id,
      //   format: (val) => formatRp(val)
      // },
      // {
      //   name: 'harga_jual_cust',
      //   align: 'right',
      //   label: 'Harga Distributor',
      //   field: (row) => row.product ? row.product.harga_jual_cust : row.product_id,
      //   format: (val) => formatRp(val)
      // },
      {
        name: 'sub_total',
        align: 'right',
        label: 'Sub total',
        field: (row) => row.diskon > 0 ? (row.harga * row.qty) - (row.harga * row.qty * (row.diskon / 100)) : row.harga * row.qty,
        format: (val) => formatRpDouble(val, 2)
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
    rows: [],
    refProduk: null,
    refExpired: null,
    refTanggal: null
  }),

  actions: {
    // local relaated functions
    resetData() {
      this.form = {}
      this.form.nama = 'PEMBELIAN'
      this.params.transaction_id = null
      this.form.faktur = null
      this.form.reff = null
      this.form.product_id = ''
      this.form.harga = 0
      this.form.harga_beli = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.harga_jual_cust = 0
      this.form.qty = 0
      this.form.harga = 0
      this.form.total = 0
      this.form.sub_total = 0
      this.form.expired = null
      this.form.tanggal_faktur = null
      this.form.tanggal = date.formatDate(Date.now(), 'YYYY-MM-DD')
      this.rows = []
      this.satuan.besar = 0
      this.satuan.kecil = 0
      this.satuan.pengali = 0
      this.namaSatuan.besar = ''
      this.namaSatuan.kecil = ''
    },
    produkSelected(val) {
      const apem = this.produks
      const produk = apem.filter((data) => {
        return data.id === val
      })
      // this.refExpired.focus()
      // this.refProduk.blur()
      // this.refTanggal.show()
      // console.log(produk[0])

      if (produk.length) {
        this.form.product_id = produk[0].id
        this.form.harga = produk[0].harga_beli
        this.form.harga_beli = produk[0].harga_beli
        this.form.harga_jual_cust = produk[0].harga_jual_cust
        this.form.harga_jual_umum = produk[0].harga_jual_umum
        this.form.harga_jual_resep = produk[0].harga_jual_resep
        this.form.diskon = 0
        this.satuan.besar = 1
        this.satuan.pengali = produk[0].pengali
        this.form.qty = this.satuan.besar * this.satuan.pengali
        this.namaSatuan.besar = produk[0].satuanBesar.nama
        this.namaSatuan.kecil = produk[0].satuan.nama
        this.form.sub_total = parseFloat(this.form.qty) * olahUang(this.form.harga)
      }
    },
    inputSatuanBesar(val) {
      this.form.qty = parseFloat(this.satuan.besar) * parseFloat(this.satuan.pengali) + parseFloat(this.satuan.kecil)
      // console.log('satuan besar', val)
      this.inputDiskon()
    },
    inputSatuanKecil(val) {
      this.form.qty = parseFloat(this.satuan.besar) * parseFloat(this.satuan.pengali) + parseFloat(this.satuan.kecil)
      this.inputDiskon()
      // console.log('satuan kecil', val)
    },
    inputDiskon(val) {
      this.form.sub_total = this.form.diskon > 0 ? (parseFloat(this.form.qty) * olahUang(this.form.harga)) - (parseFloat(this.form.qty) * olahUang(this.form.harga) * (parseFloat(this.form.diskon) / 100)) : parseFloat(this.form.qty) * olahUang(this.form.harga)
      // console.log('qty', this.form.qty)
      // console.log('harga', this.form.harga)
      // console.log('diskon', this.form.diskon)
      // console.log('sub_total', this.form.sub_total)
    },

    resetInput() {
      this.form.product_id = ''
      this.form.harga = 0
      this.form.harga_beli = 0
      this.form.harga_jual_cust = 0
      this.form.harga_jual_umum = 0
      this.form.harga_jual_resep = 0
      this.form.qty = 0
      this.form.diskon = 0
      this.satuan.besar = 0
      this.satuan.kecil = 0
      this.satuan.pengali = 0
      this.namaSatuan.besar = ''
      this.namaSatuan.kecil = ''
      this.form.expired = null
    },
    onF8(val) {
      if (val.key === 'F2') {
        alert('tembol F2 ditekan')
      }
      // console.log(' tombol ditekan', val.key)
    },
    onEnter() {
      const store = usePembelianDialog()
      store.form.reff = this.form.reff
      store.setToday()
      store.form.tanggal_faktur = this.form.tanggal_faktur
      if (this.form.faktur !== '' && this.form.product_id !== '' && this.form.qty !== 0) {
        store.form.faktur = this.form.faktur
        this.simpanDetailTransaksi()
      } else {
        notifErrVue('perksa Faktur, Produk, dan Jumlah pembelian')
      }
    },

    setTotal() {
      console.log('rows ', this.rows)
      if (this.rows.length) {
        const subTotal = []
        this.rows.forEach((val, index) => {
          if (val.diskon > 0) {
            subTotal[index] = (val.harga * val.qty) - (val.harga * val.qty * (val.diskon / 100))
          } else {
            subTotal[index] = val.harga * val.qty
          }
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
        message: `Apakah Produk:<strong> ${params.produk ? params.produk.nama : 'tanpa nama'}</strong> dengan Qty :<strong> ${params.qty}</strong> akan di hapus?`,
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
    // api related functions
    // get from another pinia file
    // from produk table
    ambilDataProduk() {
      const produk = useProdukTable()
      produk.getDataTable().then((resp) => {
        this.produks = resp
        if (this.produks.length === 1) {
          console.log('produk', this.produks[0])
          this.produkSelected(this.produks[0].id)
        }
      })
    },
    setForm(data) {
      // const store = usePembelianDialog()
      if (data.faktur !== '') {
        this.form.faktur = data.faktur
        this.form.tanggal_faktur = data.tanggal_faktur
      }
      // store.form.total = data.total
      // store.form.jenis = data.jenis
      // store.form.potongan = data.potongan
      // store.form.ongkir = data.ongkir
    },
    getDetailTransaksi(val) {
      this.loading = true
      let slug = ''
      if (val === undefined) {
        slug = routerInstance.currentRoute.value.params.slug
      } else {
        slug = val
      }
      this.params.reff = slug
      const params = { params: this.params }
      const print = usePrintStore()
      print.resetForm()
      return new Promise((resolve, reject) => {
        api
          .get('v1/transaksi/with-detail', params)
          .then((resp) => {
            this.loading = false
            // console.log('pembelian ', resp.data.data[0])
            if (resp.status === 200) {
              if (resp.data.data[0] !== undefined) {
                this.setForm(resp.data.data[0])
                this.rows = resp.data.data[0].detail_transaction
                print.form.nama = this.form.nama
                print.form.reff = this.form.reff
                print.form.faktur = this.form.faktur
                print.form.tanggal_faktur = this.form.tanggal_faktur
                print.produks = this.rows
                this.setTotal()
                this.meta = resp.data.meta
              }
              // this.setColumns(resp.data.data)
              resolve(resp.data.data[0])
            }
          })
          .catch((err) => {
            useSettingStore().transaksiLoading = false
            this.loading = false
            reject(err)
          })
      })
    },
    simpanDetailTransaksi() {
      const store = usePembelianDialog()
      const data = store.form
      const print = usePrintStore()
      print.resetProducts()
      print.setForm('nama', this.form.nama)
      print.setForm('reff', this.form.reff)
      print.setForm('faktur', this.form.faktur)
      data.expired = this.form.expired
      data.product_id = this.form.product_id
      data.harga = olahUang(this.form.harga)
      data.qty = this.form.qty
      data.diskon = this.form.diskon
      data.tanggal = this.form.tanggal + date.formatDate(Date.now(), ' HH:mm:ss')
      data.sub_total = parseFloat(this.form.diskon) > 0 ? (parseFloat(this.form.qty) * olahUang(this.form.harga)) - (parseFloat(this.form.qty) * olahUang(this.form.harga) * (parseFloat(this.form.diskon) / 100)) : olahUang(this.form.qty) * olahUang(this.form.harga)
      if (olahUang(this.form.harga) !== olahUang(this.form.harga_beli)) { data.update_harga = true } else { data.update_harga = false }

      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', data)
          .then((resp) => {
            this.loading = false
            // console.log('save detail ', resp)
            resolve(resp.data.data)
            if (data.update_harga === true) { this.ambilDataProduk() }
            this.getDetailTransaksi()
            this.resetInput()
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
