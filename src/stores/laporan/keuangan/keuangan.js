import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { findWithAttr } from 'src/modules/utils'
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
    ongkir: 0,
    diskon: 0,
    returPembelian: 0,
    pembelianBersih: 0,
    persediaanAwal: 0,
    persediaanAkhir: 0,
    bebans: [],
    beban: 0,
    penerimaans: [],
    penerimaan: 0,
    laba: 0,
    rugi: 0,

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
    periode: 'Bulan ini',
    date: 'tillToday'
  }),
  actions: {
    resetData() {
      this.penjualan = 0
      this.returPenjualan = 0
      this.penjualanBersih = 0
      this.HPP = 0
      this.pembelian = 0
      this.ongkir = 0
      this.diskon = 0
      this.returPembelian = 0
      this.pembelianBersih = 0
      this.beban = 0
      this.penerimaan = 0
      this.laba = 0
      this.rugi = 0
      // this.periode = 'Sampai Hari Ini'
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
    setPeriode(val) {
      this.periode = val
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
              // console.log('beban true', apem)
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
      // console.log('beban', data)
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
              // console.log('penerimaan true', apem)
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
    // hpp = pemelian bersih + persediaan awal - persediaan akhir
    // pembelian bersih = pembelian tunai dan kredit + biaya (mis: ongkir) - potongan pembelian - retur pembelian
    // persediaan awal = nilai barang tersedia di periode awal neraca akuntansi
    // persediaan akhir = nilai barang tersedia di akhir periode transaksi
    prosesHPP(pembelian, ongpot, stok) {
      console.log('proses HPP')
      console.log('pembelian', pembelian)
      console.log('ongpot', ongpot)
      console.log('stok', stok)
      let ongkir = null
      let diskon = null
      // array product
      console.log('selection', this.periode)
      const product = stok.product
      if (this.date === 'apem') {
        ongkir = ongpot[0].ongkos !== null ? ongpot[0].ongkos : 0
        diskon = ongpot[0].diskon !== null ? ongpot[0].diskon : 0
        console.log('selection', this.date)
        product.forEach(data => {
          const beli = findWithAttr(pembelian, 'product_id', data.id)
          data.pembelianDgKredit = pembelian[beli] ? pembelian[beli].jml : 0
          const keluar = findWithAttr(stok.keluar, 'product_id', data.id)
          const masuk = findWithAttr(stok.masuk, 'product_id', data.id)
          const returPembelian = findWithAttr(stok.returPembelian, 'product_id', data.id)
          const returPenjualan = findWithAttr(stok.returPenjualan, 'product_id', data.id)
          data.keluar = stok.keluar[keluar] ? stok.keluar[keluar].jml : 0
          data.masuk = stok.masuk[masuk] ? stok.masuk[masuk].jml : 0
          // data.returPembelianAja = stok.returPembelian[returPembelian] ? stok.returPembelian[returPembelian].jml : 0
          data.returPembelian = stok.returPembelian[returPembelian] ? stok.returPembelian[returPembelian].jml : 0
          data.returPenjualan = stok.returPenjualan[returPenjualan] ? stok.returPenjualan[returPenjualan].jml : 0
          // data.returPenjualanAja = stok.returPenjualan[returPenjualan] ? stok.returPenjualan[returPenjualan].jml : 0
          data.stokBerjalan = data.masuk - data.keluar + data.returPenjualan - data.returPembelian
          data.stokSekarang = data.stok_awal + data.stokBerjalan
        })
      } else {
        ongkir = ongpot.period[0].ongkos !== null ? ongpot.period[0].ongkos : 0
        diskon = ongpot.period[0].diskon !== null ? ongpot.period[0].diskon : 0
        product.forEach(data => {
          const beli = findWithAttr(pembelian, 'product_id', data.id)
          data.pembelianDgKredit = pembelian[beli] ? pembelian[beli].jml : 0
          data.keluar = {}
          data.masuk = {}
          data.returPembelian = {}
          data.returPenjualan = {}
        })
        product.forEach(data => {
          const keluarB = findWithAttr(stok.keluar.before, 'product_id', data.id)
          const keluarP = findWithAttr(stok.keluar.period, 'product_id', data.id)
          const masukB = findWithAttr(stok.masuk.before, 'product_id', data.id)
          const masukP = findWithAttr(stok.masuk.period, 'product_id', data.id)
          const returPembelianB = findWithAttr(stok.returPembelian.before, 'product_id', data.id)
          const returPembelianP = findWithAttr(stok.returPembelian.period, 'product_id', data.id)
          const returPenjualanB = findWithAttr(stok.returPenjualan.before, 'product_id', data.id)
          const returPenjualanP = findWithAttr(stok.returPenjualan.period, 'product_id', data.id)

          data.keluar.before = stok.keluar.before[keluarB] ? stok.keluar.before[keluarB].jml : 0
          data.keluar.periode = stok.keluar.period[keluarP] ? stok.keluar.period[keluarP].jml : 0
          data.masuk.before = stok.masuk.before[masukB] ? stok.masuk.before[masukB].jml : 0
          data.masuk.periode = stok.masuk.period[masukP] ? stok.masuk.period[masukP].jml : 0
          data.returPembelian.before = stok.returPembelian.before[returPembelianB] ? stok.returPembelian.before[returPembelianB].jml : 0
          data.returPembelian.periode = stok.returPembelian.period[returPembelianP] ? stok.returPembelian.period[returPembelianP].jml : 0
          // data.returPembelianAja = stok.returPembelian.period[returPembelianP] ? stok.returPembelian.period[returPembelianP].jml : 0
          data.returPenjualan.before = stok.returPenjualan.before[returPenjualanB] ? stok.returPenjualan.before[returPenjualanB].jml : 0
          data.returPenjualan.periode = stok.returPenjualan.period[returPenjualanP] ? stok.returPenjualan.period[returPenjualanP].jml : 0
          // data.returPenjualanAja = stok.returPenjualan.period[returPenjualanP] ? stok.returPenjualan.period[returPenjualanP].jml : 0
          // sebelum
          data.stokSebelum = data.masuk.before - data.keluar.before + data.returPenjualan.before - data.returPembelian.before
          // berjalan
          data.stokBerjalan = data.masuk.periode - data.keluar.periode + data.returPenjualan.periode - data.returPembelian.periode
          data.stok_awal += data.stokSebelum
          data.stokSekarang = data.stok_awal + data.stokBerjalan
        })
      }
      console.log('product', product)
      // persediaan awal periode ini
      const persediaanAwal = product.map(data => { return data.stok_awal * data.harga_beli }).reduce((a, b) => { return a + b })
      // pesediaan Akhir Periode ini
      const persediaanAkhir = product.map(data => { return data.stokSekarang * data.harga_beli }).reduce((a, b) => { return a + b })
      // semua pemebelian tunai dan kredit pada periode ini
      const pembelianDgKredit = product.map(data => { return data.pembelianDgKredit * data.harga_beli }).reduce((a, b) => { return a + b })
      // retur Pembelian
      const returPembelian = product.map(data => { return data.returPembelian.periode * data.harga_beli }).reduce((a, b) => { return a + b })
      // pembelian bersih
      const pembelianBersih = pembelianDgKredit + ongkir - diskon - this.returPembelian
      // HPP = Pembelian Bersih + Persediaan Awal – Persediaan Akhir
      this.HPP = pembelianBersih + persediaanAwal - persediaanAkhir
      this.diskon = diskon
      this.ongkir = ongkir
      this.pembelianBersih = pembelianBersih
      this.persediaanAwal = persediaanAwal
      this.persediaanAkhir = persediaanAkhir
      this.returPembelian = returPembelian
      const labaRugi = this.penjualanBersih - this.HPP - this.beban + this.penerimaan
      this.laba = labaRugi > 0 ? labaRugi : 0
      this.rugi = labaRugi < 0 ? -labaRugi : 0
      // console.log('persediaan Awal', persediaanAwal)
      // console.log('persediaan Akhir', persediaanAkhir)
      // console.log('pembelian dg kredit', pembelianDgKredit)
      // console.log('pembelian bersih', pembelianBersih)
      // console.log('ongkor', ongkir)
      // console.log('diakon', diskon)
      // console.log('HPP', this.HPP)
    },
    dataProses(data) {
      // penjualan
      this.penjualan = data.penjualan.length
        ? data.penjualan
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0

      // retur Pejualan
      this.returPenjualan = data.returPenjualan.length
        ? data.returPenjualan
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0

      // penjualan bersih
      this.penjualanBersih = this.penjualan - this.returPenjualan

      // pembelian
      this.pembelian = data.pembelian.length
        ? data.pembelian
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0

      // retur pembelian
      // this.returPembelian = data.returPembelian.length
      //   ? data.returPembelian
      //     .map((apem) => {
      //       let temp = 0
      //       temp = apem.jml * apem.harga
      //       return temp
      //     })
      //     .reduce((x, y) => x + y)
      //   : 0

      // pembelian bersih
      // this.pembelianBersih = this.pembelian - this.returPembelian

      this.prosesBeban(data.beban)
      this.prosesPenerimaan(data.penerimaan)
    },
    dataProsesDua(data) {
      // penjualan
      this.penjualan = data.penjualan.period.length
        ? data.penjualan.period
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0

      // retur Pejualan
      this.returPenjualan = data.returPenjualan.period.length
        ? data.returPenjualan.period
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0

      // penjualan bersih
      this.penjualanBersih = this.penjualan - this.returPenjualan

      // pembelian
      // this.pembelian = data.pembelian.period.length
      //   ? data.pembelian.period
      //     .map((apem) => {
      //       let temp = 0
      //       temp = apem.jml * apem.harga
      //       return temp
      //     })
      //     .reduce((x, y) => x + y)
      //   : 0

      // retur pembelian
      // this.returPembelian = data.returPembelian.period.length
      //   ? data.returPembelian.period
      //     .map((apem) => {
      //       let temp = 0
      //       temp = apem.jml * apem.harga
      //       return temp
      //     })
      //     .reduce((x, y) => x + y)
      //   : 0

      // pembelian bersih
      // this.pembelianBersih = this.pembelian - this.returPembelian

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
              this.dataProsesDua(resp.data)

              this.prosesHPP(
                resp.data.pembelianDgKredit,
                resp.data.ongkir,
                resp.data.stok
              )
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // ambil data stok
    getDataStok() {
      // this.form.selection = this.date
      const params = {
        params: this.params
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/get-stok', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              console.log('get data stok', resp.data)
              // this.prosesData(resp.data);
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // total transaksi, total ongkir, total diskon
    getTotalTransactions() {
      const params = { params: this.params }
      return new Promise((resolve) => {
        api.get('v1/laporan/total-by-date', params).then((resp) => {
          if (resp.status === 200) {
            // this.totalTransaction = resp.data[0]
            // console.log(this.totalTransaction)
            resolve(resp.data[0])
          }
        })
      })
    }
  }
})
