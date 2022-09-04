import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useReturMenu = defineStore('retur_menu', {
  state: () => ({
    rows: [],
    meta: {},
    params: {
      q: '',
      order_by: 'created_at',
      sort: 'desc',
      page: 1,
      per_page: 5
    },
    loading: false,
    columns: []
  }),
  actions: {
    // local related functions
    setColumn() {
      const kolom = [
        {
          name: 'id',
          align: 'left',
          label: '#',
          field: (row) => row.id,
          format: (val) => `${val}`,
          required: true
        },
        {
          name: 'reff',
          align: 'left',
          label: 'Nota',
          field: (row) => row.reff
        },
        {
          name: 'faktur',
          align: 'left',
          label: 'Faktur',
          field: (row) => row.faktur
        },
        {
          name: 'jenis',
          align: 'left',
          label: 'Jenis',
          field: (row) => row.jenis
        },
        {
          name: 'kasir',
          align: 'left',
          label: 'Kasir',
          field: (row) => (row.kasir === null ? '-' : row.kasir.name)
        },
        {
          name: 'supplier',
          align: 'left',
          label: 'Supplier',
          field: (row) => (row.supplier === null ? '-' : row.supplier.nama)
        },
        {
          name: 'tempo',
          align: 'left',
          label: 'Tempo',
          field: (row) => row.tempo
        },
        {
          name: 'potongan',
          align: 'right',
          label: 'Potongan',
          field: (row) => row.potongan,
          format: (val) => `${val}`
        },
        {
          name: 'ongkir',
          align: 'right',
          label: 'Ongkir',
          field: (row) => row.ongkir,
          format: (val) => `${val}`
        },
        {
          name: 'total',
          align: 'right',
          label: 'Sub Total',
          field: (row) => row.total,
          format: (val) => `${val}`
        },
        {
          name: 'total semua',
          align: 'right',
          label: 'Total',
          field: (row) => row.total + row.ongkir - row.potongan,
          format: (val) => `${val}`
        }
      ]

      this.columns = kolom
    },
    clicked(val) {
      console.log(val)
    },
    // api related functions
    getDataTransaction() {
      this.loading = true
      const params = { params: this.params }
      return new Promise((resolve, reject) => {
        api.get('v1/retur/pembelian', params)
          .then(resp => {
            console.log('retur', resp.data.data)
            this.loading = false
            if (resp.status === 200) {
              this.rows = resp.data.data
              this.meta = resp.data.meta
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
