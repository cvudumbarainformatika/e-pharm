import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { changeArrayIndex, notifCenterVue } from 'src/modules/utils'

export const useLaporanMoreProduct = defineStore('laporan_details_product', {
  state: () => ({
    items: [],
    isOpen: false,
    meta: {},
    loading: false,
    params: {
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: [
      'id',
      'uuid',
      'transaction_id',
      'nama',
      'harga',
      'expired',
      'sub_total',
      'created_at',
      'updated_at'
    ]
  }),
  actions: {
    setOpen() {
      this.isOpen = !this.isOpen
    },
    setParams(key, val) {
      this.params[key] = val
      // console.log('setParams', key, val)
    },
    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      changeArrayIndex(this.columns, 'qty', 'tanggal')
    },
    setPage(payload) {
      this.params.page = payload
      this.getDetailsDataProduct()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.getDetailsDataProduct()
    },
    dataProses(payload) {
      if (!payload.data.length) {
        notifCenterVue(`tidak ada data di halaman ${this.params.page}`)
        this.items = []
        return
      }
      const transaksi = payload.data
      const temp = transaksi.map(produk => {
        const apem = produk.detail_transaction.filter((details) => {
          return details.product_id === this.params.id
        })
        apem[0].transaksi = produk.nama
        apem[0].Jenis = produk.jenis
        apem[0].nama = this.params.nama
        apem[0].tanggal = produk.tanggal
        return apem[0]
      })
      const meta = payload
      delete meta.data

      this.setColumns(temp)
      this.items = temp
      this.meta = meta
      // console.log('items', this.items)
      // console.log('temp', temp)
      // console.log('transaksi', transaksi)
      // console.log('meta', this.meta)
    },

    // api related function
    // get more details data
    getDetailsDataProduct() {
      // console.log('params', this.params)
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/stok-transaction', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              // console.log('more', resp.data)
              this.dataProses(resp.data)
              resolve(resp)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
