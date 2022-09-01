import { defineStore } from 'pinia'

export const useHistoryTable = defineStore('history_table', {
  state: () => ({
    rows: [],
    columns: [],
    loading: false,
    selected: false,
    params: {
      q: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
    }
  })
})
