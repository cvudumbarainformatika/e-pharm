import { defineStore } from 'pinia'
import { findWithAttr, notifSuccess, uniqueId, waitLoad } from 'src/modules/utils'
import { api } from 'boot/axios'
import { hurufBesar } from 'src/modules/formatter'
import { useCustomerTable } from 'src/stores/master/customer/table'

export const usePenerimaanTransaksiFormStore = defineStore(
  'penerimaan_transaction_form',
  {
    state: () => ({
      isOpen: false,
      items: [],
      form: {
        nama: 'PENDAPATAN',
        reff: null,
        total: 0,
        tanggal: null,
        kasir_id: null,
        status: 1,

        sub_total: 0,
        penerimaan_id: null,
        keterangan: ''
      },
      kasirs: [],
      penerimaans: [],
      customers: [],
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
        this.setForm('nama', 'PENDAPATAN')
        this.setForm('reff', null)
        this.setForm('total', 0)
        this.setForm('status', 1)
        this.setForm('tanggal', null)
        this.setForm('kasir_id', null)
        this.setForm('penerimaan_id', null)
        this.setForm('tanggal', null)
        this.hutang = null
      },
      resetInput() {
        this.setForm('sub_total', '')
        this.setForm('penerimaan_id', null)
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
      setNotaBaru() {
        this.form.reff = 'TRM-' + uniqueId()
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
          const bb = findWithAttr(
            transaksi.penerimaan_transaction,
            'penerimaan_id',
            this.form.penerimaan_id
          )
          if (bb >= 0) {
            transaksi.penerimaan_transaction[bb].sub_total = this.form.sub_total
          } else {
            const apem = {
              penerimaan_id: this.form.penerimaan_id,
              keterangan: this.form.keterangan,
              sub_total: this.form.sub_total
            }
            transaksi.penerimaan_transaction.push(apem)
          }
          const total = transaksi.penerimaan_transaction
            .map((data) => {
              return data.sub_total
            })
            .reduce((a, b) => {
              return a + b
            })
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
      // ambil data customer
      getDataDistributor() {
        const dist = useCustomerTable()
        dist.getDataTable().then((data) => {
          // console.log('distibutor ', data)
          this.customers = data
        })
      },
      // ambil data kasir
      getDataKasirs() {
        waitLoad('show')
        return new Promise((resolve, reject) => {
          api
            .get('v1/user/kasir')
            .then((resp) => {
              waitLoad('done')
              if (resp.status === 200) {
                // console.log('kasir ', resp.data.data)
                this.kasirs = resp.data.data
                resolve(resp.data.data)
              }
            })
            .catch((err) => {
              waitLoad('done')
              reject(err)
            })
        })
      },
      getMasterPenerimaan() {
        return new Promise((resolve) => {
          api.get('v1/penerimaan/penerimaan').then((resp) => {
            console.log('master penerimaan', resp.data)
            this.penerimaans = resp.data.data
            resolve(resp.data)
          })
        })
      },
      // ambil data Transaksi Penerimaan
      getDataPenerimaan() {
        waitLoad('show')
        return new Promise((resolve, reject) => {
          api
            .get('v1/transaksi/with-penerimaan')
            .then((resp) => {
              waitLoad('done')
              if (resp.status === 200) {
                // console.log('items ', resp.data.data)
                this.items = resp.data.data
                resolve(resp.data.data)
              }
            })
            .catch((err) => {
              waitLoad('done')
              reject(err)
            })
        })
      }, // ambil data pengeluaran bulan ini
      getPenerimaan() {
        this.loading = true
        return new Promise((resolve, reject) => {
          api
            .get('v1/transaksi/penerimaan')
            .then((resp) => {
              this.loading = false
              console.log('penerimaan', resp.data)
              this.items = resp.data.data
              if (resp.data.data.length) this.assignForm(resp.data.data[0])
              resolve(resp)
            })
            .catch((err) => {
              this.loading = false
              reject(err)
            })
        })
      },
      piutangDistributor(val) {
        // console.log('piutang distributor', val)
        this.loading = true
        const params = {
          params: {
            customer_id: val
          }
        }
        return new Promise((resolve, reject) => {
          api
            .get('v1/laporan/get-piutang-customer', params)
            .then((resp) => {
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
              const jmlHutang = hutang.reduce((total, num) => {
                return total + num
              })
              this.hutang = resp.data.awal + jmlHutang - dibayar
              // console.log(jmlHutang, 'hutang ', hutang, 'dibayar', dibayar, 'sisa', this.hutang)
              resolve(resp)
            })
            .catch((err) => {
              this.loading = false
              reject(err)
            })
        })
      },

      // tambah
      saveForm() {
        waitLoad('show')
        // this.form.reff = "TRM-" + uniqueId();
        const data = hurufBesar(this.form.nama)
        this.form.nama = data
        this.setForm('status', 2)
        // const total = olahUang(this.form.sub_total);
        // this.form.sub_total = total;
        // this.setForm("total", this.form.sub_total);
        this.cekKasir()
        this.total()
        // this.setToday();
        return new Promise((resolve, reject) => {
          api
            .post('v1/transaksi/store', this.form)
            .then((resp) => {
              // console.log('save data', resp)
              notifSuccess(resp)
              this.getPenerimaan()
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
  }
)
