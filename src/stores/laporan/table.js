import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useLaporanTransaksiStore } from './transaksi'
import { date } from 'quasar'
// import { filterDuplicateArrays } from 'src/modules/utils'

export const useLaporanTable = defineStore('laporan_table', {
  state: () => ({
    loading: false,
    transactionTypes: [
      { nama: 'produk', label: 'Laporan Berdasakan Produk' },
      { nama: 'transaksi', label: 'Laporan Berdasakan Transaksi' }
    ],
    transactionType: 'produk',
    transactionLabel: 'Laporan Berdasakan Produk',
    transactions: [],
    meta: {},
    form: {
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      nama: '',
      hari: null,
      bulan: null,
      tahun: null
    },
    display: {
      from: date.formatDate(Date.now(), '01 MMMM YYYY'),
      to: date.formatDate(Date.now(), 'DD MMMM YYYY')
    },
    params: {
      from: date.formatDate(Date.now(), 'YYYY-MM-01'),
      to: date.formatDate(Date.now(), 'YYYY-MM-DD'),
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
    namaRetur: '',
    periode: '',
    person: null,
    totalTransaksi: 0,
    totalReturTransaction: { jml: 0, jmlSmw: 0 },
    totalTransaction: { jml: 0, jmlSmw: 0 }
  }),
  actions: {
    // local related functions
    resetData() {
      this.transactions = []
      this.meta = {}
      this.selected = false
      this.periode = ''
      this.person = null
      this.totalTransaksi = null
      this.totalTransaction = null
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
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

      if (this.form.nama === 'PENGELUARAN' || this.form.nama === 'PENDAPATAN') {
        this.columns = kolom
      } else {
        this.columns = kolom2
      }
    },
    setVisibleCol() {
      if (this.form.nama === 'PENGELUARAN' || this.form.nama === 'PENDAPATAN') {
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
      this.totalTransaksi = 0
      this.rows = this.transactions
      if (this.transactions.length) {
        const subTotal = []
        this.transactions.forEach((data, index) => {
          if (data.product_id) {
            subTotal[index] = data.jml * data.harga
          } else {
            subTotal[index] = data.sub_total
          }
        })
        const jumlah = subTotal.reduce((total, num) => {
          return total + num
        })
        this.totalTransaksi = jumlah
      }
    },
    beforeGetData() {
      const transaksi = useLaporanTransaksiStore()
      // console.log('form sebelum if', this.form)
      if (
        this.form.perusahaan_id !== undefined &&
        transaksi.pembelian !== 'supplier' &&
        transaksi.hutang !== 'supplier'
      ) {
        delete this.form.perusahaan_id
        this.person = null
      }
      if (
        this.form.customer_id !== undefined &&
        transaksi.penjualan !== 'customer' &&
        transaksi.piutang !== 'customer'
      ) {
        delete this.form.customer_id
        this.person = null
      }
      if (
        this.form.dokter_id !== undefined &&
        transaksi.penjualan !== 'dokter'
      ) {
        delete this.form.dokter_id
        this.person = null
      }
      if (this.form.umum !== undefined && transaksi.penjualan !== 'umum') {
        delete this.form.umum
      }
      if (this.form.nama === 'PENGELUARAN') {
        this.getDataTransactions('beban')
      } else if (this.form.nama === 'PENDAPATAN') {
        this.getDataTransactions('penerimaan')
      } else {
        this.getDataTransactions('detail-transaksi')
      }
      this.getTotalTransactions()
      this.getTotalReturTransactions()
      transaksi.getDataTransactions()
    },
    // api related functions
    getTotalTransactions() {
      const params = { params: this.form }
      return new Promise(resolve => {
        api.get('v1/laporan/total-by-date', params).then((resp) => {
          if (resp.status === 200) {
            this.totalTransaction = resp.data[0]
            // console.log('total transactions', this.totalTransaction)
            resolve(resp.data)
          }
        })
      })
    },
    getTotalReturTransactions() {
      const params = { params: this.form }
      return new Promise(resolve => {
        api.get('v1/laporan/total-retur-by-date', params).then((resp) => {
          if (resp.status === 200) {
            this.totalReturTransaction = resp.data.data[0]
            this.namaRetur = resp.data.nama
            // console.log('total rtur transactions', resp.data, this.totalReturTransaction)
            resolve(resp.data)
          }
        })
      })
    },
    getDataTransactions(url) {
      this.rows = []
      this.selected = true
      this.loading = true
      const params = { params: this.form }
      // console.log('param', this.form)
      this.setColumns()
      return new Promise((resolve, reject) => {
        api
          .get(`v1/${url}/get-by-date`, params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.transactions = resp.data
              this.setRows()
              // console.log('tr by items', resp)
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    cariDataTransactions(url) {
      this.rows = []
      this.selected = true
      this.loading = true
      const params = { params: this.form }
      // console.log('param', this.form)
      this.setColumns()
      return new Promise((resolve, reject) => {
        api
          .get(`v1/${url}/get-by-date`, params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.transactions = resp.data
              this.rows = this.transactions
              if (this.transactions.length) {
                const subTotal = []
                this.transactions.forEach((data, index) => {
                  if (data.product_id) {
                    subTotal[index] = data.jml * data.harga
                  } else {
                    subTotal[index] = data.sub_total
                  }
                })
                const jumlah = subTotal.reduce((total, num) => {
                  return total + num
                })
                this.totalTransaction.jml = jumlah
              }
              // console.log('tr by items', resp)
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
