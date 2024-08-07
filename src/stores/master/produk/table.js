import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useProdukTable = defineStore('produk_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      rak_id: null,
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id',
      'uuid',
      'ada',
      'created_at',
      'satuan_besar_id',
      'harga_jual_resep',
      'harga_jual_cust',
      'harga_jual_prem',
      'limit_stok',
      'stok',
      'pengali',
      'satuanBesar',
      'satuan_id',
      'merk_id',
      'rak_id',
      'kategori_id',
      'updated_at'
    ]
  }),
  getters: {
    getterColumns(state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    // local table related function
    setSearch(val) {
      this.params.q = val
      this.params.page = 1
      this.getDataTable()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getDataTable()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    rakSelected(val) {
      // console.log('selected', val)
      // console.log('params selected', this.params)
      this.params.rak_id = val
      this.params.page = 1
      if (!val) {
        this.params.per_page = 10
      } else {
        this.params.per_page = 1000
      }
      this.getDataTable()
    },
    rakCleared() {
      // console.log('params cleared', this.params)
    },
    // api related function

    // ambil
    getDataTable(val) {
      this.loading = !val
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/produk/index', params)
          .then((resp) => {
            this.loading = false
            // console.log('Produk ', resp.data)
            if (resp.status === 200) {
              this.items = resp.data.data
              this.meta = resp.data.meta
              this.setColumns(resp.data.data)
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // delete
    deletesData(payload) {
      this.loading = true
      const params = { id: payload }
      return new Promise((resolve, reject) => {
        api
          .post('v1/produk/destroy', params)
          .then((resp) => {
            // console.log(resp)
            notifSuccess(resp)
            this.loading = false
            this.getDataTable()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
