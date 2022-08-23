<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <TablePage />
    </div>
  </q-page>
</template>
<script setup>
import { onMounted } from 'vue'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { uniqueId } from 'src/modules/utils'
import TablePage from './TablePage.vue'

// const uId = ref('')
const table = usePembelianTable()
onMounted(() => {
  table.form.reff = 'PBL#-' + uniqueId()
  table.ambilDataProduk()
})
</script>
