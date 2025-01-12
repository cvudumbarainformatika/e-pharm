import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useCustomerTable = defineStore('customer_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: ['id', 'uuid', 'created_at', 'updated_at']
  }),
  getters: {
    getterColumns(state) {
      return state.columns?.filter((el) => !state?.columnHide.includes(el))
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

    // api related function

    // ambil
    getDataTable(val) {
      this.loading = !val
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/customer/index', params)
          .then((resp) => {
            this.loading = false
            // console.log(resp)
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
          .post('v1/customer/destroy', params)
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
