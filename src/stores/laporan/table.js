import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useLaporanTransaksiStore } from './transaksi'
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
    periode: '',
    person: null,
    totalTransaksi: null
  }),
  actions: {
    // local related functions
    resetData() {
      this.transactions = []
      this.meta = {}
      this.form = {}
      this.selected = false
      this.periode = ''
      this.person = null
      this.totalTransaksi = null
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
      // const hutang = []
      //         resp.data.hutang.forEach((data, index) => {
      //           hutang[index] = data.jml * data.harga
      //         })
      //         let dibayar = 0
      //         if (resp.data.dibayar.length) {
      //           dibayar = resp.data.dibayar[0].total
      //         }
      //         const jmlHutang = hutang.reduce((total, num) => { return total + num })
      //         this.hutang = resp.data.awal + jmlHutang - dibayar
      //         console.log(jmlHutang, 'hutang ', hutang, 'dibayar', dibayar, 'sisa', this.hutang)
    },
    beforeGetData() {
      const transaksi = useLaporanTransaksiStore()
      console.log('form sebelum if', this.form)
      if (
        this.form.supplier_id !== undefined &&
        transaksi.pembelian !== 'supplier' &&
        transaksi.hutang !== 'supplier'
      ) {
        delete this.form.supplier_id
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
      console.log('form seseudah if', this.form)
      if (this.form.nama === 'BEBAN') {
        this.getDataTransactions('beban')
      } else if (this.form.nama === 'PENERIMAAN') {
        this.getDataTransactions('penerimaan')
      } else {
        this.getDataTransactions('detail-transaksi')
      }
    },
    // api related functions
    getDataTransactions(url) {
      this.rows = []
      this.selected = true
      this.loading = true
      const params = { params: this.form }
      this.setColumns()
      return new Promise((resolve, reject) => {
        api
          .get(`v1/${url}/get-by-date`, params)
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
