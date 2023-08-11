import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useLaporanTable } from './table'

export const useLaporanTransaksiStore = defineStore('laporan_transaksi_store', {
  state: () => ({
    table: useLaporanTable(),

    pembelians: [
      { nama: 'all', label: 'Semua' },
      { nama: 'supplier', label: 'Pilih Distributor' }
    ],
    pembelian: 'all',
    pembelianL: 'Senua',
    hutangs: [
      { nama: 'all', label: 'Semua' },
      { nama: 'supplier', label: 'Pilih Distributor' }
    ],
    hutang: 'all',
    hutangL: 'Semua',
    penjualans: [
      { nama: 'all', label: 'Semua' },
      { nama: 'dokter', label: 'Berdasarkan Dokter' },
      { nama: 'customer', label: 'Berdasarkan Customer' },
      { nama: 'umum', label: 'Penjualan Umum' }
    ],
    penjualan: 'all',
    penjualanL: 'semua',
    piutangs: [
      { nama: 'all', label: 'Semua' },
      { nama: 'customer', label: 'Berdasarkan Customer' }
    ],
    piutang: 'all',
    piutangL: 'Semua',
    suppliers: [],
    distributors: [],
    dokters: [],
    kasirs: [],
    admins: [],
    form: {},
    loading: false,
    // table
    rows: [],
    columns: [],
    meta: {},
    nama: '',
    title: '',
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    setParams(key, val) {
      this.params[key] = val
    },
    resetForm() {
      this.form = {}
    },
    resetData() {
      this.pembelian = 'all'
      this.pembelianL = 'Senua'
      this.hutang = 'all'
      this.hutangL = 'Semua'
      this.penjualan = 'all'
      this.penjualanL = 'semua'
      this.piutang = 'all'
      this.piutangL = 'Semua'
    },
    setColumns() {
      const kolom = [
        {
          name: 'id',
          align: 'center',
          label: ' ',
          field: (row) => row.id,
          format: (val) => `${val}`,
          required: true
        },
        {
          name: 'transaksi',
          align: 'left',
          label: ' ',
          field: (row) => row.nama,
          format: (val) => `${val}`
        },
        {
          name: 'status',
          align: 'left',
          label: ' ',
          field: (row) => row.status,
          format: (val) => `${val}`
        },
        {
          name: 'total',
          align: 'right',
          label: ' ',
          field: (row) => row.total,
          format: (val) => `${val}`
        },
        {
          name: 'actions',
          align: 'right',
          label: ' ',
          field: (row) => row.nama,
          format: (val) => `${val}`
        }
      ]
      this.columns = kolom
    },
    // paginasi
    goTo(val) {
      this.params.page = val
      this.getDataTransactions()
    },
    // search
    getSearchData() {
      this.params.nama = 'all'
      this.title = null
      this.getDataTransactions().then(() => {
        this.params.q = ''
      })
    },
    // api related function

    getDataTransactions() {
      this.rows = []
      this.selected = true
      this.loading = true
      // console.log('table form', this.table.form)
      // console.log('tr par', this.params)
      const param = Object.assign(this.table.form, this.params)
      const params = { params: param }
      // this.setColumns();
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/get-by-date', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
              // this.setRows()
              // console.log('tr by trans ', resp)
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
