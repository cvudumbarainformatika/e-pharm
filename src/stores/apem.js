/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('level')
  if (to.matched.some((record) => record.meta.loggedIn)) {
    // jika to ketememu sama meta loggedIn yang true
    // maka jika dia tidak login, kembalikan ke halaman login

    if (store.getters.loggedIn) {
      if (to.matched.some((record) => record.meta.role == 'Produksi')) {
        if ((store.getters.levelAccess || role) == 'Produksi') {
          next()
        } else {
          next({ path: '/home' })
        }
      } else if (to.matched.some((record) => record.meta.role == 'Packing')) {
        if ((store.getters.levelAccess || role) == 'Packing') {
          next()
        } else {
          next({ path: '/home' })
        }
      } else if (to.matched.some((record) => record.meta.role == 'Supplier')) {
        if ((store.getters.levelAccess || role) == 'Supplier') {
          next()
        } else {
          next({ path: '/home' })
        }
      } else if (to.matched.some((record) => record.meta.role == 'Mitra')) {
        if ((store.getters.levelAccess || role) == 'Mitra') {
          next()
        } else {
          next({ path: '/home' })
        }
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  } else if (to.matched.some((record) => record.meta.waitingVerified)) {
    if (store.getters.waitingVerified) {
      next()
    } else {
      switch (store.getters.levelAccess || role) {
        case 'Produksi':
          next({ path: '/home/produksi' })
          break
        case 'Packing':
          next({ path: '/home/packing' })
          break
        case 'Mitra':
          next({ path: '/home/mitra' })
          break
        case 'Supplier':
          next({ path: '/home/supplier' })
          break

        default:
          next({ path: '/home' })
          break
      }
    }
  } else if (to.matched.some((record) => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      switch (store.getters.levelAccess || role) {
        case 'Produksi':
          next({ path: '/home/produksi' })
          break
        case 'Packing':
          next({ path: '/home/packing' })
          break
        case 'Mitra':
          next({ path: '/home/mitra' })
          break
        case 'Supplier':
          next({ path: '/home/supplier' })
          break

        default:
          next({ path: '/home' })
          break
      }
    } else if (store.getters.waitingVerified) {
      next({ path: '/waiting' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.verified)) {
    if (store.getters.waitingVerified) {
      next({ path: '/waiting' })
    } else {
      next()
    }
  } else {
    next()
  }
})
