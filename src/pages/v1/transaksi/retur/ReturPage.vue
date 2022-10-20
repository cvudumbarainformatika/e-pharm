<template>
  <q-page>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-4">
        <ReturCard />
      </div>
      <div class="col-4">
        <ReturPenjualan />
      </div>
    </div>

    <div class="row">
      <router-view />
    </div>
  </q-page>
</template>
<script setup>
import { routerInstance } from 'src/boot/router'
import { useReturTable } from 'src/stores/transaksi/retur/detail/retur'
import { useReturDetailTable } from 'src/stores/transaksi/retur/detail/transaction'
import { onMounted } from 'vue'
import ReturCard from './ReturCard.vue'
import ReturPenjualan from './ReturPenjualan.vue'

onMounted(() => {
  const slug = routerInstance.currentRoute.value.params.slug
  if (slug !== undefined) {
    const transactionTable = useReturDetailTable()
    const retur = useReturTable()
    transactionTable.setToday()
    transactionTable.getDetailTransaksi(slug)
    retur.getDetailTransaksi('R' + slug)
  }
  // console.log('retur Slug', slug)
})
</script>
