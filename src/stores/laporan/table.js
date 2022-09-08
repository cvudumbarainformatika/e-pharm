import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useLaporanTable = defineStore('laporan_table', {
  state: () => ({
    loading: false,
    transactions: [],
    products: [],
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
    rows: [],
    columns: [],
    selected: false
  }),
  actions: {
    // local related functions
    setColumns() {
      const kolom = [
        // {
        //   name: 'id',
        //   align: 'center',
        //   label: ' ',
        //   field: (row) => row.id,
        //   format: (val) => `${val}`,
        // },
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
        // {
        //   name: 'tempo',
        //   align: 'left',
        //   label: ' ',
        //   field: (row) => row.tempo,
        //   format: (val) => `${val}`
        // },
        // {
        //   name: 'expired',
        //   align: 'left',
        //   label: ' ',
        //   field: (row) => row.expired,
        //   format: (val) => `${val}`
        // }
      ]
      this.columns = kolom
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
    sorting(data) {
      data.sort((a, b) => {
        const nameA = a.nama
        const nameB = b.nama
        if (nameA < nameB) { return -1 }
        if (nameA > nameB) { return 1 }
        return 0
      })
    },
    setRows() {
      if (this.form.nama === 'PEMBELIAN') { this.pembelian() }
    },
    pembelian() {
      // maping index harga
      const harga = []
      // const produk=[]
      const detailTransaksi = []
      this.transactions.map((transaction) => {
        transaction.detail_transaction.forEach((detail) => {
          detailTransaksi.push(detail)
          harga.push(detail.harga)
        })
        return transaction.detail_transaction
      })
      const fHarga = harga.filter((value, index, self) => {
        return self.indexOf(value) === index
      })

      // console.log('product', this.products)
      detailTransaksi.forEach((data) => {
        const findProduct = this.findWithAttr(
          this.products,
          'id',
          data.product_id
        )
        const findHarga = fHarga.indexOf(data.harga)
        if (this.rows[findHarga] === undefined) {
          this.rows[findHarga] = {
            nama: this.products[findProduct].nama,
            harga: data.harga,
            qty: data.qty,
            total: data.qty * data.harga
          }
        } else {
          this.rows[findHarga].nama = this.products[findProduct].nama
          this.rows[findHarga].harga = data.harga
          this.rows[findHarga].qty += data.qty
          this.rows[findHarga].total += (data.qty * data.harga)
        }
      })
      // sort
      this.sorting(this.rows)
      // this.rows.sort((a, b) => {
      //   const nameA = a.nama
      //   const nameB = b.nama
      //   if (nameA < nameB) { return -1 }
      //   if (nameA > nameB) { return 1 }
      //   return 0
      // })
      console.log('rows  ', this.rows)
    },
    setRows1() {
      const produkBaru = []
      let tambahan = 1 + this.products.length

      this.transactions.map(transaction => {
        this.products.map((produk, index) => {
          transaction.detail_transaction.forEach((detail, i) => {
            if (transaction.nama === 'PEMBELIAN') {
              if (detail.product_id === produk.id && detail.harga === produk.harga_beli) {
                if (produkBaru[index] === undefined) {
                  produkBaru[index] = {
                    nama: produk.nama,
                    harga: detail.harga,
                    qty: detail.qty,
                    total: detail.qty * detail.harga
                  }
                } else {
                  produkBaru[index].nama = produk.nama
                  produkBaru[index].harga = detail.harga
                  produkBaru[index].qty += detail.qty
                  produkBaru[index].total += (detail.qty * detail.harga)
                }
              } else if (detail.product_id === produk.id && detail.harga !== produk.harga_beli) {
                // console.log(' else index', index, 'index detai', i)
                // console.log('produk ', produk.nama)
                // console.log('produk baru', produkBaru[index])
                if (
                  produkBaru[tambahan] !== undefined &&
                  produk.nama === produkBaru[tambahan].nama &&
                  detail.harga === produkBaru[tambahan].harga
                ) {
                  produkBaru[tambahan].qty += detail.qty
                  produkBaru[tambahan].total += detail.qty * detail.harga
                } else if (produkBaru[tambahan] !== undefined) {
                  const index = this.findWithAttr(
                    produkBaru,
                    'harga',
                    detail.harga
                  )
                  console.log('index baru ', index)
                  if (index < produkBaru.length) {
                    tambahan = index
                  } else {
                    tambahan = produkBaru.length + 1
                  }
                }
                if (produkBaru[tambahan] === undefined) {
                  produkBaru[tambahan] = {
                    nama: produk.nama,
                    harga: detail.harga,
                    qty: detail.qty,
                    total: detail.qty * detail.harga
                  }
                } else {
                  produkBaru[tambahan].nama = produk.nama
                  produkBaru[tambahan].harga = detail.harga
                  produkBaru[tambahan].qty += detail.qty
                  produkBaru[tambahan].total += (detail.qty * detail.harga)
                }
              }
            }
          })
          console.log('product baru', produkBaru)
          this.rows = produkBaru
          return produkBaru
        })
        return transaction
      })

      console.log('transactions ', this.transactions)
      console.log('produk ', this.products)
      // const productLength = this.products.length
      // let tambahan = 1

      console.log('rows ', this.rows)

      // this.products.forEach((produk, index) => {
      //   this.transactions.forEach(data => {
      //     if (data.nama === 'PEMBELIAN') {
      //       data.detail_transaction.forEach(detail => {
      //         if (produk.id === detail.product_id) {
      //           if (produk.harga_beli === detail.harga) {
      //             let total = 0
      //             total += (detail.harga * detail.qty)
      //             let qty = 0
      //             qty += detail.qty
      //             this.rows[index] = {
      //               nama: produk.nama,
      //               harga: produk.harga_beli,
      //               qty,
      //               total
      //             }
      //           } else {
      //             if (this.rows[productLength + tambahan - 1] !== undefined && this.rows[productLength + tambahan - 1].harga === produk.harga_beli) {
      //               let total = 0
      //               total += detail.harga * detail.qty
      //               let qty = 0
      //               qty += detail.qty
      //               this.rows[productLength + tambahan - 1] = {
      //                 nama: produk.nama,
      //                 harga: detail.harga,
      //                 qty,
      //                 total
      //               }
      //               console.log(
      //                 'produk tambahan if',
      //                 productLength + tambahan,
      //                 'rows ',
      //                 this.rows[productLength + tambahan - 1]
      //               )
      //             } else {
      //               let total = 0
      //               total += detail.harga * detail.qty
      //               let qty = 0
      //               qty += detail.qty
      //               this.rows[index + tambahan] = {
      //                 nama: produk.nama,
      //                 harga: detail.harga,
      //                 qty,
      //                 total
      //               }
      //               console.log(
      //                 'produk tambahan else',
      //                 productLength + tambahan,
      //                 'rows ',
      //                 this.rows[productLength + tambahan]
      //               )
      //               tambahan += 1
      //             }
      //           }
      //         }
      //       })
      //     }
      //   })
      // })
    },
    // api related functions
    getDataProducts() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/produk/product', params)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              this.products = resp.data.data
              this.meta = resp.data.meta
              resolve(resp.data.data)
              console.log(resp.data)
            }
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataTransactions() {
      this.selected = true
      this.loading = true
      const params = { params: this.form }
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/get-by-date', params)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              this.transactions = resp.data.data
              this.setRows()
              console.log(resp.data)
              resolve(resp.data)
            }
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
