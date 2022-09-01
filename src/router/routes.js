
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
        component: () => import('pages/IndexPage.vue')
      },
      // { path: '/surveyor', name: 'surveyor', component: () => import('pages/v1/surveyor/IndexPage.vue') },
      {
        path: '/master',
        name: 'master',
        component: () => import('pages/v1/master/IndexPage.vue'),
        meta: { requireAuth: true },
        children: [
          {
            path: '/satuan',
            name: 'satuan',
            component: () =>
              import('src/pages/v1/master/satuan/SatuanPage.vue')
          },
          {
            path: '/penerimaan',
            name: 'penerimaan',
            component: () =>
              import('src/pages/v1/master/penerimaan/PenerimaanTable.vue')
          },
          {
            path: '/kategori',
            name: 'kategori',
            component: () =>
              import('src/pages/v1/master/kategori/KategoriPage.vue')
          },
          {
            path: '/produk',
            name: 'produk',
            component: () =>
              import('src/pages/v1/master/produk/ProdukPage.vue')
          },
          {
            path: '/supplier',
            name: 'supplier',
            component: () =>
              import('src/pages/v1/master/supplier/SupplierPage.vue')
          },
          {
            path: '/dokter',
            name: 'dokter',
            component: () =>
              import('src/pages/v1/master/dokter/DokterPage.vue')
          },
          {
            path: '/beban',
            name: 'beban',
            component: () => import('src/pages/v1/master/beban/BebanPage.vue')
          },
          {
            path: '/customer',
            name: 'customer',
            component: () =>
              import('src/pages/v1/master/customer/CustomerPage.vue')
          },
          {
            path: '/merk',
            name: 'merk',
            component: () => import('src/pages/v1/master/merk/MerkPage.vue')
          },
          {
            path: '/perusahaan',
            name: 'perusahaan',
            component: () =>
              import('src/pages/v1/master/perusahaan/PerusahaanPage.vue')
          },
          {
            path: '/rak',
            name: 'rak',
            component: () => import('src/pages/v1/master/rak/RakPage.vue')
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/v1/profile/IndexPage.vue')
      },

      {
        path: '/laporan',
        name: 'laporan',
        component: () => import('pages/v1/laporan/IndexPage.vue')
      },
      {
        path: '/history',
        name: 'history',
        component: () =>
          import('src/pages/v1/history/HistoryPage.vue')
      },
      {
        path: '/transaksi',
        name: 'transaksi',
        component: () => import('pages/v1/transaksi/IndexPage.vue'),
        children: [
          {
            path: '/bayar hutang',
            name: 'bayar hutang',
            component: () =>
              import('src/pages/v1/transaksi/bayar hutang/BayarHutangPage.vue')
          },
          {
            path: '/biaya',
            name: 'biaya',
            component: () =>
              import('src/pages/v1/transaksi/biaya/BiayaPage.vue')
          },
          {
            path: '/pembelian/:slug',
            name: 'pembelian',
            component: () =>
              import('src/pages/v1/transaksi/pembelian/PembelianPage.vue')
          },
          {
            path: '/transaksi/penerimaan',
            name: 'transaksi.penerimaan',
            component: () =>
              import('src/pages/v1/transaksi/penerimaan/PenerimaanPage.vue')
          },
          {
            path: '/penjualan/:slug',
            name: 'penjualan',
            component: () =>
              import('src/pages/v1/transaksi/penjualan/PenjualanPage.vue')
          },
          {
            path: '/retur',
            name: 'retur',
            component: () =>
              import('src/pages/v1/transaksi/retur/ReturPage.vue'),
            children: [
              {
                path: '/retur/:slug',
                name: 'detail.retur',
                component: () =>
                  import(
                    'src/pages/v1/transaksi/retur/detail/DetailReturPage.vue'
                  )
              }
            ]
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('pages/v1/setting/AppSetting.vue')
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
        component: () => import('pages/auth/AuthPage.vue')
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
