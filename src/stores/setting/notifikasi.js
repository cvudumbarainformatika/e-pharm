import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'

export const useNotificationStore = defineStore('notifikasi', {
  state: () => ({
    loading: false,
    unreadNotif: []
  }),
  actions: {
    getUnreadNotif() {
      this.loading = true
      return new Promise(resolve => {
        api.get('v1/notification/unread')
          .then(resp => {
            this.loading = false
            this.unreadNotif = resp?.data?.unread
            // console.log('cabang', this.dist?.cabangs)
            console.log('unread', this.unreadNotif)

            resolve(resp)
          })
          .catch(() => {
            this.loading = false
            notifErrVue('Gagal Ambil Data dari Cloud')
          })
      })
    },
    readNotif(val) {
      this.loading = true
      return new Promise(resolve => {
        api.post('v1/notification/read', val)
          .then(resp => {
            this.loading = false
            val.is_read = 1
            notifSuccess(resp)
            resolve(resp)
          })
          .catch(() => {
            this.loading = false
            notifErrVue('Gagal Kirim Data ke Cloud')
          })
      })
    }
  }
})
