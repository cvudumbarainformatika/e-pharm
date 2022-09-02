import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'

export const useHistoryTable = defineStore('history_table', {
  state: () => ({
    dark: false,
    rows: [],
    columns: [],
    meta: {},
    nama: '',
    loading: false,
    selected: false,
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'created_at',
      sort: 'desc'
    }
  }),
  actions: {
    // local related function
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
          align: 'center',
          label: ' ',
          field: (row) => row.status,
          format: (val) => `${val}`

        },
        {
          name: 'total',
          align: 'center',
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
    pilihTransaksi(val) {
      this.selected = true
      this.nama = val.value
      this.params.nama = val.value
      console.log('dipilih ', val)
      this.getDataTransactions()
    },
    // dari icon delete
    clicked(val) {
      console.log(val)
    },
    // dari icon buka
    openTransaction(val) {
      const name = val.row.nama.toLowerCase()
      const slug = val.row.reff
      routerInstance.replace({ name, params: { slug } })
      console.log('open ', val)
    },
    // paginasi
    goTo(val) {
      this.params.page = val
      this.getDataTransactions()
    },
    // api related function

    // ambil data
    getDataTransactions() {
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        this.loading = true
        api.get('v1/transaksi/history', params)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
              console.log('history ', resp.data)
              resolve(resp.data.data)
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
