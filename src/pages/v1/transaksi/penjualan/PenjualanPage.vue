<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <TablePage />
    </div>
    <!-- <q-btn @click="coba">
      coba router
    </q-btn> -->
  </q-page>
</template>
<script setup>
import TablePage from './TablePage.vue'
import { usePenjualanTable } from 'src/stores/transaksi/penjualan/table'
import { routerInstance } from 'src/boot/router'
import { usePenjualanDialog } from 'src/stores/transaksi/penjualan/form'
// import { uniqueId } from 'src/modules/utils'
import { uniqueId } from 'src/modules/utils'
// const coba = () => {
// routerInstance.currentRoute.value.params.slug = slug
// }

const table = usePenjualanTable()
const store = usePenjualanDialog()

const slug = 'PJL-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug

table.ambilDataDokter()
// table.ambilDataDistributor()
table.getDetailTransaksi().then(data => {
  if (data !== undefined) {
    routerInstance.replace({ name: 'penjualan', params: { slug: oldSlug } })
    table.form.reff = oldSlug
    store.form.reff = oldSlug
  } else {
    routerInstance.replace({ name: 'penjualan', params: { slug } })
    table.resetData()
    store.resetData()
    table.form.reff = slug
    store.form.reff = slug
  }

  table.ambilDataProduk()
  // table.getDataExpired() // ambil data expired coment dulu
})

// const uId = ref('')
// onMounted(() => {
// })
</script>
