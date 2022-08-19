
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ 'pages/IndexPage.vue')
      },
      // { path: '/surveyor', name: 'surveyor', component: () => import('pages/v1/surveyor/IndexPage.vue') },
      {
        path: '/master',
        name: 'master',
        component: () =>
          import(
            /* webpackChunkName: "master" */ 'pages/v1/master/IndexPage.vue'
          ),
        meta: { requireAuth: true },
        children: [
          {
            path: '/satuan',
            name: 'satuan',
            component: () =>
              import(
                /* webpackChunkName: "satuan" */ 'src/pages/v1/master/satuan/SatuanPage.vue'
              )
          },
          {
            path: '/kategori',
            name: 'kategori',
            component: () =>
              import(
                /* webpackChunkName: "kategori" */ 'src/pages/v1/master/kategori/KategoriPage.vue'
              )
          },
          {
            path: '/produk',
            name: 'produk',
            component: () =>
              import(
                /* webpackChunkName: "produk" */ 'src/pages/v1/master/produk/ProdukPage.vue'
              )
          },
          {
            path: '/supplier',
            name: 'supplier',
            component: () =>
              import(
                /* webpackChunkName: "supplier" */ 'src/pages/v1/master/supplier/SupplierPage.vue'
              )
          },
          {
            path: '/dokter',
            name: 'dokter',
            component: () =>
              import(
                /* webpackChunkName: "dokter" */ 'src/pages/v1/master/dokter/DokterPage.vue'
              )
          },
          {
            path: '/beban',
            name: 'beban',
            component: () =>
              import(
                /* webpackChunkName: "beban" */ 'src/pages/v1/master/beban/BebanPage.vue'
              )
          },
          {
            path: '/customer',
            name: 'customer',
            component: () =>
              import(
                /* webpackChunkName: "customer" */ 'src/pages/v1/master/customer/CustomerPage.vue'
              )
          },
          {
            path: '/merk',
            name: 'merk',
            component: () =>
              import(
                /* webpackChunkName: "merk" */ 'src/pages/v1/master/merk/MerkPage.vue'
              )
          },
          {
            path: '/perusahaan',
            name: 'perusahaan',
            component: () =>
              import(
                /* webpackChunkName: "perusahaan" */ 'src/pages/v1/master/perusahaan/PerusahaanPage.vue'
              )
          },
          {
            path: '/rak',
            name: 'rak',
            component: () =>
              import(
                /* webpackChunkName: "rak" */ 'src/pages/v1/master/rak/RakPage.vue'
              )
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: "profile" */ 'pages/v1/profile/IndexPage.vue'
          )
      },

      {
        path: '/laporan',
        name: 'laporan',
        component: () =>
          import(
            /* webpackChunkName: "laporan" */ 'pages/v1/laporan/IndexPage.vue'
          )
      },
      {
        path: '/transaksi',
        name: 'transaksi',
        component: () =>
          import(
            /* webpackChunkName: "transaksi" */ 'pages/v1/transaksi/IndexPage.vue'
          ),
        children: [
          {
            path: '/bayar hutang',
            name: 'bayar hutang',
            component: () =>
              import(
                /* webpackChunkName: "bayar hutang" */ 'src/pages/v1/transaksi/bayar hutang/BayarHutangPage.vue'
              )
          },
          {
            path: '/biaya',
            name: 'biaya',
            component: () =>
              import(
                /* webpackChunkName: "biaya" */ 'src/pages/v1/transaksi/biaya/BiayaPage.vue'
              )
          },
          {
            path: '/history',
            name: 'history',
            component: () =>
              import(
                /* webpackChunkName: "history" */ 'src/pages/v1/transaksi/history/HistoryPage.vue'
              )
          },
          {
            path: '/pembelian',
            name: 'pembelian',
            component: () =>
              import(
                /* webpackChunkName: "pembelian" */ 'src/pages/v1/transaksi/pembelian/PembelianPage.vue'
              )
          },
          {
            path: '/penerimaan kas',
            name: 'penerimaan kas',
            component: () =>
              import(
                /* webpackChunkName: "penerimaan kas" */ 'src/pages/v1/transaksi/penerimaan kas/PenerimaanKasPage.vue'
              )
          },
          {
            path: '/penjualan',
            name: 'penjualan',
            component: () =>
              import(
                /* webpackChunkName: "penjualan" */ 'src/pages/v1/transaksi/penjualan/PenjualanPage.vue'
              )
          },
          {
            path: '/retur',
            name: 'retur',
            component: () =>
              import(
                /* webpackChunkName: "retur" */ 'src/pages/v1/transaksi/retur/ReturPage.vue'
              )
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: () =>
          import(
            /* webpackChunkName: "setting" */ 'pages/v1/setting/AppSetting.vue'
          )
      }
    ]
  },
  // {
  //   path: '/master',
  //   component: () => import('layouts/Master/MasterLayout.vue'),
  //   meta: { requireAuth: true },
  //   children: [

  //   ]
  // },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false },
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/auth/AuthPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
