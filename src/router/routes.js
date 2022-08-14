
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
        path: '/profile',
        name: 'profile',
        component: () =>
          import(
          /* webpackChunkName: "profile" */ 'pages/v1/profile/IndexPage.vue'
          )
      },
      {
        path: '/master',
        name: 'master',
        component: () =>
          import(
            /* webpackChunkName: "master" */ 'pages/v1/master/IndexPage.vue'
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
          import(
            /* webpackChunkName: "setting" */ 'pages/v1/AppSetting.vue'
          )
      }
    ]
  },

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
