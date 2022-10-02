import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { uniqueId } from 'src/modules/utils'
import { useLaporanMoreProduct } from './more'

export const useLaporanStokTable = defineStore('laporan_stok', {
  state: () => ({
    isOpen: false,
    formOpen: false,
    loading: false,
    form: {
      from: null,
      to: null,
      per_page: 5,
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
      'rak_id',
      'kategori_id',
      'limit_stok',
      'created_at',
      'updated_at'
    ],
    nomer: [],
    dates: [
      { nama: 'Sampai hari ini', value: 'tillToday' },
      { nama: 'Pilih Tanggal', value: 'spesifik' },
      { nama: 'Pilih Range Tanggal', value: 'range' }
    ],
    dueDate: null,
    date: null,
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
      this.date = null
    },
    setOpen() {
      this.formOpen = !this.formOpen
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
      console.log(this.penyesuaian)
      this.setOpen()
      console.log('val', val)
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
      val.product.data.forEach((data) => {
        data.stokBerjalan = 0
      })
      val.product.data.forEach((produk) => {
        val.masuk.forEach((mas) => {
          if (produk.id === mas.product_id) {
            if (mas.jml > 0) {
              produk.stokBerjalan += mas.jml
            }
          }
        })
        val.keluar.forEach((mas) => {
          if (produk.id === mas.product_id) {
            if (mas.jml > 0) {
              produk.stokBerjalan -= mas.jml
            }
          }
        })
        val.returPembelian.forEach((mas) => {
          if (produk.id === mas.product_id) {
            if (mas.jml > 0) {
              produk.stokBerjalan -= mas.jml
            }
          }
        })
        val.returPenjualan.forEach((mas) => {
          if (produk.id === mas.product_id) {
            if (mas.jml > 0) {
              produk.stokBerjalan += mas.jml
            }
          }
        })
        val.penyesuaian.forEach((mas) => {
          if (produk.id === mas.product_id) {
            if (mas.jml !== 0) {
              produk.stokBerjalan += mas.jml
            }
          }
        })
      })
      val.product.data.forEach((data) => {
        data.stokSekarang = data.stok_awal + data.stokBerjalan
      })
      // console.log('after proses', val.product.data)
      this.items = val.product.data
      this.setColumns(val.product.data)
      const temp = val.product
      delete temp.data
      this.meta = temp
      // console.log('meta', this.meta)
    },
    seeMore(val) {
      const more = useLaporanMoreProduct()
      // more.setParams('from', this.form.from)
      // more.setParams('to', this.form.to)
      // more.setParams('selection', this.date)
      more.setParams('id', val.id)
      more.setParams('nama', val.nama)
      more.getDetailsDataProduct()
      more.setOpen()
      console.log('see', val)
    },
    setSearch(val) {
      this.form.q = val
      this.getDataStok()
      console.log('val', val)
      // if (this.date) {
      // }
    },
    // api related function
    // ambil data stok
    getDataStok() {
      this.form.selection = this.date
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
              console.log(resp.data)
              this.prosesData(resp.data)
              resolve(resp)
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
      console.log(this.penyesuaian)
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
