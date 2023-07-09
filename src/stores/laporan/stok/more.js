import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifCenterVue } from 'src/modules/utils'

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
    produk: {},
    columns: [],
    columnHide: [
      'id',
      'uuid',
      'transaction_id',
      'transaction',
      'nama',
      'harga',
      'diskon',
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
      // const thumb = payload.map((x) => Object.keys(x))
      this.columns = ['nama', 'tanggal', 'transaksi', 'masuk', 'keluar', 'sisa']
      // this.columns = thumb[0]
      // changeArrayIndex(this.columns, 'qty', 'tanggal')
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
      const data = payload.data
      data.forEach(anu => {
        anu.transaksi = anu.transaction.nama
        anu.nama = this.produk.nama
        anu.tanggal = anu.transaction.tanggal
        anu.sisa = 0
        anu.masuk = anu.transaction.nama === 'PEMBELIAN' || anu.transaction.nama === 'RETUR PENJUALAN' || (anu.transaction.nama === 'FORM PENYESUAIAN' && anu.qty > 0) ? anu.qty : 0
        anu.keluar = anu.transaction.nama === 'PENJUALAN' || anu.transaction.nama === 'RETUR PEMBELIAN' ? anu.qty : ((anu.transaction.nama === 'FORM PENYESUAIAN') ? (anu.qty < 0 ? -anu.qty : anu.qty) : 0)
      })
      // console.log('see more ', payload.data)
      console.log('see Produk ', this.produk)
      if (!this.params.selection) {
        data.push({
          tanggal: this.produk.created_at ? date.formatDate(this.produk.created_at, 'YYYY-MM-DD HH:mm:ss') : date.formatDate(Date.now(), 'YYYY-MM-01 00:00:00'),
          transaksi: 'Stok Awal',
          qty: this.produk.stok_awal,
          masuk: this.produk.stok_awal,
          sisa: this.produk.stok_awal,
          nama: this.produk.nama
        })
      } else if (this.params.selection === 'tilltoday') {
        data.push({
          tanggal: this.produk.created_at ? date.formatDate(this.produk.created_at, 'YYYY-MM-DD HH:mm:ss') : date.formatDate(Date.now(), 'YYYY-MM-01 00:00:00'),
          transaksi: 'Stok Awal',
          qty: this.produk.stok_awal,
          masuk: this.produk.stok_awal,
          sisa: this.produk.stok_awal,
          nama: this.produk.nama
        })
      } else {
        data.push({
          tanggal: this.params.from ? date.formatDate(this.params.from, 'YYYY-MM-01 00:00:00') : date.formatDate(Date.now(), 'YYYY-MM-01 00:00:00'),
          transaksi: 'Stok Awal',
          qty: this.produk.stok_awal,
          masuk: this.produk.stok_awal,
          sisa: this.produk.stok_awal,
          nama: this.produk.nama
        })
      }
      data.sort((a, b) => {
        const da = new Date(a.tanggal), db = new Date(b.tanggal)
        return da - db
      })
      data.forEach((anu, index) => {
        if (index > 0) {
          anu.sisa = data[index - 1].sisa + anu.masuk - anu.keluar
        }
      })
      this.setColumns(data)
      this.items = data
      // const transaksi = payload.data
      // const temp = transaksi.map(produk => {
      //   const apem = produk.detail_transaction.filter((details) => {
      //     return details.product_id === this.params.id
      //   })
      //   apem[0].transaksi = produk.nama
      //   apem[0].Jenis = produk.jenis
      //   apem[0].nama = this.params.nama
      //   apem[0].tanggal = produk.tanggal
      //   return apem[0]
      // })
      // const meta = payload
      // delete meta.data

      // this.setColumns(temp)
      // this.items = temp
      // this.meta = meta
      // console.log('items', this.items)
      // console.log('temp', temp)
      // console.log('transaksi', transaksi)
      // console.log('meta', this.meta)
    },

    // api related function
    // get more details data
    getDetailsDataProduct() {
      console.log('params', this.params)
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/stok-transaction', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              console.log('more', resp.data)
              this.dataProses(resp)
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
