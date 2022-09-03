import { defineStore } from 'pinia'
import { notifSuccess, waitLoad } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useMerkTable } from './table'
import { hurufBesar } from 'src/modules/formatter'
import { Dialog } from 'quasar'
import { useProdukFormStore } from '../produk/form'

export const useMerkFormStore = defineStore('merk_form', {
  state: () => ({
    isOpen: false,
    form: {
      nama: ''
    },
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
      this.setForm('nama', '')
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
      // console.log(keys)
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // api related actions
    // dari autocomplete
    addMerk(val) {
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Merk: ${val}</strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      })
        .onOk(() => {
          waitLoad('show')
          this.setForm('nama', val)
          const produk = useProdukFormStore()
          this.saveForm()
            .then(() => {
              produk.ambilDataMerk()
              waitLoad('done')
            })
            .catch(() => {
              waitLoad('done')
            })
        })
        .onCancel(() => {
          console.log('Cancel')
        })
      // console.log('val kategori', val)
    },
    // -------------------

    // tambah
    saveForm() {
      this.loading = true
      const data = hurufBesar(this.form.nama)
      this.form.nama = data
      return new Promise((resolve, reject) => {
        api
          .post('v1/merk/store', this.form)
          .then((resp) => {
            // console.log('save data', resp)
            notifSuccess(resp)
            const table = useMerkTable()
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
