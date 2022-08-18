<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Beban"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          />
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
  </q-page>
</template>
<script setup>
import { useBebanTable } from 'src/stores/beban/table'
import { useBebanFormStore } from 'src/stores/beban/form'
import formDialog from './FormDialog.vue'

const table = useBebanTable()
const store = useBebanFormStore()

table.getDataTable()
</script>
