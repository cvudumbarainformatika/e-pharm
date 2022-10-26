import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
// import { useAuthStore } from 'src/stores/auth'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // const user = useAuthStore()
  // console.log(user.userGetter)
  // Router.beforeEach((to, from, next) => {
  //   const locUser = JSON.parse(localStorage.getItem('user'))
  //   const role = locUser ? locUser.role : ''
  //   const loggedIn = !!localStorage.getItem('token')
  //   // console.log(loggedIn)
  //   // console.log(role)
  //   console.log('before')
  //   if (to.matched.some(record => record.meta.requireAuth)) {
  //     console.log('matched auth')
  //     if (loggedIn) {
  //       console.log('loggedIn', loggedIn)
  //       if (to.matched.some((record) => record.meta.role === 'kasir')) {
  //         if (role === 'kasir') {
  //           console.log(' kasir', role)
  //           next()
  //         } else {
  //           console.log('bukan kasir', role)
  //           next({ path: '/' })
  //         }
  //       }
  //       if (to.matched.some((record) => record.meta.role === 'gudang')) {
  //         if (role === 'gudang') {
  //           console.log(' kasir', role)
  //           next()
  //         } else {
  //           console.log('bukan kasir', role)
  //           next({ path: '/' })
  //         }
  //       } else {
  //         next()
  //       }
  //     } else {
  //       console.log(' ga login', loggedIn)
  //       next({ path: '/login' })
  //     }
  //   } else if (to.matched.some((record) => record.meta.visitor)) {
  //     console.log('matched visitor')
  //     if (loggedIn) {
  //       console.log('loggedIn', loggedIn)
  //       if (role === 'kasir') {
  //         console.log(' kasir', role)
  //         next({ name: 'penjualan', params: { slug: 'da' } })
  //       } else if (role === 'gudang') {
  //         console.log('bukan kasir', role)
  //         next({ name: 'pembelian', params: { slug: 'da' } })
  //       } else {
  //         console.log('bukan kasir', role)
  //         next({ name: 'dashboard' })
  //       }
  //     } else {
  //       console.log(' ga login', loggedIn)
  //       next()
  //     }
  //   } else {
  //     console.log(' else paling ngisor')
  //     next()
  //   }
  // })
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth) && !LocalStorage.getItem('token')) {
      next({ path: '/login' })
    } else if (!to.matched.some(record => record.meta.requireAuth) && LocalStorage.getItem('token')) {
      next({ path: '/' })
    } else {
      next()
    }
  })

  Router.onError(error => {
    console.log('router', error)
  })

  return Router
})
