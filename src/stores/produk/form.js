import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useProdukTable } from './table'

export const useProdukFormStore = defineStore('produk_form', {
  state: () => ({
    isOpen: false,
    form: {
      barcode: '',
      nama: '',
      merk: '',
      satuan_id: null,
      harga_beli: 0,
      harga_jual_umum: 0,
      harga_jual_resep: 0,
      harga_jual_cust: 0,
      stok_awal: 0,
      rak_id: null,
      kategori_id: null
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM() {
      this.form = {}
      const columns = [
        'barcode',
        'nama',
        'merk',
        'satuan_id',
        'harga_beli',
        'harga_jual_umum',
        'harga_jual_resep',
        'harga_jual_cust',
        'stok_awal',
        'rak_id',
        'kategori_id'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      // this.setForm("saldo_awal_hutang", 0);
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
    },
    setForm(nama, val) {
      this.form[nama] = val
    },
    setOpen() {
      this.isOpen = !this.isOpen
    },
    newData() {
      this.resetFORM()
      this.edited = false
      this.isOpen = !this.isOpen
    },
    editData(val) {
      this.edited = true
      const keys = Object.keys(val)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // api related actions

    // tambah
    saveForm() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/produk/store', this.form)
          .then((resp) => {
            console.log('save data', resp)
            notifSuccess(resp)
            const table = useProdukTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
