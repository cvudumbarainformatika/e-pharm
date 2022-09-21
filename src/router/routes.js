
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
            component: () => import('src/pages/v1/master/satuan/IndexPage.vue')
          },
          {
            path: '/penerimaan',
            name: 'penerimaan',
            component: () =>
              import('src/pages/v1/master/penerimaan/IndexPage.vue')
          },
          {
            path: '/kategori',
            name: 'kategori',
            component: () =>
              import('src/pages/v1/master/kategori/IndexPage.vue')
          },
          {
            path: '/produk',
            name: 'produk',
            component: () => import('src/pages/v1/master/produk/IndexPage.vue')
          },
          {
            path: '/supplier',
            name: 'supplier',
            component: () =>
              import('src/pages/v1/master/supplier/IndexPage.vue')
          },
          {
            path: '/dokter',
            name: 'dokter',
            component: () => import('src/pages/v1/master/dokter/IndexPage.vue')
          },
          {
            path: '/beban',
            name: 'beban',
            component: () => import('src/pages/v1/master/beban/IndexPage.vue')
          },
          {
            path: '/customer',
            name: 'customer',
            component: () =>
              import('src/pages/v1/master/customer/IndexPage.vue')
          },
          {
            path: '/merk',
            name: 'merk',
            component: () => import('src/pages/v1/master/merk/IndexPage.vue')
          },
          {
            path: '/perusahaan',
            name: 'perusahaan',
            component: () =>
              import('src/pages/v1/master/perusahaan/IndexPage.vue')
          },
          {
            path: '/rak',
            name: 'rak',
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
            path: '/biaya',
            name: 'biaya',
            component: () =>
              import('src/pages/v1/transaksi/biaya/IndexPage.vue')
          },
          {
            path: '/pembelian/:slug',
            name: 'pembelian',
            component: () =>
              import('src/pages/v1/transaksi/pembelian/IndexPage.vue')
          },
          {
            path: '/transaksi/penerimaan',
            name: 'transaksi.penerimaan',
            component: () =>
              import('src/pages/v1/transaksi/penerimaan/IndexPage.vue')
          },
          {
            path: '/penjualan/:slug',
            name: 'penjualan',
            component: () =>
              import('src/pages/v1/transaksi/penjualan/IndexPage.vue')
          },
          {
            path: '/retur',
            name: 'retur',
            component: () =>
              import('src/pages/v1/transaksi/retur/IndexPage.vue'),
            children: [
              {
                path: '/retur/:slug',
                name: 'detail.retur',
                component: () =>
                  import(
                    'src/pages/v1/transaksi/retur/detail/IndexReturPage.vue'
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
