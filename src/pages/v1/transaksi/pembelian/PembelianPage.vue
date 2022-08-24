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
// import { onMounted } from 'vue'
import TablePage from './TablePage.vue'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { routerInstance } from 'src/boot/router'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
// import { uniqueId } from 'src/modules/utils'
// import { uniqueId } from 'src/modules/utils'
// const coba = () => {
// const slug = 'PBL-' + uniqueId()
// routerInstance.currentRoute.value.params.slug = slug
// routerInstance.replace({ name: 'transaksi.pembelian', params: { slug } })
// }
const table = usePembelianTable()
const store = usePembelianDialog()
table.form.reff = routerInstance.currentRoute.value.params.slug
store.form.reff = routerInstance.currentRoute.value.params.slug
table.getDetailTransaksi()

// const uId = ref('')
table.ambilDataProduk()
// onMounted(() => {
// })
</script>
