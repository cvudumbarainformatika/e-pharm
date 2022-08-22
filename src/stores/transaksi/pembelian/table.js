import { defineStore } from 'pinia'
import { useProdukTable } from 'src/stores/master/produk/table'
import { api } from 'boot/axios'
import { waitLoad } from 'src/modules/utils'

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
      this.form = produk[0]
      this.form.qty = 1
      // console.log('nama ', produk[0])
    },
    onEnter(val) {
      console.log(val)
    },
    clicked(val) {
      // const apem = JSON.stringify(this.selected)
      // const lupis = JSON.parse(apem)
      // const klepon = JSON.Object(this.selected)
      // console.log('apem ', lupis)
      // console.log('selected ', this.selected)
      console.log('val ', val.row)
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

    getDataTable() {
      waitLoad('show')
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/detail-transaksi/index', params)
          .then((resp) => {
            waitLoad('done')
            console.log('pembelian ', resp)
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
              // this.setColumns(resp.data.data)
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            waitLoad('done')
            reject(err)
          })
      })
    }
  }
})
