import { defineStore } from 'pinia'
import { notifSuccess, uniqueId, waitLoad } from 'src/modules/utils'
import { api } from 'boot/axios'
import { hurufBesar, olahUang } from 'src/modules/formatter'

export const useBebanTransaksiFormStore = defineStore('beban_transaction_form', {
  state: () => ({
    isOpen: false,
    items: [],
    form: {
      nama: 'BEBAN',
      reff: null,
      total: 0,
      tanggal: null,
      kasir_id: null,
      status: 0,

      sub_total: 0,
      beban_id: null,
      keterangan: ''
    },
    kasirs: [],
    loading: false
  }),
  actions: {
    // local related actions
    resetFORM() {
      this.form = {}
      const columns = ['nama']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setForm('nama', 'BEBAN')
      this.setForm('reff', null)
      this.setForm('total', 0)
      this.setForm('status', 0)
      this.setForm('tanggal', null)
      this.setForm('kasir_id', null)
      this.setForm('beban_id', null)
      this.setForm('tanggal', null)
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal = formatDb
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
    // ambil data ksir
    getDataKasirs() {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get('v1/user/kasir')
          .then(resp => {
            waitLoad('done')
            if (resp.status === 200) {
              console.log('kasir ', resp.data.data)
              this.kasirs = resp.data.data
              resolve(resp.data.data)
            }
          })
          .catch(err => {
            waitLoad('done')
            reject(err)
          })
      })
    },
    // ambil data Transaksi Beban
    getDataBeban() {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/with-beban')
          .then(resp => {
            waitLoad('done')
            if (resp.status === 200) {
              console.log('items ', resp.data.data)
              this.items = resp.data.data
              resolve(resp.data.data)
            }
          })
          .catch(err => {
            waitLoad('done')
            reject(err)
          })
      })
    },

    // tambah
    saveForm() {
      waitLoad('show')
      this.form.reff = 'BBN-' + uniqueId()
      const data = hurufBesar(this.form.nama)
      this.form.nama = data
      this.setForm('status', 1)
      const total = olahUang(this.form.sub_total)
      this.form.sub_total = total
      this.setForm('total', this.form.sub_total)
      this.setToday()
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            console.log('save data', resp)
            notifSuccess(resp)
            this.getDataBeban()
            this.resetFORM()
            waitLoad('done')
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            waitLoad('done')
            reject(err)
          })
      })
    }
  }
})
