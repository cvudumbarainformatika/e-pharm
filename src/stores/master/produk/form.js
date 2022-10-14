import { defineStore } from 'pinia'
import { notifSuccess } from 'src/modules/utils'
import { api } from 'boot/axios'
import { useProdukTable } from './table'
import { useRakTable } from '../rak/table'
import { useSatuanStore } from '../satuan/crud'
import { olahUang } from 'src/modules/formatter'
import { useMerkTable } from '../merk/table'
import { useKategoriTable } from '../kategori/table'
import { useSatuanBesarStore } from '../satuan/besar/crud'

export const useProdukFormStore = defineStore('produk_form', {
  state: () => ({
    isOpen: false,
    form: {
      barcode: '',
      nama: '',
      merk: '',
      satuan_id: null,
      harga_beli: 0,
      harga_jual_umum: 0,
      harga_jual_resep: 0,
      harga_jual_cust: 0,
      stok_awal: 0,
      rak_id: null,
      kategori_id: null,
      expired: null
    },
    raks: [],
    satuans: [],
    satuanBesars: [],
    kategoris: [],
    merks: [],
    loading: false
  }),

  actions: {
    // ambil data dari tabel lain
    ambilDataRak() {
      const getRak = useRakTable()
      getRak.getDataTable().then(resp => {
        this.data = resp
        this.raks = resp
        // console.log('reks', resp)
      })
    },
    ambilDataSatuan() {
      const getSat = useSatuanStore()
      getSat.getSatuan().then(resp => {
        this.satuans = resp
        // console.log('satuan', resp)
      })
    },
    ambilDataSatuanBesar() {
      const getSat = useSatuanBesarStore()
      getSat.getSatuan().then(resp => {
        this.satuanBesars = resp
        // console.log('satuan', resp)
      })
    },
    ambilDatakategori() {
      const getKate = useKategoriTable()
      getKate.getDataTable().then(resp => {
        this.kategoris = resp
        // console.log('kategori', resp)
      })
    },
    ambilDataMerk() {
      const getMerk = useMerkTable()
      getMerk.getDataTable().then(resp => {
        this.merks = resp
      })
    },
    // local related actions
    resetFORM() {
      this.form = {}
      const columns = [
        'barcode',
        'nama',
        'merk',
        'pengali',
        'satuan_id',
        'satuan_besar_id',
        'harga_beli',
        'harga_jual_umum',
        'harga_jual_resep',
        'harga_jual_cust',
        'stok_awal',
        'rak_id',
        'kategori_id',
        'expired'
      ]
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], '')
      }
      // this.setForm("saldo_awal_hutang", 0);
    },
    setToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      const formatDb = year + '-' + month + '-' + day
      this.form.tanggal_lahir = formatDb
    },
    setForm(nama, val) {
      this.form[nama] = val
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
      // console.log(keys)
      // kecuali yang ada di object user
      this.isOpen = !this.isOpen
    },

    // api related actions

    // tambah
    saveForm() {
      const beli = olahUang(this.form.harga_beli)
      const umum = olahUang(this.form.harga_jual_umum)
      const resep = olahUang(this.form.harga_jual_resep)
      const cust = olahUang(this.form.harga_jual_cust)

      // console.log('beli ', beli, ' umum ', umum, ' resep ', resep, ' cust ', cust)
      this.form.harga_beli = beli
      this.form.harga_jual_cust = cust
      this.form.harga_jual_resep = resep
      this.form.harga_jual_umum = umum
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/produk/store', this.form)
          .then((resp) => {
            // console.log('save data', resp)
            notifSuccess(resp)
            const table = useProdukTable()
            table.getDataTable()
            this.loading = false
            this.isOpen = false
            resolve(resp)
          })
          .catch((err) => {
            this.isOpen = false
            this.loading = false
            reject(err)
          })
      })
    }
  }
})
