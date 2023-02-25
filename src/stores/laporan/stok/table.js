import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { dateFullFormat } from 'src/modules/formatter'
import { findWithAttr, uniqueId } from 'src/modules/utils'
import { useLaporanMoreProduct } from './more'

export const useLaporanStokTable = defineStore('laporan_stok', {
  state: () => ({
    isOpen: false,
    spesifik: false,
    range: false,
    formOpen: false,
    loading: false,
    periode: '',
    form: {
      from: null,
      to: null,
      per_page: 10,
      page: 1,
      order_by: 'created_at',
      sort: 'desc'
    },
    penyesuaian: {
      reff: '',
      nama: 'FORM PENYESUAIAN',
      qty: 0
    },
    meta: {},
    columns: [],
    items: [],
    columnHide: [
      'id',
      'uuid',
      'harga_beli',
      'harga_jual_umum',
      'harga_jual_cust',
      'harga_jual_resep',
      'merk_id',
      'satuan_id',
      'satuan_besar_id',
      'rak_id',
      'kategori_id',
      'limit_stok',
      'created_at',
      'updated_at',
      'stokSebelum',
      'pengali',
      'keluar',
      'masuk',
      'returPembelian',
      'returPenjualan',
      'penyesuaian'
    ],
    nomer: [],
    dates: [
      { nama: 'Sampai hari ini', value: 'tillToday' },
      { nama: 'Pilih Tanggal', value: 'spesifik' },
      { nama: 'Pilih Range Tanggal', value: 'range' }
    ],
    date: 'tillToday',
    dueDate: null,
    produk: {},
    params: {
      q: ''
    },
    raks: []
  }),
  actions: {
    resetData() {
      this.form = {
        from: null,
        to: null,
        per_page: 5,
        order_by: 'created_at',
        sort: 'desc'
      }
      this.penyesuaian = {
        nama: 'FORM PENYESUAIAN',
        reff: '',
        qty: 0
      }
      this.meta = {}
      this.items = []
      this.nomer = []
      this.dueDate = null
      this.date = 'tillToday'
      this.periode = 'bulan ini'
    },
    setPeriode() {
      switch (this.date) {
        case 'tillToday':
          this.periode = 'bulan ini'
          break
        case 'spesifik':
          this.periode = 'tanggal ' + dateFullFormat(this.form.from)
          break
        case 'range':
          this.periode =
            'tanggal ' +
            dateFullFormat(this.form.from) +
            ' - ' +
            dateFullFormat(this.form.to)
          break

        default:
          this.periode = 'bulan ini'
          break
      }
    },
    setOpen() {
      this.formOpen = !this.formOpen
    },
    setSpesifik() {
      this.spesifik = !this.spesifik
    },
    setRange() {
      this.range = !this.range
    },
    setForm(key, val) {
      this.form[key] = val
    },
    setPerPage(val) {
      this.form.per_page = val
      this.form.page = 1
      this.getDataStok()
    },
    setPage(val) {
      this.form.page = val
      this.getDataStok()
    },
    editData(val) {
      // const keys = Object.keys(val)
      const keys = [
        'rak_id',
        'stok_awal',
        'stokSekarang',
        'stokBerjalan',
        'harga_beli',
        'harga_jual_umum',
        'harga_jual_resep',
        'harga_jual_cust'
      ]
      keys.forEach((key, index) => {
        this.setPenyesuaian(key, val[key])
      })
      this.setPenyesuaian('product_id', val.id)
      this.penyesuaian.qty = 0 - this.penyesuaian.stokSekarang
      // console.log(this.penyesuaian)
      this.setOpen()
      // console.log('val', val)
    },

    setPenyesuaian(key, val) {
      this.penyesuaian[key] = val
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.penyesuaian.tanggal = formatDb
    },
    setNomor() {
      if (this.rows.length) {
        for (let i = 0; i < this.rows.length; i++) {
          this.nomer[i] = i + 1
        }
        this.rows.push({ nomor: this.nomer })
      }
    },
    setColumns(payload) {
      const thumb = payload.map((x) => Object.keys(x))
      this.columns = thumb[0]
    },
    prosesData(val) {
      // console.log('proses', val)
      // console.log('selection', this.date)
      const product = val.product.data
      const stok = val
      if (this.date === 'apem') {
        product.forEach((data) => {
          const keluar = findWithAttr(stok.keluar, 'product_id', data.id)
          const masuk = findWithAttr(stok.masuk, 'product_id', data.id)
          const penyesuaian = findWithAttr(
            stok.penyesuaian,
            'product_id',
            data.id
          )
          const returPembelian = findWithAttr(
            stok.returPembelian,
            'product_id',
            data.id
          )
          const returPenjualan = findWithAttr(
            stok.returPenjualan,
            'product_id',
            data.id
          )
          data.keluar = stok.keluar[keluar] ? stok.keluar[keluar].jml : 0
          data.masuk = stok.masuk[masuk] ? stok.masuk[masuk].jml : 0
          data.penyesuaian = stok.penyesuaian[penyesuaian]
            ? stok.penyesuaian[penyesuaian].jml
            : 0
          data.returPembelian = stok.returPembelian[returPembelian]
            ? stok.returPembelian[returPembelian].jml
            : 0
          data.returPenjualan = stok.returPenjualan[returPenjualan]
            ? stok.returPenjualan[returPenjualan].jml
            : 0
          data.stokBerjalan =
            data.masuk -
            data.keluar +
            data.returPenjualan -
            data.returPembelian +
            data.penyesuaian
          data.stokSekarang = data.stok_awal + data.stokBerjalan
        })
        this.items = product
        this.setColumns(product)
        const temp = val.product
        delete temp.data
        this.meta = temp
      } else {
        product.forEach((data) => {
          data.keluar = {}
          data.masuk = {}
          data.returPembelian = {}
          data.returPenjualan = {}
          data.penyesuaian = {}
        })
        product.forEach((data) => {
          const keluarB = stok.keluar.before ? findWithAttr(stok.keluar.before, 'product_id', data.id) : -1
          const keluarP = stok.keluar.period ? findWithAttr(stok.keluar.period, 'product_id', data.id) : -1
          const masukB = stok.masuk.before ? findWithAttr(stok.masuk.before, 'product_id', data.id) : -1
          const masukP = stok.masuk.period ? findWithAttr(stok.masuk.period, 'product_id', data.id) : -1
          const returPembelianB = stok.returPembelian.before ? findWithAttr(
            stok.returPembelian.before,
            'product_id',
            data.id
          ) : -1
          const returPembelianP = stok.returPembelian.period ? findWithAttr(
            stok.returPembelian.period,
            'product_id',
            data.id
          ) : -1
          const returPenjualanB = stok.returPenjualan.before ? findWithAttr(
            stok.returPenjualan.before,
            'product_id',
            data.id
          ) : -1
          const returPenjualanP = stok.returPenjualan.period ? findWithAttr(
            stok.returPenjualan.period,
            'product_id',
            data.id
          ) : -1
          const penyesuaianB = stok.penyesuaian.before ? findWithAttr(
            stok.penyesuaian.before,
            'product_id',
            data.id
          ) : -1
          const penyesuaianP = stok.penyesuaian.period ? findWithAttr(
            stok.penyesuaian.period,
            'product_id',
            data.id
          ) : -1

          data.keluar.before = stok.keluar.before[keluarB]
            ? stok.keluar.before[keluarB].jml
            : 0
          data.keluar.periode = stok.keluar.period[keluarP]
            ? stok.keluar.period[keluarP].jml
            : 0
          data.masuk.before = stok.masuk.before[masukB]
            ? stok.masuk.before[masukB].jml
            : 0
          data.masuk.periode = stok.masuk.period[masukP]
            ? stok.masuk.period[masukP].jml
            : 0
          data.returPembelian.before = stok.returPembelian.before[
            returPembelianB
          ]
            ? stok.returPembelian.before[returPembelianB].jml
            : 0
          data.returPembelian.periode = stok.returPembelian.period[
            returPembelianP
          ]
            ? stok.returPembelian.period[returPembelianP].jml
            : 0
          data.returPenjualan.before = stok.returPenjualan.before[
            returPenjualanB
          ]
            ? stok.returPenjualan.before[returPenjualanB].jml
            : 0
          data.returPenjualan.periode = stok.returPenjualan.period[
            returPenjualanP
          ]
            ? stok.returPenjualan.period[returPenjualanP].jml
            : 0
          data.penyesuaian.before = stok.penyesuaian.before[penyesuaianB]
            ? stok.penyesuaian.before[penyesuaianB].jml
            : 0
          data.penyesuaian.periode = stok.penyesuaian.period[penyesuaianP]
            ? stok.penyesuaian.period[penyesuaianP].jml
            : 0
          // sebelum
          data.stokSebelum =
            data.masuk.before -
            data.keluar.before +
            data.returPenjualan.before -
            data.returPembelian.before +
            data.penyesuaian.before
          // berjalan
          data.stokBerjalan =
            data.masuk.periode -
            data.keluar.periode +
            data.returPenjualan.periode -
            data.returPembelian.periode +
            data.penyesuaian.periode
          data.stok_awal += data.stokSebelum
          data.stokSekarang = data.stok_awal + data.stokBerjalan
        })
        this.items = product
        this.setColumns(product)
        const temp = val.product
        delete temp.data
        this.meta = temp
      }
    },
    seeMore(val) {
      const more = useLaporanMoreProduct()
      // more.setParams('from', this.form.from)
      // more.setParams('to', this.form.to)
      // more.setParams('selection', this.date)
      more.setParams('id', val.id)
      more.setParams('nama', val.nama)
      more.setParams('selection', this.date)
      more.setParams('from', this.form.from)
      more.setParams('to', this.form.to)
      more.getDetailsDataProduct()
      more.setOpen()
      // console.log('see', val)
    },
    setSearch(val) {
      this.form.q = val
      this.getDataStok()
      // console.log('val', val)
      // if (this.date) {
      // }
    },
    // api related function
    // ambil data stok
    getDataStok() {
      // this.form.selection = this.date
      // this.setPeriode()
      const params = {
        params: this.form
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .get('v1/laporan/get-stok', params)
          .then((resp) => {
            this.loading = false
            if (resp.status === 200) {
              // console.log('get data stok', resp.data)
              this.prosesData(resp.data)
              resolve(resp.data)
            }
          })
          .catch((err) => {
            this.loading = false
            reject(err)
          })
      })
    },
    // ambil data rak
    getDataRak() {
      return new Promise((resolve) => {
        api.get('v1/rak/all-rak').then((resp) => {
          if (resp.status === 200) {
            this.raks = resp.data
            // console.log(resp.data)
            resolve(resp)
          }
        })
      })
    },
    // simpan form penyesuaian
    savePenyesuaian() {
      this.setToday()
      this.setPenyesuaian('status', 1)
      this.setPenyesuaian('harga', this.penyesuaian.harga_beli)
      this.setPenyesuaian('sub_total', 0)
      this.setPenyesuaian('expired', null)
      // console.log(this.penyesuaian)
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/transaksi/store', this.penyesuaian)
          .then((resp) => {
            this.loading = false
            if (resp.status === 201) {
              this.getDataStok()
              this.form.reff = 'FPST-' + uniqueId()
            }
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
