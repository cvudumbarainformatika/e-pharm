import Print from 'vue3-print-nb'
import JsonExcel from 'vue-json-excel3'

export default async ({ app }) => {
  app.use(Print)
  app.component('DownloadExcel', JsonExcel)
}
