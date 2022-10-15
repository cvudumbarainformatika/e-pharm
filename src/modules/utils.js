import { Notify, Loading, QSpinnerCube } from 'quasar'
import { routerInstance } from 'boot/router'
import * as storage from 'src/modules/storage'

const removeToken = () => {
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
  storage.deleteUser()
  routerInstance.replace('/login')
}

const notifErr = (resp) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  const status = resp ? resp.status : 500

  // unauthenticated
  console.log('utility', resp)
  if (resp.status === 401 || resp.statusText === 'Unauthorized' || resp.data.message === 'Unauthenticated.') {
    return removeToken()
  }

  //   if (status === 200) {

  if (status === 422) {
    const msgs = resp.data
    for (const key in msgs) {
      if (key === 'error') {
        Notify.create({
          message: msgs.error,
          icon: 'icon-eva-message-circle-outline',
          position: 'bottom-right',
          color: 'negative',
          actions: [
            { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
          ]
        })
      } else {
        Notify.create({
          message: msgs[key][0],
          icon: 'icon-eva-message-circle-outline',
          position: 'bottom-right',
          color: 'negative',
          actions: [
            { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
          ]
        })
      }
    }
  } else {
    Notify.create({
      message: 'Ada Kesalahan Harap ulangi',
      icon: 'icon-eva-message-circle-outline',
      position: 'bottom-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }
}
const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees!, Wow Kerja Bagus!'
  Notify.create({
    message: msg || 'Sucees!, Wow Kerja Bagus!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'bottom-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifCenterVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'center',
    color: 'primary',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrCenterVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'center',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-primary text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'primary',
      spinnerSize: 30
    })
  } else {
    Loading.hide()
  }
}
const uniqueId = () => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substring(2, 7)
  return dateString + randomness
}

const filterDuplicateArrays = (array) => {
  const data = array.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  return data
}

const findWithAttr = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i
    }
  }
  return -1
}
const findWithTwoAttr = (array, attr, value, attr2, value2) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value && array[i][attr2] === value2) {
      return i
    }
  }
  return -1
}

const changeArrayIndex = (array, from, to) => {
  const toIn = array.indexOf(to)
  const fromIn = array.indexOf(from)
  const element = array.splice(fromIn, 1)[0]
  array.splice(toIn, 0, element)
}

const detailBesar = (qty, pengali) => {
  return Math.floor(qty / pengali)
}
const detailKecil = (qty, pengali) => {
  const temp = ((qty / pengali) - Math.floor(qty / pengali)) * pengali
  // console.log('kecil', temp)
  return Math.round(temp)
}

export {
  detailKecil,
  detailBesar,
  notifSuccess,
  notifErr,
  notifErrVue,
  notifErrCenterVue,
  waitLoad,
  uniqueId,
  notifCenterVue,
  filterDuplicateArrays,
  findWithAttr,
  findWithTwoAttr,
  changeArrayIndex
}
