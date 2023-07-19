import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { daysInMonth, findWithAttr, notifSuccess, uniqueId } from 'src/modules/utils'

export const useTagihanPiutang = defineStore('tagihan_piutang', {
  state: () => ({
    printTagihan: false,
    items: [],
    notas: [],
    dibayars: [],
    loading: false,
    form: {
      nama: 'TAGIHAN'
    },
    totalTagihan: 0,
    totalTerbayar: 0,
    tanggal: { from: '', to: '' }
  }),
  actions: {
    openTagihan() {
      this.printTagihan = true
    },
    closeTagihan() {
      this.printTagihan = false
    },
    setForm(key, val) {
      this.form[key] = val
    },
    resetInput() {
      this.setForm('sub_total', '')
      this.setForm('penerimaan_id', null)
    },
    setNotaBaru() {
      this.form.reff = 'TGH-' + uniqueId()
    },
    gantiTanggal(val) {
      // console.log('ganti tanggal val', val)
      // console.log('ganti tanggal', this.tanggal)
      this.getTerbayar()
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
      // console.log('tanggal', this.tanggal)
    },
    total() {
      const index = findWithAttr(this.notas, 'reff', this.form.reff)
      const transaksi = this.notas[index]
      if (index >= 0) {
        const bb = findWithAttr(transaksi.details, 'nota', this.form.nota)
        if (bb >= 0) {
          transaksi.details[bb].sub_total = this.form.sub_total
        } else {
          const apem = {
            penerimaan_id: this.form.penerimaan_id,
            nota: this.form.nota,
            keterangan: this.form.keterangan,
            sub_total: this.form.sub_total
          }
          transaksi.details.push(apem)
        }
        const total = transaksi.details
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
    // api related function
    getTagihan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/tagihan/piutang')
          .then((resp) => {
            this.loading = false
            // console.log('tagihan', resp)
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
    getTerbayar() {
      this.loading = true
      const params = { params: this.tanggal }
      return new Promise((resolve, reject) => {
        api
          .get('v1/tagihan/tagihan-terbayar', params)
          .then((resp) => {
            this.loading = false
            // console.log('dibayar', resp)
            if (resp.status === 200) {
              this.dibayars = resp.data
              if (this.dibayars.length) {
                this.totalTerbayar = this.dibayars.map(data => {
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
    getNotaTagihan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/tagihan/tagihan')
          .then(resp => {
            this.loading = false
            // console.log('nota tagihan', resp.data)
            if (resp.status === 200) {
              this.notas = resp.data
              if (this.notas.length) {
                this.form.reff = resp.data[0].reff
                this.totalTagihan = this.notas.map(data => {
                  return data.total
                }).reduce((c, d) => { return c + d })
              } else { this.setNotaBaru() }
              // console.log('nota', resp.data.);
            }
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveForm() {
      this.loading = true
      this.total()
      this.setForm('status', 2)
      return new Promise((resolve, reject) => {
        api.post('v1/tagihan/store', this.form)
          .then(resp => {
            this.loading = false
            notifSuccess(resp)
            this.getTagihan()
            this.getNotaTagihan()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    },
    saveDibayar(data) {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.post('v1/tagihan/dibayar', data)
          .then(resp => {
            this.loading = false
            // console.log('dibayar', resp.data)
            notifSuccess(resp)
            this.getTagihan()
            this.getNotaTagihan()
            this.getTerbayar()
            resolve(resp)
          })
          .catch(err => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
