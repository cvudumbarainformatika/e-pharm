import { defineStore } from 'pinia'
import { date } from 'quasar'
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'

export const useFromPemesananStore = defineStore('pemesanan_store', {
  state: () => ({
    loading: false,
    loadingSelesai: false,
    loadingPerusahaan: false,
    form: {
      nopemesanan: null,
      tgl_pemesanan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      kode_supplier: ''
    },
    pbfs: [],
    belums: [],
    // produk
    produkLoading: false,
    produks: [],
    produkParams: {
      q: ''
    }
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },
    cariProduk(val) {
      this.produkParams.q = val
      this.ambilProduk()
    },
    resetForm() {
      this.form = {
        nopemesanan: null,
        tgl_pemesanan: date.formatDate(Date.now(), 'YYYY-MM-DD'),
        kode_supplier: ''
      }
    },
    resetProduk() {
      this.setForm('kode_produk', null)
      this.setForm('qty', '')
      this.setForm('satuan', '')
    },
    ambilProduk() {
      this.produkLoading = true
      const params = { params: this.produkParams }
      return new Promise(resolve => {
        api.get('v1/pemesanan/get-produk', params)
          .then(resp => {
            this.produkLoading = false
            this.produks = resp.data
            // }
            resolve(resp.data)
          })
          .catch(() => { this.produkLoading = false })
      })
    },
    async getDraftPemesanan() {
      this.loading = true
      await api.get('v1/pemesanan/get-draft')
        .then(resp => {
          this.loading = false
          console.log('draft', resp?.data)
          const data = resp?.data
          if (data) {
            this.setForm('nopemesanan', data?.nopemesanan)
            this.setForm('kode_supplier', data?.kode_supplier)
            this.setForm('tgl_pemesanan', data?.tgl_pemesanan)
            this.belums = data?.detail
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    async getSupplier(val) {
      this.loadingPerusahaan = true
      await api.get('v1/pemesanan/get-perusahaan')
        .then(resp => {
          this.loadingPerusahaan = false
          this.pbfs = resp?.data
        })
        .catch(() => {
          this.loadingPerusahaan = false
        })
    },
    async simpan() {
      this.loading = true
      await api.post('v1/pemesanan/simpan-produk', this.form)
        .then(resp => {
          this.loading = false
          console.log('simpan', resp?.data)

          if (!this.form.nopemesanan) this.setForm('nopemesanan', resp?.data?.nopemesanan)
          if (resp?.data?.detail) {
            const ada = this.belums.findIndex(f => f.kode_produk === resp?.data?.detail?.kode_produk)
            if (ada >= 0) this.belums[ada] = resp?.data?.detail
            else this.belums.push(resp?.data?.detail)
          }
          this.resetProduk()
          console.log('belums', this.belums)

          notifSuccess(resp)
        })
        .catch(() => {
          this.loading = false
        })
    },
    async hapusProduct(val) {
      val.loading = true
      await api.post('v1/pemesanan/hapus-produk', val)
        .then(resp => {
          val.loading = false
          const index = this.belums.findIndex(f => f.id === val.id)
          if (index >= 0) this.belums.splice(index, 1)
          if (this.belums.length === 0) this.resetForm()
          notifSuccess(resp)
        })
        .catch(() => {
          val.loading = false
        })
    },
    async selesaiPemesanan() {
      this.loading = true
      await api.post('v1/pemesanan/selesai-pemesanan', this.form)
        .then(resp => {
          this.loading = false
          this.resetForm()
          this.belums = []
          notifSuccess(resp)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
