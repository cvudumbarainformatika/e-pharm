<template>
  <div>
    <q-page class="q-mb-lg q-pb-lg">
      <!-- <q-menu
        v-model="table.tableMenu"
        transition-show="slide-right"
        transition-hide="slide-left"
        :offset="[0,-600]"
      >
        <MenuPage />
      </q-menu> -->
      <div v-if="table.selected">
        <TablePage />
      </div>
      <div v-else>
        <q-card>
          <app-no-selected-page icon="icon-mat-arrow_back" />
        </q-card>
      </div>
    </q-page>
  </div>
</template>
<script setup>
import { useHistoryTable } from 'src/stores/history/table'
// import MenuPage from './MenuPage.vue'
import TablePage from './TablePage.vue'
const table = useHistoryTable()
table.setColumns()
table.selected = true
if (!table.params.nama) {
  table.nama = 'all'
  table.setParams('nama', 'all')
  table.title = 'Seluruhnya'
}
table.getDataTransactions()
</script>
