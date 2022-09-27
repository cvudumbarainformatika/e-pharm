import { defineStore } from 'pinia'

export const useLaporanStokTable = defineStore('laporan_stok', {
  state: () => ({
    isOpen: false,
    loading: false,
    form: {
      from: null,
      to: null
    },
    meta: {},
    columns: [],
    rows: [],
    nomer: [],
    dates: [
      { nama: 'Sampai hari ini', value: 'tillToday' },
      { nama: 'Pilih Tanggal', value: 'spesifik' },
      { nama: 'Pilih Range Tanggal', value: 'range' }
    ],
    dueDate: null,
    date: null,
    params: {}
  }),
  actions: {
    resetData() {
      this.form = {
        from: null,
        to: null
      }
      this.meta = {}
      this.rows = []
      this.nomer = []
      this.dueDate = null
      this.date = null
    },
    setNomor() {
      if (this.rows.length) {
        for (let i = 0; i < this.rows.length; i++) {
          this.nomer[i] = i + 1
        }
        this.rows.puss({ nomor: this.nomer })
      }
    },
    setColumns() {
      const kolom = [
        {
          name: 'nomor',
          align: 'left',
          label: 'No ',
          field: (row) => row.nomer,
          required: true
        },
        {
          name: 'product',
          align: 'left',
          label: 'Produk ',
          field: (row) => row.product.nama
        },
        {
          name: 'awal',
          align: 'left',
          label: 'Stok Awal ',
          field: (row) => row.awal
        },
        {
          name: 'masuk',
          align: 'left',
          label: 'Stok Masuk ',
          field: (row) => row.masuk
        },
        {
          name: 'keluar',
          align: 'left',
          label: 'Stok Keluar ',
          field: (row) => row.keluar
        },
        {
          name: 'sekarang',
          align: 'left',
          label: 'Stok Sekarang ',
          field: (row) => row.awal + row.masuk - row.keluar
        }
      ]
      this.columns = kolom
    },
    getDataStok() {
      const params = {
        param: {
          selection: this.date,
          to: this.form.to,
          from: this.form.from
        }
      }
      console.log(params)
    }
  }
})
