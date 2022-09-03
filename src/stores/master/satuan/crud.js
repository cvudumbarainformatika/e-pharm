import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notifSuccess, waitLoad } from 'src/modules/utils'

export const useSatuanStore = defineStore('satuan', {
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
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },
  actions: {
    // local table related function
    setSearch(val) {
      this.params.q = val
      this.getSatuan()
    },
    setOder(payload) {
      this.params.order_by = payload
      this.params.sort === 'desc'
        ? (this.params.sort = 'asc')
        : (this.params.sort = 'desc')
      this.getSatuan()
    },
    setPage(payload) {
      // console.log('setPage', payload)
      this.params.page = payload
      this.getSatuan()
    },
    setPerPage(payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getSatuan()
    },
    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getSatuan()
    },

    // api related function

    // ambil
    getSatuan() {
      waitLoad('show')
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api
          .get('v1/satuan/index', params)
          .then((resp) => {
            waitLoad('done')
            // console.log(resp)
            if (resp.status === 200) {
              this.items = resp.data.data
              this.meta = resp.data.meta
              this.setColumns(resp.data.data)
              resolve(resp.data.data)
            }
          })
          .catch((err) => {
            // console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    },
    // delete
    deletesData(payload) {
      waitLoad('show')
      const params = { id: payload }
      return new Promise((resolve, reject) => {
        api
          .post('v1/satuan/destroy', params)
          .then((resp) => {
            // console.log(resp)
            notifSuccess(resp)
            waitLoad('done')
            this.getSatuan()
            resolve(resp)
          })
          .catch((err) => {
            // console.log(err)
            waitLoad('done')
            reject(err)
          })
      })
    }
  }
})
