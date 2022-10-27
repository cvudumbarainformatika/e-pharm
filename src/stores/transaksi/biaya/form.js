import { defineStore } from 'pinia'
import { findWithAttr, notifSuccess, uniqueId, waitLoad } from 'src/modules/utils'
import { api } from 'boot/axios'
import { hurufBesar } from 'src/modules/formatter'
import { useSupplierTable } from 'src/stores/master/supplier/table'
import { date } from 'quasar'

export const useBebanTransaksiFormStore = defineStore('beban_transaction_form', {
  state: () => ({
    isOpen: false,
    items: [],
    form: {
      nama: 'PENGELUARAN',
      reff: null,
      total: 0,
      tanggal: null,
      kasir_id: null,
      supplier_id: null,
      status: 1,
      sub_total: 0,
      beban_id: null,
      keterangan: ''
    },
    bebans: [],
    kasirs: [],
    suppliers: [],
    loading: false,
    hutang: null
  }),
  actions: {
    // local related actions
    resetFORM() {
      this.form = {}
      const columns = ['nama']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      this.setForm('nama', 'PENGELUARAN')
      this.setForm('total', 0)
      this.setForm('status', 1)
      this.setForm('kasir_id', null)
      this.setForm('beban_id', null)
      this.setForm('tanggal', null)
      this.hutang = null
    },
    resetInput() {
      this.setForm('sub_total', '')
      this.setForm('beban_id', null)
    },
    setToday() {
      const hari = new Date()
      this.form.tanggal = date.formatDate(hari, 'YYYY-mm-dd H:m:s')
    },
    setForm(nama, val) {
      this.form[nama] = val
    },
    setNotaBaru() {
      this.form.reff = 'BBN-' + uniqueId()
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
    assignForm(data) {
      this.setForm('reff', data.reff)
      this.setForm('nama', data.nama)
      this.setForm('total', data.total)
      this.setForm('kasir_id', data.kasir_id)
    },
    total() {
      const index = findWithAttr(this.items, 'reff', this.form.reff)
      const transaksi = this.items[index]
      if (index >= 0) {
        const bb = findWithAttr(transaksi.beban_transaction, 'beban_id', this.form.beban_id)
        if (bb >= 0) {
          transaksi.beban_transaction[bb].sub_total = this.form.sub_total
        } else {
          const apem = {
            beban_id: this.form.beban_id,
            keterangan: this.form.keterangan,
            sub_total: this.form.sub_total
          }
          transaksi.beban_transaction.push(apem)
        }
        const total = transaksi.beban_transaction.map(data => {
          return data.sub_total
        }).reduce((a, b) => { return a + b })
        this.form.total = total
      } else {
        this.form.total = this.form.sub_total
      }
    },
    cekKasir() {
      const index = findWithAttr(this.items, 'reff', this.form.reff)
      if (index >= 0) {
        const transaksi = this.items[index]
        if (transaksi.kasir_id !== this.form.kasir_id) {
          this.setNotaBaru()
        }
      }
    },
    // api related actions
    getMasterBeban() {
      return new Promise(resolve => {
        api.get('v1/beban/beban')
          .then(resp => {
            this.bebans = resp.data.data
            resolve(resp.data)
          })
      })
    },
    // ambil data supplier
    getDataSupplier() {
      const supp = useSupplierTable()
      supp.getDataTable().then(data => {
        // console.log('supplier ', data)
        this.suppliers = data
      })
    },
    // ambil data ksir
    getDataKasirs() {
      waitLoad('show')
      return new Promise((resolve, reject) => {
        api.get('v1/user/kasir')
          .then(resp => {
            waitLoad('done')
            if (resp.status === 200) {
              // console.log('kasir ', resp.data.data)
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
              // console.log('items ', resp.data.data)
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
    hutangSupplier(val) {
      // console.log('hutang supplier', val)
      this.loading = true
      const params = {
        params: {
          supplier_id: val
        }
      }
      return new Promise((resolve, reject) => {
        api.get('v1/laporan/get-hutang-supplier', params)
          .then(resp => {
            // console.log(resp.data)
            this.loading = false

            const hutang = []
            resp.data.hutang.forEach((data, index) => {
              hutang[index] = data.jml * data.harga
            })
            let dibayar = 0
            if (resp.data.dibayar.length) {
              dibayar = resp.data.dibayar[0].total
            }
            const jmlHutang = hutang.reduce((total, num) => { return total + num })
            this.hutang = resp.data.awal + jmlHutang - dibayar
            // console.log(jmlHutang, 'hutang ', hutang, 'dibayar', dibayar, 'sisa', this.hutang)
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    // ambil data pengeluaran bulan ini
    getPengeluaran() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/transaksi/pengeluaran')
          .then(resp => {
            this.loading = false
            // console.log('pengeluaran', resp.data)
            this.items = resp.data.data
            if (resp.data.data.length) this.assignForm(resp.data.data[0])
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    // tambah
    saveForm() {
      waitLoad('show')
      // this.form.reff = 'BBN-' + uniqueId()
      const data = hurufBesar(this.form.nama)
      this.form.nama = data
      this.setForm('status', 2)
      this.cekKasir()
      this.total()
      // const total = this.form.total === 0 ? olahUang(this.form.sub_total) : olahUang(this.form.total) + olahUang(this.form.sub_total)
      // this.form.total = total
      // this.setForm('total', this.form.sub_total)
      // this.setToday()
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            // console.log('save data', resp)
            notifSuccess(resp)
            // this.getDataBeban()
            this.getPengeluaran()
            // this.resetFORM()
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
