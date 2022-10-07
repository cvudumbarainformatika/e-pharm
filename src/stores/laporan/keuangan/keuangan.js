import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { dateDbFormat } from 'src/modules/formatter'

export const useLaporanKeuanganStore = defineStore('store_laporan_keuangan', {
  state: () => ({
    spesifik: false,
    range: false,
    loading: false,
    penjualan: 0,
    returPenjualan: 0,
    penjualanBersih: 0,
    HPP: 0,
    pembelian: 0,
    returPembelian: 0,
    pembelianBersih: 0,
    bebans: [],
    beban: 0,
    penerimaans: [],
    penerimaan: 0,
    labaRugi: 0,

    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
      selection: 'tillToday'
    },

    dates: [
      { nama: 'Sampai hari ini', value: 'tillToday' },
      { nama: 'Pilih Tanggal', value: 'spesifik' },
      { nama: 'Pilih Range Tanggal', value: 'range' }
    ],
    periode: 'Sampai hari ini',
    date: 'tillToday'
  }),
  actions: {
    resetData() {
      this.penjualan = 0
      this.returPenjualan = 0
      this.penjualanBersih = 0
      this.HPP = 0
      this.pembelian = 0
      this.returPembelian = 0
      this.pembelianBersih = 0
      this.beban = 0
      this.penerimaan = 0
      this.labaRugi = 0
      this.periode = ''
    },
    setParams(key, val) {
      this.params[key] = val
    },
    setSpesifik() {
      this.spesifik = !this.spesifik
    },
    setRange() {
      this.range = !this.range
    },
    prosesBeban(data) {
      this.bebans.forEach((apem) => {
        apem.nominal = 0
      })
      if (data.length) {
        data.map((p) => {
          const x = null
          this.bebans.forEach((apem) => {
            if (apem.id === p.beban_id) {
              apem.nominal = p.total
              console.log('beban true', apem)
            }
          })
          return x
        })
        this.beban = data
          .map((apem) => {
            const temp = apem.total
            return temp
          })
          .reduce((x, y) => x + y)
      }
      console.log('beban', data)
    },
    prosesPenerimaan(data) {
      this.penerimaans.forEach((apem) => {
        apem.nominal = 0
      })
      if (data.length) {
        data.map((p) => {
          const x = null
          this.penerimaans.forEach((apem) => {
            if (apem.id === p.penerimaan_id) {
              apem.nominal = p.total
              console.log('penerimaan true', apem)
            }
          })
          return x
        })
        this.penerimaan = data
          .map((apem) => {
            const temp = apem.total
            return temp
          })
          .reduce((x, y) => x + y)
      }
    },
    prosesHPP(data) {
      // harga penjualan di hitung dari harga beli master
    },
    dataProses(data) {
      // penjualan
      this.penjualan = data.penjualan.length ? data.penjualan
        .map((apem) => {
          let temp = 0
          temp = apem.jml * apem.harga
          return temp
        })
        .reduce((x, y) => x + y) : 0

      // retur Pejualan
      this.returPenjualan = data.returPenjualan.length ? data.returPenjualan
        .map((apem) => {
          let temp = 0
          temp = apem.jml * apem.harga
          return temp
        })
        .reduce((x, y) => x + y) : 0

      // penjualan bersih
      this.penjualanBersih = this.penjualan - this.returPenjualan

      // pembelian
      this.pembelian = data.pembelian.length ? data.pembelian
        .map((apem) => {
          let temp = 0
          temp = apem.jml * apem.harga
          return temp
        })
        .reduce((x, y) => x + y) : 0

      // retur pembelian
      this.returPembelian = data.returPembelian.length ? data.returPembelian
        .map((apem) => {
          let temp = 0
          temp = apem.jml * apem.harga
          return temp
        })
        .reduce((x, y) => x + y) : 0

      // pembelian bersih
      this.pembelianBersih = this.pembelian - this.returPembelian

      this.prosesBeban(data.beban)
      this.prosesPenerimaan(data.penerimaan)
    },
    // api related functions
    getBebans() {
      return new Promise((resolve) => {
        api.get('v1/beban/beban').then((resp) => {
          console.log('beben keuangan', resp.data)
          if (resp.status === 200) {
            this.bebans = resp.data.data
            resolve(resp.data.data)
          }
        })
      })
    },
    getPenerimaan() {
      return new Promise((resolve) => {
        api.get('v1/penerimaan/penerimaan').then((resp) => {
          console.log('penerimaan keuangan', resp.data)
          if (resp.status === 200) {
            this.penerimaans = resp.data.data
            resolve(resp.data.data)
          }
        })
      })
    },
    getPenjualan() {
      this.resetData()
      console.log('params', this.params)
      const params = { params: this.params }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/get-laporan-keuangan', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              console.log('laporan pj', resp.data)
              this.dataProses(resp.data)
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
