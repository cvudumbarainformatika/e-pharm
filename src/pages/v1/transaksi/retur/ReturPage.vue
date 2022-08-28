<template>
  <q-page>
    <div class="row">
      <ReturCard />
      <!-- <div class="col-2">
      </div>
      <div class="col-10">
        <q-page>
        </q-page>
      </div> -->
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

onMounted(() => {
  const slug = routerInstance.currentRoute.value.params.slug
  if (slug !== undefined) {
    const transactionTable = useReturDetailTable()
    const retur = useReturTable()
    transactionTable.setToday()
    transactionTable.getDetailTransaksi(slug)
    retur.getDetailTransaksi('R' + slug)
  }
  console.log('retur Slug', slug)
})
</script>
