<template>
  <q-page class="bg-white">
    <div class="row">
      <div class="col-12">
        <SearchBiaya />
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
import SearchBiaya from './SearchBiaya.vue'
import NoDataPage from './NoDataPage.vue'
import ListPage from './ListPage.vue'
import { useBebanTransaksiFormStore } from 'src/stores/transaksi/biaya/form'
import { onMounted } from 'vue'
const store = useBebanTransaksiFormStore()

onMounted(() => {
  store.getDataKasirs()
  store.getDataBeban()
})
// coment sik
</script>
