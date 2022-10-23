import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr, notifSuccess, uniqueId } from 'src/modules/utils'

export const useTagihanPiutang = defineStore('tagihan_piutang', {
  state: () => ({
    items: [],
    notas: [],
    loading: false,
    form: {
      nama: 'TAGIHAN'
    },
    totalTagihan: 0
  }),
  actions: {
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
    total() {
      const index = findWithAttr(this.items, 'reff', this.form.reff)
      const transaksi = this.items[index]
      if (index >= 0) {
        const bb = findWithAttr(transaksi.penerimaan_transaction, 'penerimaan_id', this.form.penerimaan_id)
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
    // api related function
    getTagihan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/tagihan/piutang')
          .then((resp) => {
            this.loading = false
            console.log('tagihan', resp)
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
    getNotaTagihan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api.get('v1/tagihan/tagihan')
          .then(resp => {
            this.loading = false
            console.log('nota tagihan', resp.data)
            if (resp.status === 200) {
              this.notas = resp.data
              this.form.reff = resp.data[0].reff
              this.totalTagihan = this.notas.map(data => {
                return data.total
              }).reduce((c, d) => { return c + d })
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
    }
  }
})
