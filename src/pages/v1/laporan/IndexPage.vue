<template>
  <q-page class="q-mb-lg q-pb-lg">
    <!-- <ButtonGroupMenu /> -->
    <TopMenu />
    <div v-if="table.selected">
      <TablePage />
      <!-- <TablePage v-if="table.transactionType === 'produk'" />
      <LaporanTransaksi v-if="table.transactionType === 'transaksi'" /> -->
    </div>
    <div v-else>
      <q-card>
        <NoSelectPage />
      </q-card>
    </div>
    <!-- <MorphButton /> -->
  </q-page>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import NoSelectPage from './NoSelectPage.vue'
import TablePage from './transaksi/TablePage.vue'
// import MorphButton from './MorphButton.vue'
import { useLaporanMorphStore } from 'src/stores/laporan/button'
// import LaporanTransaksi from './transaksi/LaporanTransaksi.vue'
import TopMenu from './transaksi/TopMenu.vue'
import { onUnmounted } from 'vue'
// import ButtonGroupMenu from './ButtonGroupMenu.vue'

const table = useLaporanTable()
const button = useLaporanMorphStore()
table.setColumns()
table.selected = false
button.setDays()
button.setMonths()
table.getDataProducts()
table.getDataBebans()
table.getDataPenerimaans()
const reset = () => {
  table.resetData()
  button.date = ''
}
onUnmounted(() => reset())
</script>
