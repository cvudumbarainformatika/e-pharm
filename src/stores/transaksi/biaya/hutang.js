import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { hurufBesar } from 'src/modules/formatter'
import { daysInMonth, findWithAttr, notifSuccess, uniqueId, waitLoad } from 'src/modules/utils'

export const useBebanTransaksiHutang = defineStore('beban_hutang', {
  state: () => ({
    loading: false,
    form: {
      nama: 'PENGELUARAN'
    },
    items: [],
    bayars: [],
    pembelians: [],
    totalBayar: 0,
    tanggal: { from: '', to: '' },
    tanggalBayar: { from: '', to: '' }
  }),
  actions: {
    // local related function
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
      this.setForm('tanggal_bayar', null)
      this.hutang = null
    },
    resetInput() {
      this.setForm('sub_total', '')
      this.setForm('beban_id', null)
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setNotaBaru() {
      this.form.reff = 'BBN-' + uniqueId()
    },
    gantiTanggal(val) {
      // console.log('ganti tanggal val', val)
      // console.log('ganti tanggal', this.tanggal)
      this.getPembelian()
    },
    gantiTanggalBayar(val) {
      // console.log('ganti tanggal val', val)
      // console.log('ganti tanggal bayar', this.tanggalBayar)
      this.getDibayar()
    },
    setTanggalBayar(val) {
      const skr = Date.now()
      const tmpSkr = new Date(skr)
      const jam = tmpSkr.getHours().toString().length === 1 ? '0' + tmpSkr.getHours().toString() : tmpSkr.getHours().toString()
      const menit = tmpSkr.getMinutes().toString().length === 1 ? '0' + tmpSkr.getMinutes().toString() : tmpSkr.getMinutes().toString()
      const det = tmpSkr.getSeconds().toString().length === 1 ? '0' + tmpSkr.getSeconds().toString() : tmpSkr.getSeconds().toString()
      this.form.tanggal_bayar = val + ' ' + jam + ':' + menit + ':' + det
      console.log('skr', val, jam, menit, det)
      console.log('skr tgl', this.form.tanggal_bayar, jam, menit, det)
    },
    setTanggal() {
      const tgl = Date.now()
      const tmpTgl = new Date(tgl)
      const bulan = tmpTgl.getMonth() + 1
      const tahun = tmpTgl.getFullYear()
      const lastDay = daysInMonth(bulan, tahun)
      // console.log('bulan tahun', bulan, tahun, lastDay)
      const stringBulan = bulan.toString().length === 1 ? '0' + bulan.toString() : bulan.toString()
      const stringTahun = tahun.toString()
      this.tanggal.from = stringTahun + '-' + stringBulan + '-01'
      this.tanggal.to = stringTahun + '-' + stringBulan + '-' + lastDay.toString()
      this.tanggalBayar.from = stringTahun + '-' + stringBulan + '-01'
      this.tanggalBayar.to = stringTahun + '-' + stringBulan + '-' + lastDay.toString()
      // tgl bayar store
      const tmpSkr = new Date(tgl)
      const anu = date.formatDate(tgl, 'YYYY-MM-DD')
      const jam = tmpSkr.getHours().toString().length === 1 ? '0' + tmpSkr.getHours().toString() : tmpSkr.getHours().toString()
      const menit = tmpSkr.getMinutes().toString().length === 1 ? '0' + tmpSkr.getMinutes().toString() : tmpSkr.getMinutes().toString()
      const det = tmpSkr.getSeconds().toString().length === 1 ? '0' + tmpSkr.getSeconds().toString() : tmpSkr.getSeconds().toString()
      this.form.tanggal_bayar = anu + ' ' + jam + ':' + menit + ':' + det
      // console.log('tanggal', this.tanggal)
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
    // api related function
    // ambil data hutang
    getHutang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/hutang/hutang')
          .then((resp) => {
            // console.log('hutnag', resp)
            this.loading = false
            if (resp.status === 200) {
              this.items = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getPembelian() {
      const params = { params: this.tanggal }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/hutang/terbayar', params)
          .then((resp) => {
            // console.log('pembelian', resp)
            this.loading = false
            if (resp.status === 200) {
              this.pembelians = resp.data
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDibayar() {
      const params = { params: this.tanggalBayar }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/hutang/bayar', params)
          .then((resp) => {
            // console.log('dibayar', resp)
            this.loading = false
            if (resp.status === 200) {
              this.bayars = resp.data
              if (resp.data.length) {
                this.totalBayar = this.bayars.map(data => {
                  return data.total
                }).reduce((c, d) => { return c + d })
              }
            }
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      waitLoad('show')
      // this.form.reff = 'BBN-' + uniqueId()
      const data = hurufBesar(this.form.nama)
      this.form.nama = data
      this.setForm('status', 2)
      this.total()
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.form)
          .then((resp) => {
            // console.log('save data', resp)
            notifSuccess(resp)
            this.getHutang()
            this.getDibayar()
            this.getPembelian()
            waitLoad('done')
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
