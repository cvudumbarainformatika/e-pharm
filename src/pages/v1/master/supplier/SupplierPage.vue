<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Distributor"
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
          >
            <template #cell-perusahaan="{row}">
              <div>{{ row?.perusahaan?.nama }}</div>
            </template>
            <template #col-saldo_awal_hutang>
              <div>saldo awal hutang</div>
            </template>
            <template #cell-saldo_awal_hutang="{row}">
              <div>{{ formatter.formatRp(row.saldo_awal_hutang) }}</div>
            </template>
          </app-table>
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
import { useSupplierTable } from 'src/stores/master/supplier/table'
import { useSupplierFormStore } from 'src/stores/master/supplier/form'
import * as formatter from 'src/modules/formatter'
import formDialog from './FormDialog.vue'

const table = useSupplierTable()
const store = useSupplierFormStore()

table.getDataTable()
</script>
