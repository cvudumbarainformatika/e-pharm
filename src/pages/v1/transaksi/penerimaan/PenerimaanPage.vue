<template>
  <q-page class="bg-white">
    <div class="row">
      <div class="col-12">
        <SearchPenerimaan />
      </div>
    </div>
    <div class="row">
      <div
        v-if="store.items.length"
        class="col-12"
      >
        <ListPage />
      </div>
      <div
        v-if="!store.items.length"
        class="col-12"
      >
        <NoDataPage />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import SearchPenerimaan from './SearchPenerimaan.vue'
import NoDataPage from './NoDataPage.vue'
import ListPage from './pendapatan/ListPage.vue'
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
import { onMounted } from 'vue'
const store = usePenerimaanTransaksiFormStore()

onMounted(() => {
  store.getDataKasirs()
  store.getDataPenerimaan()
  store.getDataDistributor()
})
// coment sik
</script>
