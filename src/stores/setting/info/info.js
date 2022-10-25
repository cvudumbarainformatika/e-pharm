import { defineStore } from 'pinia'

export const useSettingInfoStore = defineStore('setting_info', {
  state: () => ({
    loading: false,
    form: {},
    infos: []

  }),
  actions: {
    setForm(key, val) {
      this.form[key] = val
    }
  }
})
