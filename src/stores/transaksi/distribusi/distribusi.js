import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { notifErrVue } from 'src/modules/utils'

export const useDistribusiFormStore = defineStore('form_distribusi', {
  state: () => ({
    loading: false,
    simpanDetailLoading: false,
    hapusDetailLoading: false,
    form: {
      nodistribusi: null
    },
    // produk
    produkLoading2: false,
    produks: [],
    produk2s: [],
    produk1: null,
    produkParams: {
      q: '',
      page: 1,
      per_page: 20,
      order_by: 'created_at',
      sort: 'desc'
    },
    // cabang
    cabangs: [],
    availableCabangs: [],
    // draft
    drafts: {}
  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    },

    initialActions() {
      this.getNomorDist()
      // this.getCabangs()
      // this.setToday()
    },
    async getNomorDist() {
      this.loading = true
      await api.get('v1/distribusi/get-nodist-draft')
        .then(resp => {
          this.loading = false
          if (resp?.data?.nodistribusi) this.setForm('nodistribusi', resp?.data?.nodistribusi)
          this.drafts = resp?.data
          if (this.drafts) {
            this.setForm('dari', this.drafts?.dari)
            this.setForm('tujuan', this.drafts?.tujuan)
            this.setForm('pengirim', this.drafts?.pengirim)
          }
          console.log(resp)
        })
        .catch(() => { this.loading = false })
    },
    getCabangs() {
      return new Promise(resolve => {
        api.get('v1/cabang/all')
          .then(resp => {
            console.log('cabang', resp)
            this.cabangs = resp?.data
            resolve(resp)
          })
      })
    },
    resetInput() {
      this.form.product_id = ''
      this.form.kode_produk = ''
      this.form.harga = 0
      this.form.jumlah = 0
      this.form.expired = ''
      // console.log('reset input')
    },
    // produk
    produkSelected(val) {
      const apem2 = this.produk2s
      const produk1 = apem2.find((data) => data.id === val)

      if (produk1) {
        this.produk1 = produk1
        console.log('selected', val, produk1)
        this.form.product_id = produk1.id
        this.form.kode_produk = produk1.kode_produk
        this.form.harga_beli = produk1.harga_beli
        this.form.qty = 1
        this.form.harga = this.form.harga_beli
        this.form.satuan = produk1?.satuan?.nama
      }
      console.log('Product ', val)
    },

    cariProduk(val) {
      this.produkParams.q = val
      this.ambilProdukPaginate()
    },
    ambilProdukPaginate() {
      this.produkLoading2 = true
      const params = { params: this.produkParams }
      return new Promise(resolve => {
        api.get('v1/produk/get-for-pembelian', params)
          .then(resp => {
            this.produkLoading2 = false
            this.produk2s = resp.data.data
            // }
            resolve(resp.data)
          })
          .catch(() => { this.produkLoading2 = false })
      })
    },
    onEnter() {
      this.produkParams.product_id = this.form.product_id
      if (this.form.expired !== null) {
        this.setForm('expired', this.form.expired)
        // data.expired = this.form.expired
      }
      // this.clearNullForm()
      const data = this.form

      // console.log('form penjualan', data)
      this.simpanDetailTransaksi(data)
        .then((dttra) => {
          return new Promise(resolve => {
            this.getSingleProduct().then(resp => {
              const index = this.produk2s.findIndex(anu => anu.id === this.form.product_id)
              if (index >= 0) this.produk2s[index] = resp
              resolve(resp)
            })
          })
        })

      const index = this.produk2s.findIndex(it => it.id === this.form.product_id)
      if (index >= 0) {
        const produk = this.produk2s[index]
        if (produk.limit_stok > produk.stokSekarang) {
          notifErrVue(`stok ${produk.nama} sejumlah ${produk.stokSekarang}, kurang dari limit_stok ${produk.limit_stok}`)
        }
      }
      // console.log('produk', produk)
    },
    getSingleProduct() {
      const params = { params: this.produkParams }
      this.produkUpdateLoading = true
      return new Promise((resolve, reject) => {
        api.get('v1/laporan/single-product', params)
          .then(resp => {
            this.produkUpdateLoading = false
            // console.log('update produk', resp.data)
            resolve(resp.data)
          })
          .catch(err => {
            this.produkUpdateLoading = false
            reject(err)
          })
      })
    },
    simpanDetailTransaksi(data) {
      this.simpanDetailLoading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/distribusi/simpan', data)
          .then((resp) => {
            this.simpanDetailLoading = false
            // console.log('save detail ', resp.data)

            this.setForm('nodistribusi', resp?.data?.nodistribusi)
            if (this.drafts?.details?.length) {
              const index = this.drafts?.details?.findIndex(a => a.id === resp?.data?.detail.id)
              if (index >= 0) this.drafts.details[index] = resp?.data?.detail
              else this.drafts.details.push(resp?.data?.detail)
            } else {
              this.drafts = resp?.data?.data
              this.drafts.details = [resp?.data?.detail]
            }
            this.resetInput()
            resolve(resp.data.data)
            // this.getDetailTransaksi()
          })
          .catch((err) => {
            this.simpanDetailLoading = false
            reject(err)
          })
      })
    },
    async hapusItem(val) {
      val.loading = true
      await api.post('v1/distribusi/hapus-draft', val)
        .then(resp => {
          val.loading = false
          const data = resp?.data?.data
          if (this.drafts?.details?.length) {
            const index = this.drafts?.details?.findIndex(a => a.id === data?.id)
            if (index >= 0) this.drafts?.details.splice(index, 1)
          }
          if (!this.drafts?.details?.length) {
            this.drafts = {}
            this.setForm('nodistribusi', null)
            // console.log('hapusnya', this.drafts)
          }

          // console.log('hapus', this.drafts)
        })
        .catch(() => {
          val.loading = false
        })
    },
    async selesaiDraft() {
      this.loading = true
      await api.post('v1/distribusi/selesai', this.form)
        .then(resp => {
          this.loading = false
          this.drafts = {}
          this.setForm('nodistribusi', null)
          // console.log('hapus', this.drafts)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
