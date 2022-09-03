<template>
  <q-page class="q-mb-lg q-pb-lg">
    <div class="row">
      <div class="col-2">
        <MenuPage />
      </div>
      <div class="col-10">
        <div v-if="table.selected">
          <TablePage />
        </div>
        <div v-else>
          <q-card>
            <NoSelectPage />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useHistoryTable } from 'src/stores/history/table'
import MenuPage from './MenuPage.vue'
import NoSelectPage from './NoSelectPage.vue'
import TablePage from './TablePage.vue'
const table = useHistoryTable()
table.setColumns()
</script>
