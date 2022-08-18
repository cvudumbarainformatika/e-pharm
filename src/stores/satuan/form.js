import { defineStore } from 'pinia'
import { notifSuccess, waitLoad } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useSatuanStore } from './crud'
import { hurufBesar } from 'src/modules/formatter'
import { Dialog } from 'quasar'
import { useProdukFormStore } from '../produk/form'

export const useSatuanFormStore = defineStore('satuan_form', {
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
      const columns = [
        'nama'

      ]
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
      keys.forEach((key, index) => {
        this.setForm(key, val[key])
      })
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },
    // api related actions
    // tambah dari autocomplete
    addSatuan(val) {
      Dialog.create({
        title: 'Konfirmasi',
        message: `Apakah <strong>Satuan: ${val}</strong> Akan ditambahkan?`,
        cancel: true,
        html: true
        // persistent: true
      })
        .onOk(() => {
          waitLoad('show')
          const produk = useProdukFormStore()
          this.setForm('nama', val)
          this.saveForm().then(() => {
            produk.ambilDataSatuan()
            waitLoad('done')
          }).catch(() => {
            waitLoad('done')
          })
        })
        .onCancel(() => {
          console.log('Cancel')
        })
      console.log('val', val)
    },
    /// ///////////////////////
    // tambah
    saveForm() {
      this.loading = true
      const param = { nama: hurufBesar(this.form.nama) }
      return new Promise((resolve, reject) => {
        api
          .post('v1/satuan/store', param)
          .then((resp) => {
            console.log('save data', resp)
            notifSuccess(resp)
            const table = useSatuanStore()
            table.getSatuan()
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
