import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useCustomerTable } from './table'
import { olahUang } from 'src/modules/formatter'

export const useCustomerFormStore = defineStore('customer_form', {
  state: () => ({
    isOpen: false,
    form: {
      nama: null,
      alamat: null,
      perusahaan: null,
      kontak: null,
      saldo_awal_piutang: 0
    },
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM() {
      this.form = {}
      const columns = [
        'nama',
        'alamat',
        'perusahaan',
        'kontak',
        'saldo_awal_piutang'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setForm('saldo_awal_piutang', 0)
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
      const piutang = olahUang(this.form.saldo_awal_piutang)

      this.form.saldo_awal_piutang = piutang
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/customer/store', this.form)
          .then((resp) => {
            // console.log('save data   ', resp)
            notifSuccess(resp)
            const table = useCustomerTable()
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
