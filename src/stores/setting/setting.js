import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErrCenterVue } from 'src/modules/utils'
import { useDashboardStore } from '../dashboard'
import { useLaporanStokTable } from '../laporan/stok/table'
import { usePembelianTable } from '../transaksi/pembelian/table'
import { usePenjualanTable } from '../transaksi/penjualan/table'
import { usePrintStore } from '../print'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    sMenu: false,
    submenuEvent: false,
    submenuMaster: false,
    submenuTransaksi: false,
    dark: false,
    loading: false,
    transaksiLoading: false,
    info: {
      nama: 'apotek sehat selalu',
      alamat: 'alamat belum di isi',
      tlp: 'nomor telepon belum ada'
    },
    menus: [
      {
        icon: 'icon-mat-dashboard',
        link: 'dashboard',
        name: 'dashboard',
        route: 'dashboard',
        submenus: [

        ],
        roles: ' root owner '
      },
      {
        icon: 'icon-mat-dataset',
        link: 'master',
        name: 'master',
        route: 'master',
        submenus: [
          // {
          //   icon: 'icon-mat-gas_meter',
          //   name: 'Satuan',
          //   link: 'master/satuan',
          //   value: 'master.satuan',
          //   roles: ' root owner '
          // },
          // {
          //   icon: 'icon-mat-table_rows',
          //   name: 'Rak',
          //   link: 'master/rak',
          //   value: 'master.rak',
          //   roles: ' root owner '
          // },
          // {
          //   icon: 'icon-mat-category',
          //   name: 'Kategori',
          //   link: 'master/kategori',
          //   value: 'master.kategori',
          //   roles: ' root owner '
          // },
          // {
          //   icon: 'icon-fa-truck_arrow_right_solid',
          //   name: 'Distributor',
          //   link: 'master/supplier',
          //   value: 'master.supplier',
          //   roles: ' root owner '
          // },
          {
            icon: 'icon-mat-medication',
            name: 'Dokter',
            link: 'master/dokter',
            value: 'master.dokter',
            roles: ' root owner kasir '
          },
          {
            icon: 'icon-mat-workspaces',
            name: 'Produk',
            link: 'master/produk',
            value: 'master.produk',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-assessment',
            name: 'Pengeluaran',
            link: 'master/beban',
            value: 'master.beban',
            roles: ' root owner '
          },
          // {
          //   icon: 'icon-mat-attach_money',
          //   name: 'Pendapatan',
          //   link: 'master/penerimaan',
          //   value: 'master.penerimaan',
          //   roles: ' root owner '
          // },
          // {
          //   icon: 'icon-mat-local_shipping',
          //   name: 'Customer',
          //   link: 'master/customer',
          //   value: 'master.customer',
          //   roles: ' root owner kasir '
          // },
          // {
          //   icon: 'icon-mat-auto_awesome_mosaic',
          //   name: 'Merk',
          //   link: 'master/merk',
          //   value: 'master.merk',
          //   roles: ' root owner '
          // },
          {
            icon: 'icon-mat-business',
            name: 'Perusahaan',
            link: 'master/perusahaan',
            value: 'master.perusahaan',
            roles: ' root owner '
          }
          // {
          //   icon: 'icon-fa-store-solid',
          //   name: 'Cabang',
          //   link: 'master/cabang',
          //   value: 'master.cabang',
          //   roles: ' root owner '
          // }
        ]
      },
      {
        icon: 'icon-mat-sync_alt',
        link: 'transaksi',
        name: 'transaksi',
        submenus: [
          {
            icon: 'icon-mat-inventory_2',
            name: 'Pembelian',
            link: '/transaksi/pembelian/PBL-',
            value: 'transaksi.pembelian',
            roles: ' root owner gudang '
          },
          {
            icon: 'icon-mat-shopping_bag',
            name: 'Penjualan',
            link: '/transaksi/penjualan/PJL-',
            value: 'transaksi.penjualan',
            roles: ' root owner kasir '
          },
          {
            icon: 'icon-mat-request_quote',
            name: 'Kasir',
            link: '/transaksi/kasir',
            value: 'transaksi.kasir',
            roles: ' root owner kasir '
          },
          {
            icon: 'icon-mat-assignment_return',
            name: 'Retur',
            link: '/transaksi/retur',
            value: 'transaksi.retur',
            roles: ' root owner kasir gudang '
          },
          // {
          //   icon: 'icon-mat-account_balance_wallet',
          //   name: 'Pendapatan',
          //   link: '/transaksi/penerimaan',
          //   value: 'transaksi.penerimaan',
          //   roles: ' root owner '
          // },
          {
            icon: 'icon-mat-payment',
            name: 'Pengeluaran',
            link: '/transaksi/biaya',
            value: 'transaksi.biaya',
            roles: ' root owner '
          }
          // {
          //   icon: 'icon-mat-sync_alt',
          //   name: 'Distribusi',
          //   link: '/transaksi/distribusi',
          //   value: 'transaksi.distribusi',
          //   roles: ' root owner '
          // },
          // {
          //   icon: 'icon-fa-truck_arrow_right_solid',
          //   name: 'Pemesanan',
          //   link: '/transaksi/pemesanan',
          //   value: 'transaksi.pemesanan',
          //   roles: ' root owner '
          // }
        ]
      },
      {
        icon: 'icon-mat-history',
        link: 'history',
        name: 'history',
        submenus: [
          {
            icon: 'icon-mat-density_small',
            name: 'Seluruhnya',
            value: 'all',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-insert_drive_file',
            name: 'Draft',
            value: 'draft',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-inventory_2',
            name: 'Pembelian',
            value: 'PEMBELIAN',
            roles: ' root owner gudang '
          },
          {
            icon: 'icon-mat-shopping_bag',
            name: 'Penjualan',
            value: 'PENJUALAN',
            roles: ' root owner kasir '
          },
          {
            icon: 'icon-mat-account_balance_wallet',
            name: 'Pendapatan',
            value: 'PENDAPATAN',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-payment',
            name: 'Pengeluaran',
            value: 'PENGELUARAN',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-assignment_return',
            name: 'Retur Pembelian',
            value: 'RETUR PEMBELIAN',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-assignment_return',
            name: 'Retur Penjualan',
            value: 'RETUR PENJUALAN',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-tune',
            name: 'Form Penyesuaian',
            value: 'FORM PENYESUAIAN',
            roles: ' root owner '
          }
        ]
      },
      {
        icon: 'icon-mat-description',
        link: 'laporan',
        name: 'laporan',
        submenus: [],
        roles: ' root owner '
      },
      {
        icon: 'icon-mat-settings',
        link: 'setting',
        name: 'setting',
        submenus: [
          {
            icon: 'icon-mat-density_small',
            name: 'User',
            value: 'user',
            roles: ' root owner '
          },
          // {
          //   icon: 'icon-mat-insert_drive_file',
          //   name: 'Menu',
          //   value: 'menu'
          // },
          {
            icon: 'icon-mat-home',
            link: null,
            name: 'Info',
            value: 'info',
            roles: ' root owner '
          },
          {
            icon: 'icon-mat-dvr',
            link: null,
            name: 'Themes',
            value: 'theme',
            roles: ' root owner '
          }
        ]
      }
    ],
    levels: [],
    themes: [
      { name: 'primary', value: '#30268f' },
      { name: 'secondary', value: '#06b8b8' },
      { name: 'accent', value: '#9C27B0' },
      // { name: 'primary-light', value: '#cac5f0' },
      { name: 'dark', value: '#0d101a' },
      // { name: 'dark-page', value: '#0d101a' },
      // { name: 'dark-light', value: '#262e47' },
      { name: 'positive', value: '#198754' },
      { name: 'negative', value: '#dc3545' },
      { name: 'info', value: '#0d6efd' },
      { name: 'warning', value: '#d6a100' }
      // { name: 'danger', value: '#990000' }
      // { name: 'white', value: '#ffffff' }
    ],
    infos: {
      tlp: '097987658990',
      nama: 'Apotik Andi Dermawan',
      alamat: 'Jl. Yang sulit untuk dilupakan',
      pemilik: 'Saya adalah pemilik toko'
    },
    menu: 'user',
    form: {
      nama: 'eAchy'
    },
    penyesuaianProduk: {
      rak: true,
      stok_awal: true,
      harga_beli: false,
      harga_jual_umum: false,
      harga_jual_resep: false,
      harga_jual_cust: false
    },
    kodecabang: null,
    stok: useLaporanStokTable(),
    penjualan: usePenjualanTable(),
    pembelian: usePembelianTable(),
    dashboar: useDashboardStore(),
    print: usePrintStore(),
    unreadNotif: []
  }),
  actions: {
    setOpen() {
      this.sMenu = !this.sMenu
    },
    menuOpen() {
      this.submenuEvent = true
    },
    menuClose() {
      this.submenuEvent = false
    },
    masterOpen() {
      this.submenuMaster = true
    },
    masterClose() {
      this.submenuMaster = false
    },
    transaksiOpen() {
      this.submenuTransaksi = true
    },
    transaksiClose() {
      this.submenuTransaksi = false
    },
    getInitialData() {
      this.getDataSetting()
      this.stok.getDataRak()
      this.penjualan.ambilDataDistributor()
      this.penjualan.ambilDataDokter()
      this.penjualan.ambilProdukPaginate()
      // this.penjualan.ambilDataProduk().then((resp) => {
      //   this.dashboar.produks = resp
      //   this.dashboar.getDataRank()
      // })
      // this.pembelian.ambilDataProduk()
      this.dashboar.getDataHutang()
      this.dashboar.getDataTagihan()
    },
    dataPembelian() {
      this.pembelian.ambilDataProduk()
    },
    dataPenjualan() {
      this.penjualan.ambilDataDistributor()
      this.penjualan.ambilDataDokter()
      // this.penjualan.ambilDataProduk().then((resp) => {
      //   this.dashboar.produks = resp
      //   this.dashboar.getDataRank()
      // })
    },
    increment() {
      this.counter++
    },
    setInfo(key, val) {
      this.info[key] = val
    },
    setPenyesuaianProoduk(key, val) {
      if (typeof val === 'boolean') {
        this.penyesuaianProduk[key] = val
      } else {
        notifErrCenterVue('nilai yang masuk harus boolean (true / false)')
      }
    },
    pilihItem(val) {
      const namaRoute = routerInstance.currentRoute.value.name
      if (namaRoute !== 'setting') {
        routerInstance.push('/setting')
      }
      this.menu = val.value
      // console.log('menu', this.menu)
      // console.log(val)
    },
    setTheme(key, val) {
      this.themes[key].value = val
      this.saveSetting()
    },
    // api related function

    getDataSetting() {
      return new Promise((resolve, reject) => {
        api
          .get('v1/setting/info')
          .then((resp) => {
            console.log('setting', resp.data)
            const datanya = resp?.data?.data
            // this.menus = resp.data.menus
            // this.levels = resp.data.levels
            this.kodecabang = datanya.kodecabang
            this.themes = datanya.themes
            this.infos = datanya.infos
            this.info = this.infos
            this.print.setInfo(this.infos)
            resolve(resp?.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    saveSetting() {
      this.form.menus = this.menus
      this.form.infos = this.infos
      // this.form.levels = this.levels
      this.form.themes = this.themes
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('v1/setting/store-info', this.form)
          .then((resp) => {
            this.loading = false
            // console.log('simpan', resp)
            this.getDataSetting()
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
