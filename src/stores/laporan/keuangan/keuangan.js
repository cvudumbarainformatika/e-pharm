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
    totalSmw: 0,
    returPembelian: 0,
    pembelianBersih: 0,
    persediaanAwal: 0,
    persediaanAkhir: 0,
    bebans: [],
    bebanNos: [],
    beban: 0,
    bebanNoHut: 0,
    penerimaans: [],
    penerimaanNos: [],
    penerimaan: 0,
    penerimaanNoPiu: 0,
    laba: 0,
    rugi: 0,
    labaKas: 0,
    rugiKas: 0,
    distribusiMasuk: 0,
    distribusiKeluar: 0,

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
      this.distribusiMasuk = 0
      this.distribusiKeluar = 0
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
          const x = 0
          this.penerimaans.forEach((apem) => {
            if (apem.id === p.penerimaan_id) {
              apem.nominal = p.total
              // console.log('penerimaan true', apem)
            }
            // console.log('penerimaan', apem.nominal)
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
    prosesBebanNoHutang(data) {
      this.bebanNos.forEach((apem) => {
        apem.nominal = 0
      })
      if (data.length) {
        this.bebanNoHut = data
          .map((p) => {
            let x = 0
            this.bebanNos.forEach((apem) => {
              if (apem.id === p.beban_id) {
                if (apem.nama.includes('HUTANG')) {
                  apem.nominal = 0
                  x = 0
                } else {
                  apem.nominal = p.total
                  x = p.total
                }
                // console.log('beban true', apem.nama, ' ', apem.nominal)
              }
            })
            return x
          })
          .reduce((x, y) => x + y)
        // this.bebanNoHut = this.bebanNos
        //   .map((apem) => {
        //     const temp = apem.nominal
        //     return temp
        //   })
        //   .reduce((x, y) => x + y)
      }
      // console.log('beban', data)
    },
    prosesPenerimaanNoPiutang(data) {
      this.penerimaanNos.forEach((apem) => {
        apem.nominal = 0
      })
      if (data.length) {
        this.penerimaanNoPiu = data
          .map((p) => {
            let x = 0
            this.penerimaanNos.forEach((apem) => {
              if (apem.id === p.penerimaan_id) {
                if (apem.nama.includes('PIUTANG')) {
                  apem.nominal = 0
                  x = 0
                } else {
                  apem.nominal = p.total
                  x = p.total
                }
                // console.log('penerimaan true', apem.nama, ' ', apem.nominal)
              }
            })
            return x
          })
          .reduce((x, y) => x + y)
        // this.penerimaanNoPiu = this.penerimaanNos
        //   .map((apem) => {
        //     const temp = apem.nominal
        //     return temp
        //   })
        //   .reduce((x, y) => x + y)
      }
    },
    // hpp = pemelian bersih + persediaan awal - persediaan akhir
    // pembelian bersih = pembelian tunai dan kredit + biaya (mis: ongkir) - potongan pembelian - retur pembelian
    // persediaan awal = nilai barang tersedia di periode awal neraca akuntansi
    // persediaan akhir = nilai barang tersedia di akhir periode transaksi
    prosesHPP(pembelian, ongpot, stok) {
      // console.log('proses HPP')
      // console.log('pembelian', pembelian)
      // console.log('ongpot', ongpot)
      // console.log('stok', stok)
      let totalSmw = 0
      let total = 0
      let diskon = 0
      // array product
      // console.log('selection', this.periode)
      const product = stok?.product

      totalSmw = ongpot.period[0].totalSemua !== null ? ongpot.period[0].totalSemua : 0
      total = ongpot.period[0].jumlah !== null ? ongpot.period[0].jumlah : 0
      if (product.length) {
        product.forEach(data => {
          const beli = findWithAttr(pembelian, 'product_id', data.id)
          data.pembelianDgKredit = pembelian[beli] ? pembelian[beli].jml : 0 // tidak dipakai
          data.keluar = {}
          data.masuk = {}
          data.returPembelian = {}
          data.returPenjualan = {}
          data.distribusi = {}
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
          const distKelBe = stok?.distribusi?.keluarbefore?.find(x => x.product_id === data.id)
          const distKelPe = stok?.distribusi?.keluarperiod?.find(x => x.product_id === data.id)
          const distMasBe = stok?.distribusi?.masukbefore?.find(x => x.product_id === data.id)
          const distMasPe = stok?.distribusi?.masukperiod?.find(x => x.product_id === data.id)

          data.keluar.before = stok.keluar.before[keluarB] ? stok.keluar.before[keluarB].jml : 0
          data.keluar.periode = stok.keluar.period[keluarP] ? stok.keluar.period[keluarP].jml : 0
          data.masuk.before = stok.masuk.before[masukB] ? stok.masuk.before[masukB].jml : 0
          data.masuk.periode = stok.masuk.period[masukP] ? stok.masuk.period[masukP].jml : 0
          data.returPembelian.before = stok.returPembelian.before[returPembelianB] ? stok.returPembelian.before[returPembelianB].jml : 0
          data.returPembelian.periode = stok.returPembelian.period[returPembelianP] ? stok.returPembelian.period[returPembelianP].jml : 0
          data.returPenjualan.before = stok.returPenjualan.before[returPenjualanB] ? stok.returPenjualan.before[returPenjualanB].jml : 0
          data.returPenjualan.periode = stok.returPenjualan.period[returPenjualanP] ? stok.returPenjualan.period[returPenjualanP].jml : 0
          data.distribusi.keluarB = distKelBe?.jml ?? 0
          data.distribusi.keluarP = distKelPe?.jml ?? 0
          data.distribusi.masukB = distMasBe?.jml ?? 0
          data.distribusi.masukP = distMasPe?.jml ?? 0
          // sebelum
          data.stokSebelum = data.masuk.before - data.keluar.before + data.returPenjualan.before - data.returPembelian.before + data.distribusi.masukB - data.distribusi.keluarB
          // berjalan
          data.stokBerjalan = data.masuk.periode - data.keluar.periode + data.returPenjualan.periode - data.returPembelian.periode + data.distribusi.masukP - data.distribusi.keluarP
          data.stok_awal += data.stokSebelum
          data.stokSekarang = data.stok_awal + data.stokBerjalan
        })
      }

      // console.log('product', product)
      // persediaan awal periode ini
      const persediaanAwal = product.map(data => { return data.stok_awal * data.harga_beli }).reduce((a, b) => { return a + b })
      // pesediaan Akhir Periode ini
      const akh = product.map(data => { return data.stokSekarang * data.harga_beli }).reduce((a, b) => { return a + b })
      const persediaanAkhir = akh > 0 ? akh : -akh
      // semua pemebelian tunai dan kredit pada periode ini
      // const pembelianDgKredit = product.map(data => { return data.pembelianDgKredit * data.harga_beli }).reduce((a, b) => { return a + b })
      // retur Pembelian
      const returPembelian = product.map(data => { return data.returPembelian.periode * data.harga_beli }).reduce((a, b) => { return a + b })
      // pembelian bersih
      this.returPembelian = returPembelian
      this.distribusiMasuk = product?.map(da => da?.distribusi?.masukP * da?.harga_beli).reduce((a, b) => a + b, 0)
      this.distribusiKeluar = product?.map(da => da?.distribusi?.keluarP * da?.harga_beli).reduce((a, b) => a + b, 0)
      const pembelianBersih = totalSmw - this.returPembelian + this.distribusiMasuk - this.distribusiKeluar
      diskon = ongpot.period[0].totalSemua !== null ? ongpot.period[0].totalSemua - total : 0
      // const pembelianBersih = totalSmw - this.returPembelian
      // HPP = Pembelian Bersih + Persediaan Awal – Persediaan Akhir
      this.HPP = pembelianBersih + persediaanAwal - persediaanAkhir
      this.pembelian = total
      this.diskon = diskon
      this.totalSmw = totalSmw
      this.pembelianBersih = pembelianBersih
      this.persediaanAwal = persediaanAwal
      this.persediaanAkhir = persediaanAkhir
      const labaRugi = this.penjualanBersih - this.HPP - this.beban // + this.penerimaan
      const labaRugiKas = this.penjualanBersih - this.HPP - this.bebanNoHut // + this.penerimaanNoPiu
      this.laba = labaRugi > 0 ? labaRugi : 0
      this.rugi = labaRugi < 0 ? -labaRugi : 0
      this.labaKas = labaRugiKas > 0 ? labaRugiKas : 0
      this.rugiKas = labaRugiKas < 0 ? -labaRugiKas : 0
      // console.log('beban tanpat hutang', this.bebanNoHut)
      // console.log('ppendapatan tanpat Piutnga', this.penerimaanNoPiu)
      // console.log('laba rugi', labaRugiKas)
      // console.log('laba kas', this.labaKas)
      // console.log('rugi kas', this.rugiKas)
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
      this.penjualan = data.penjualan.period.length
        ? data.penjualan.period
          .map((apem) => {
            let temp = 0
            temp = apem.jml * apem.harga
            return temp
          })
          .reduce((x, y) => x + y)
        : 0
      // console.log('penjualan period', data.penjualan.period)
      // console.log('penjualan', this.penjualan)

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
      // console.log('retur penjualan', this.returPenjualan)

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

      this.prosesBebanNoHutang(data.beban)
      this.prosesPenerimaanNoPiutang(data.penerimaan)
      this.prosesBeban(data.beban)
      this.prosesPenerimaan(data.penerimaan)
    },
    // api related functions
    getBebans() {
      return new Promise((resolve) => {
        api.get('v1/beban/beban').then((resp) => {
          // console.log('beben keuangan', resp.data)
          if (resp.status === 200) {
            this.bebans = resp.data.data
            this.bebanNos = resp.data.data
            resolve(resp.data.data)
          }
        })
      })
    },
    getPenerimaan() {
      return new Promise((resolve) => {
        api.get('v1/penerimaan/penerimaan').then((resp) => {
          // console.log('penerimaan keuangan', resp.data)
          if (resp.status === 200) {
            this.penerimaans = resp.data.data
            this.penerimaanNos = resp.data.data
            resolve(resp.data.data)
          }
        })
      })
    },
    // getPenjualan() {
    //   this.resetData()
    //   // console.log('params', this.params)
    //   const params = { params: this.params }
    //   this.loading = true
    //   return new Promise((resolve, reject) => {
    //     api
    //       .get('v1/laporan/get-laporan-keuangan', params)
    //       .then((resp) => {
    //         this.loading = false
    //         if (resp.status === 200) {
    //           // console.log('laporan pj', resp.data)
    //           this.dataProses(resp.data)

    //           this.prosesHPP(
    //             resp.data.pembelianDgKredit,
    //             resp.data.ongkir,
    //             resp.data.stok
    //           )
    //           resolve(resp.data)
    //         }
    //       })
    //       .catch((err) => {
    //         this.loading = false
    //         reject(err)
    //       })
    //   })
    // },
    // baru
    getPenjualan() {
      this.resetData()
      // console.log('params', this.params)
      const params = { params: this.params }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/new-get-laporan-keuangan', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              console.log('laporan pj', resp.data)
              const data = resp?.data?.data
              this.penjualan = data?.penjualanP
              this.returPenjualan = data?.returPenjualanP
              this.penjualanBersih = data?.penjualanBersih
              this.pembelian = data?.total
              this.diskon = data?.diskon
              // this.dataProses(resp.data)

              // this.prosesHPP(
              //   resp.data.pembelianDgKredit,
              //   resp.data.ongkir,
              //   resp.data.stok
              // )

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
              // console.log('get data stok', resp.data)
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
