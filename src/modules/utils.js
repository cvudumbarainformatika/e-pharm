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
  if (resp.status === 401 && resp.statusText === 'Unauthorized') {
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

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-dark text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
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

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

export {
  notifSuccess,
  notifErr,
  notifErrVue,
  waitLoad,
  uniqueId,
  notifCenterVue,
  filterDuplicateArrays,
  titleCase
}
