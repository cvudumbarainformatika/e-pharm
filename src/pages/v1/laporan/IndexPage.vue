<template>
  <q-page class="q-mb-lg q-pb-lg">
    <div v-if="table.selected">
      <TablePage />
    </div>
    <div v-else>
      <q-card>
        <NoSelectPage />
      </q-card>
    </div>
    <MorphButton />
  </q-page>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import NoSelectPage from './NoSelectPage.vue'
import TablePage from './TablePage.vue'
import MorphButton from './MorphButton.vue'
import { useLaporanMorphStore } from 'src/stores/laporan/button'

const table = useLaporanTable()
const button = useLaporanMorphStore()
table.setColumns()
table.selected = false
button.setDays()
button.setMonths()
table.getDataProducts()
table.getDataBebans()
table.getDataPenerimaans()
</script>
