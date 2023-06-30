
const routes = [
  {
    path: '/',
    component: () => import('layouts/Admin/AdminLayout.vue'),
    meta: { requireAuth: true, visitor: false },
    children: [
      { path: '', redirect: '/apem' },
      {
        path: '/apem',
        name: 'apem',
        // component: () => import('pages/IndexPage.vue')
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        // component: () => import('pages/IndexPage.vue')
        component: () => import('pages/DashboardPage.vue')
      },
      // { path: '/surveyor', name: 'surveyor', component: () => import('pages/v1/surveyor/IndexPage.vue') },
      {
        path: '/master',
        name: 'master',
        component: () => import('pages/v1/master/IndexPage.vue'),
        meta: { requireAuth: true },
        children: [
          {
            path: '/master/satuan',
            name: 'master.satuan',
            component: () => import('src/pages/v1/master/satuan/IndexPage.vue')
          },
          {
            path: '/master/penerimaan',
            name: 'master.penerimaan',
            component: () =>
              import('src/pages/v1/master/penerimaan/IndexPage.vue')
          },
          {
            path: '/master/kategori',
            name: 'master.kategori',
            component: () =>
              import('src/pages/v1/master/kategori/IndexPage.vue')
          },
          {
            path: '/master/produk',
            name: 'master.produk',
            component: () => import('src/pages/v1/master/produk/IndexPage.vue')
          },
          {
            path: '/master/supplier',
            name: 'master.supplier',
            component: () =>
              import('src/pages/v1/master/supplier/IndexPage.vue')
          },
          {
            path: '/master/dokter',
            name: 'master.dokter',
            component: () => import('src/pages/v1/master/dokter/IndexPage.vue')
          },
          {
            path: '/master/beban',
            name: 'master.beban',
            component: () => import('src/pages/v1/master/beban/IndexPage.vue')
          },
          {
            path: '/master/customer',
            name: 'master.customer',
            component: () =>
              import('src/pages/v1/master/customer/IndexPage.vue')
          },
          {
            path: '/master/merk',
            name: 'master.merk',
            component: () => import('src/pages/v1/master/merk/IndexPage.vue')
          },
          {
            path: '/master/perusahaan',
            name: 'master.perusahaan',
            component: () =>
              import('src/pages/v1/master/perusahaan/IndexPage.vue')
          },
          {
            path: '/master/rak',
            name: 'master.rak',
            component: () => import('src/pages/v1/master/rak/IndexPage.vue')
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
        component: () => import('src/pages/v1/history/IndexPage.vue')
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
            path: '/transaksi/biaya',
            name: 'transaksi.biaya',
            component: () =>
              import('src/pages/v1/transaksi/biaya/IndexPage.vue')
          },
          {
            path: '/transaksi/pembelian/:slug',
            name: 'transaksi.pembelian',
            component: () =>
              import('src/pages/v1/transaksi/pembelian/IndexPage.vue'),
            meta: { role: 'gudang' }
          },
          {
            path: '/transaksi/penerimaan',
            name: 'transaksi.penerimaan',
            component: () =>
              import('src/pages/v1/transaksi/penerimaan/IndexPage.vue')
          },
          {
            path: '/transaksi/kasir',
            name: 'transaksi.kasir',
            component: () =>
              import('src/pages/v1/transaksi/kasir/IndexPage.vue')
          },
          {
            path: '/transaksi/penjualan/:slug',
            name: 'transaksi.penjualan',
            component: () =>
              import('src/pages/v1/transaksi/penjualan/IndexPage.vue'),
            meta: { role: 'kasir' }
          },
          {
            path: '/transaksi/retur',
            name: 'transaksi.retur',
            component: () =>
              import('src/pages/v1/transaksi/retur/IndexPage.vue'),
            children: [
              {
                path: '/transaksi/retur/:slug',
                name: 'transaksi.detail.retur',
                component: () =>
                  import('src/pages/v1/transaksi/retur/detail/IndexPage.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('pages/v1/setting/IndexPage.vue')
      }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false, visitor: true },
    children: [
      {
        path: '',
        component: () => import('pages/auth/AuthPage.vue')
      }
    ]
  },
  {
    path: '/print',
    component: () => import('layouts/print/PrintLayout.vue'),
    meta: { requireAuth: true, visitor: false },
    children: [
      {
        path: '',
        component: () => import('pages/v1/print/IndexPage.vue')
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
