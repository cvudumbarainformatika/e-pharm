import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { filterDuplicateArrays } from 'src/modules/utils'

export const useLaporanTable = defineStore('laporan_table', {
  state: () => ({
    loading: false,
    transactionTypes: [
      { nama: 'produk', label: 'Laporan Berdasakan Obat' },
      { nama: 'transaksi', label: 'Laporan Berdasakan Transaksi' }
    ],
    transactionType: 'produk',
    transactions: [],
    products: [],
    bebans: [],
    penerimaans: [],
    meta: {},
    form: {
      date: null,
      to: null,
      from: null,
      nama: '',
      hari: null,
      bulan: null,
      tahun: null
    },
    params: {
      page: 1,
      per_page: 10
    },
    reseps: [],
    umums: [],
    dists: [],
    rows: [],
    columns: [],
    selected: false,
    penjualanType: 'umum',
    periode: ''
  }),
  actions: {
    // local related functions
    setColumns() {
      const kolom = [
        {
          name: 'nama',
          align: 'left',
          label: 'Nama ',
          field: (row) => row.nama,
          format: (val) => `${val}`,
          required: true
        },
        {
          name: 'total',
          align: 'right',
          label: ' Total',
          field: (row) => row.total,
          format: (val) => `${val}`
        }
      ]
      const kolom2 = [
        {
          name: 'nama',
          align: 'left',
          label: 'Nama ',
          field: (row) => row.nama,
          format: (val) => `${val}`,
          required: true
        },
        {
          name: 'harga',
          align: 'right',
          label: ' Harga ',
          field: (row) => row.harga,
          format: (val) => `${val}`
        },
        {
          name: 'qty',
          align: 'left',
          label: 'Jumlah ',
          field: (row) => row.qty,
          format: (val) => `${val}`
        },
        {
          name: 'total',
          align: 'right',
          label: ' Total',
          field: (row) => row.total,
          format: (val) => `${val}`
        }
      ]

      if (this.form.nama === 'BEBAN' || this.form.nama === 'PENERIMAAN') {
        this.columns = kolom
      } else {
        this.columns = kolom2
      }
    },
    setVisibleCol() {
      if (this.form.nama === 'BEBAN' || this.form.nama === 'PPENERIMAAN') {
        this.visibleColumns = ['nama', 'keterangan', 'qty', 'harga', 'total']
      } else {
        this.visibleColumns = ['nama', 'qty', 'harga', 'total']
      }
    },
    goTo(val) {
      this.params.page = val
      this.getDataProducts()
    },
    findWithAttr(array, attr, value) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    },
    findWithTwoAttr(array, attr, value, attr2, value2) {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value && array[i][attr2] === value2) {
          return i
        }
      }
      return -1
    },
    sorting(data) {
      data.sort((a, b) => {
        const nameA = a.nama
        const nameB = b.nama
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    },
    setRows() {
      if (this.form.nama === 'PEMBELIAN') {
        this.pembelian()
      } else if (this.form.nama === 'PENJUALAN') {
        this.penjualan()
      } else if (this.form.nama === 'RETUR PEMBELIAN') {
        this.pembelian()
      } else if (this.form.nama === 'RETUR PENJUALAN') {
        this.pembelian()
      } else if (this.form.nama === 'BEBAN') {
        this.beban()
      } else if (this.form.nama === 'PENERIMAAN') {
        this.penerimaan()
      }
    },
    beban() {
      this.transactions.forEach(transaction => {
        // nama keterangan supplier total
        const indexBeban = this.findWithAttr(this.bebans, 'id', transaction.beban_transaction[0].beban_id)
        console.log('transaction ', transaction)
        console.log('index ', indexBeban)
        console.log('bebans_id ', transaction.beban_transaction.beban_id)
        if (this.rows[indexBeban] === undefined) {
          this.rows[indexBeban] = {
            nama: this.bebans[indexBeban].nama,
            total: transaction.total
          }
        } else {
          this.rows[indexBeban].total += transaction.total
        }
        console.log('beban ', transaction)
        // return transaction
      })
      // console.log('beban ', this.rows)
    },
    penerimaan() {
      this.transactions.forEach(transaction => {
        const indexPenerimaan = this.findWithAttr(this.penerimaans, 'id', transaction.penerimaan_transaction[0].penerimaan_id)
        console.log('index ', indexPenerimaan)
        console.log('penerimaan_id ', transaction.penerimaan_transaction.penerimaan_id)
        if (this.rows[indexPenerimaan] === undefined) {
          this.rows[indexPenerimaan] = {
            nama: this.penerimaans[indexPenerimaan].nama,
            total: transaction.total
          }
        } else {
          this.rows[indexPenerimaan].total += transaction.total
        }
        console.log('penerimann ', this.rows)
        // return transaction
      })
    },
    penjualan() {
      this.rows = this.transactions
      // const umum = []
      // const resep = []
      // const dist = []
      // const detailTransaksi = []
      // this.transactions.map((transaction) => {
      //   transaction.detail_transaction.forEach((data) => {
      //     if (transaction.dokter_id !== null) {
      //       const detail = { type: 'resep', detail: data }
      //       detailTransaksi.push(detail)
      //       resep.push(data.harga)
      //     } else if (transaction.customer_id !== null) {
      //       const detail = { type: 'dist', detail: data }
      //       detailTransaksi.push(detail)
      //       dist.push(data.harga)
      //     } else {
      //       const detail = { type: 'umum', detail: data }
      //       detailTransaksi.push(detail)
      //       umum.push(data.harga)
      //     }
      //     console.log(data)
      //   })
      //   return transaction
      // })
      // // filter duplicate array
      // const fResep = filterDuplicateArrays(resep)
      // const fDist = filterDuplicateArrays(dist)
      // const fUmum = filterDuplicateArrays(umum)
      // // input harga pada masing-masing array harga
      // detailTransaksi.forEach((data) => {
      //   const findProduct = this.findWithAttr(
      //     this.products,
      //     'id',
      //     data.detail.product_id
      //   )

      //   if (data.type === 'resep') {
      //     const findHarga = fResep.indexOf(data.detail.harga)
      //     this.reseps[findHarga] = this.setRowData(
      //       findHarga,
      //       findProduct,
      //       data.detail,
      //       this.reseps
      //     )
      //   }
      //   if (data.type === 'dist') {
      //     const findHarga = fDist.indexOf(data.detail.harga)
      //     this.dists[findHarga] = this.setRowData(
      //       findHarga,
      //       findProduct,
      //       data.detail,
      //       this.dists
      //     )
      //   }
      //   if (data.type === 'umum') {
      //     const findHarga = fUmum.indexOf(data.detail.harga)
      //     this.umums[findHarga] = this.setRowData(
      //       findHarga,
      //       findProduct,
      //       data.detail,
      //       this.umums
      //     )
      //   }
      //   // console.log('find product ', findProduct)
      // })
      // this.setPenjualan()
    },
    pembelian() {
      this.rows = this.transactions
      // // maping index harga
      // const harga = []
      // // const produk=[]
      // const detailTransaksi = []
      // this.transactions.map((transaction) => {
      //   transaction.detail_transaction.forEach((detail) => {
      //     detailTransaksi.push(detail)
      //     harga.push(detail.harga)
      //   })
      //   return transaction.detail_transaction
      // })
      // // filter duplikat harga
      // const fHarga = filterDuplicateArrays(harga)
      // // ambil data, masukkan sesuai harga beli atau harga beli yang sudah naik / turun
      // detailTransaksi.forEach((data) => {
      //   const findProduct = this.findWithAttr(
      //     this.products,
      //     'id',
      //     data.product_id
      //   )
      //   const findHarga = fHarga.indexOf(data.harga)
      //   this.rows[findHarga] = this.setRowData(
      //     findHarga,
      //     findProduct,
      //     data,
      //     this.rows
      //   )
      // })
      // // sort
      // this.sorting(this.rows)
    },
    setRowData(indexHarga, indexProduct, data, targetArray) {
      const toRow = []
      toRow[indexHarga] = targetArray[indexHarga]
      if (toRow[indexHarga] === undefined) {
        toRow[indexHarga] = {
          nama: this.products[indexProduct].nama,
          harga: data.harga,
          qty: data.qty,
          total: data.qty * data.harga
        }
      } else {
        toRow[indexHarga].nama = this.products[indexProduct].nama
        toRow[indexHarga].harga = data.harga
        toRow[indexHarga].qty += data.qty
        toRow[indexHarga].total += data.qty * data.harga
      }
      return toRow[indexHarga]
    },
    setPenjualan(val) {
      switch (val) {
        case 'umum':
          this.rows = this.umums
          break
        case 'dist':
          this.rows = this.dists
          break
        case 'resep':
          this.rows = this.reseps
          break

        default:
          this.rows = this.umums
          break
      }
      // sort
      this.sorting(this.rows)
    },
    // api related functions
    getDataProducts() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/produk/product', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.products = resp.data.data
              this.meta = resp.data.meta
              resolve(resp.data.data)
              console.log(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataBebans() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/beban/beban', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.bebans = resp.data.data
              this.meta = resp.data.meta
              resolve(resp.data.data)
              console.log(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataPenerimaans() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/penerimaan/penerimaan', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.penerimaans = resp.data.data
              this.meta = resp.data.meta
              resolve(resp.data.data)
              console.log(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDetailTransactions() {
      this.rows = []
      this.selected = true
      this.loading = true
      const params = { params: this.form }
      this.setColumns()
      return new Promise((resolve, reject) => {
        api
          .get('v1/detail-transaksi/get-by-date', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.transactions = resp.data
              this.setRows()
              console.log(resp)
              resolve(resp.data)
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
