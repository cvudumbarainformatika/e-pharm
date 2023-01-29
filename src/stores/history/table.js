import { defineStore } from 'pinia'
import { Dialog } from 'quasar'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'

export const useHistoryTable = defineStore('history_table', {
  state: () => ({
    tableMenu: false,
    dark: false,
    rows: [],
    columns: [],
    meta: {},
    nama: '',
    title: '',
    loading: false,
    selected: false,
    params: {
      q: '',
      page: 1,
      per_page: 5,
      order_by: 'tanggal',
      sort: 'desc'
    }
  }),
  actions: {
    // local related function
    menuOpen() {
      this.tableMenu = true
    },
    menuClose() {
      this.tableMenu = false
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
    setParams(key, val) {
      this.params[key] = val
    },
    pilihTransaksi(val) {
      const namaRoute = routerInstance.currentRoute.value.name
      if (namaRoute !== 'history') {
        routerInstance.push('/history')
      }
      this.selected = true
      this.nama = val.value
      this.title = val.name
      this.params.nama = val.value
      // console.log('dipilih ', val)
      this.getDataTransactions()
    },
    // dari icon delete
    clicked(val) {
      // const params = val.row
      // Dialog.create({
      //   title: 'Konfirmasi',
      //   message: `Apakah Transaksi :<strong> ${params.nama.toLowerCase()}</strong> dengan nomor Nota :<strong> ${params.reff}</strong> akan di hapus?`,
      //   cancel: true,
      //   html: true
      // })
      //   .onOk(() => {
      //     this.rows = []
      //     this.deleteTransaction(params)
      //   })
      //   .onCancel(() => {
      //     // console.log('cancel')
      //   })
      console.log(val)
    },
    // dari icon buka
    openTransaction(val) {
      const name = val.row.nama.toLowerCase()
      const slug = val.row.reff
      routerInstance.replace({ name, params: { slug } })
      // console.log('open ', val)
    },
    // paginasi
    goTo(val) {
      this.params.page = val
      this.getDataTransactions()
    },
    // cari nama
    cariDraft(val) {

    },
    // search
    getSearchData() {
      this.params.nama = 'all'
      this.params.page = 1
      this.title = null
      this.getDataTransactions().then(() => {
        this.params.q = ''
      })
    },
    // hapus draft
    deleteDraft(val) {
      // console.log(val)
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah Semua Draft Transaksi :<strong> ${this.title}</strong> akan di hapus?`,
        cancel: true,
        html: true
      })
        .onOk(() => {
          this.rows = []
          const params = { params: this.params }
          this.deleteDraftTransaction(params)
        })
        .onCancel(() => {
          // console.log('cancel')
        })
    },
    // api related function

    // ambil data
    getDataTransactions() {
      this.rows = []
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        this.loading = true
        api.get('v1/transaksi/history', params)
          .then(resp => {
            this.loading = false
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
              // console.log('history ', resp.data)
              resolve(resp.data.data)
            }
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    deleteTransaction(params) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/transaksi/destroy', params)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTransactions()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    deleteDraftTransaction(params) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/destroy-draft', params)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getDataTransactions()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
