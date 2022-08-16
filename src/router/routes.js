
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
        children: [
          {
            path: '/satuan',
            name: 'satuan',
            component: () =>
              import(
                /* webpackChunkName: "satuan" */ 'pages/v1/master/satuan/IndexPage.vue'
              )
          },
          {
            path: '/kategori',
            name: 'kategori',
            component: () =>
              import(
                /* webpackChunkName: "kategori" */ 'pages/v1/master/kategori/IndexPage.vue'
              )
          },
          {
            path: '/produk',
            name: 'produk',
            component: () =>
              import(
                /* webpackChunkName: "produk" */ 'pages/v1/master/produk/IndexPage.vue'
              )
          },
          {
            path: '/supplier',
            name: 'supplier',
            component: () =>
              import(
                /* webpackChunkName: "supplier" */ 'pages/v1/master/supplier/IndexPage.vue'
              )
          },
          {
            path: '/dokter',
            name: 'dokter',
            component: () =>
              import(
                /* webpackChunkName: "dokter" */ 'pages/v1/master/dokter/IndexPage.vue'
              )
          },
          {
            path: '/rak',
            name: 'rak',
            component: () =>
              import(
                /* webpackChunkName: "rak" */ 'pages/v1/master/rak/IndexPage.vue'
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
          )
      },
      {
        path: '/setting',
        name: 'setting',
        component: () =>
          import(/* webpackChunkName: "setting" */ 'pages/v1/AppSetting.vue')
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
