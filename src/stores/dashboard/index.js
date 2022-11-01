import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr } from 'src/modules/utils'

export const useDashboardStore = defineStore('dashboard_store', {
  state: () => ({
    loading: false,
    hutangs: [],
    rank: {
      monthly: []
    },
    tagihans: [],
    produks: [],
    monthly: [],
    monthlyAll: [],
    weekly: [],
    weeklyAll: [],
    dayly: [],
    daylyAll: [],
    series: [],
    series7: []
  }),
  actions: {
    // local related function
    monthlyMap() {
      console.log(Object.keys(this.rank))
      if (Object.keys(this.rank.monthly).length) {
        this.series = this.rank.monthly.series_sub_total
      }
      if (Object.keys(this.rank.lastSevenDays).length) {
        this.series7 = this.rank.lastSevenDays.series_sub_total
      }
      if (this.produks.length) {
        if (this.rank.monthly.prod.length) {
          this.monthlyAll = this.rank.monthly.prod.map((data) => {
            const index = findWithAttr(this.produks, 'id', data.id)
            const cash = findWithAttr(this.rank.monthlyCash.prod, 'id', data.id)
            return {
              id: data.id,
              sum_qty: data.sum_qty,
              all: data.sum_sub_total,
              cash: cash >= 0 ? this.rank.monthlyCash.prod[cash].sum_sub_total : 0,
              claim: cash >= 0 ? data.sum_sub_total - this.rank.monthlyCash.prod[cash].sum_sub_total : data.sum_sub_total ? data.sum_sub_total : 0,
              nama: this.produks[index].nama
            }
          })
          const limit = this.monthlyAll.length < 3 ? this.monthlyAll.length : 3
          for (let index = 0; index < limit; index++) {
            this.monthly[index] = this.monthlyAll[index]
          }
        }
        // 'daily', 'dailyCash', 'monthly', 'monthlyCash', 'lastSevenDays', 'lastSevenDaysCash'
        if (this.rank.lastSevenDays.prod.length) {
          this.weeklyAll = this.rank.lastSevenDays.prod.map((data) => {
            const index = findWithAttr(this.produks, 'id', data.id)
            const cash = findWithAttr(
              this.rank.lastSevenDaysCash.prod,
              'id',
              data.id
            )
            return {
              id: data.id,
              sum_qty: data.sum_qty,
              all: data.sum_sub_total,
              cash: cash >= 0 ? this.rank.lastSevenDaysCash.prod[cash].sum_sub_total : 0,
              claim: cash >= 0 ? data.sum_sub_total - this.rank.lastSevenDaysCash.prod[cash].sum_sub_total : data.sum_sub_total ? data.sum_sub_total : 0,
              nama: this.produks[index].nama
            }
          })
          const limit = this.weeklyAll.length < 3 ? this.weeklyAll.length : 3
          for (let index = 0; index < limit; index++) {
            this.weekly[index] = this.weeklyAll[index]
          }
        }
        if (this.rank.daily.prod.length) {
          this.daylyAll = this.rank.daily.prod.map((data) => {
            const index = findWithAttr(this.produks, 'id', data.id)
            const cash = findWithAttr(this.rank.dailyCash.prod, 'id', data.id)
            return {
              id: data.id,
              sum_qty: data.sum_qty,
              all: data.sum_sub_total,
              cash: cash >= 0 ? this.rank.dailyCash.prod[cash].sum_sub_total : 0,
              claim: cash >= 0 ? data.sum_sub_total - this.rank.dailyCash.prod[cash].sum_sub_total : data.sum_sub_total ? data.sum_sub_total : 0,
              nama: this.produks[index].nama
            }
          })
          const limit = this.daylyAll.length < 3 ? this.daylyAll.length : 3
          for (let index = 0; index < limit; index++) {
            this.dayly[index] = this.daylyAll[index]
          }
        }
        console.log('monthly', this.monthly)
        console.log('month all', this.monthlyAll)
        console.log('weekly', this.weekly)
        console.log('week all', this.weeklyAll)
        console.log('dayly', this.dayly)
        console.log('day all', this.daylyAll)
      } else {
        console.log('produk kosong bos')
      }
    },
    // api related function
    getDataHutang() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/dashboard/hutang')
          .then((resp) => {
            console.log('hutang', resp.data)
            this.hutangs = resp.data
            this.loading = false
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataTagihan() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/dashboard/tagihan')
          .then((resp) => {
            console.log('tagihan', resp.data)
            this.rank = resp.data
            this.loading = false
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    getDataRank() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/dashboard/rank')
          .then((resp) => {
            console.log('rank', resp.data)
            this.rank = resp.data
            this.loading = false
            this.monthlyMap()
            resolve(resp)
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
