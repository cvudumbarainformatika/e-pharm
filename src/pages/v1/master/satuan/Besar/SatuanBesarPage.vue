<template>
  <div class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Satuan Besar"
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
            <!-- <template #col-name>
              <div>nama</div>
            </template> -->
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
  </div>
</template>
<script setup>
import { useSatuanBesarStore } from 'src/stores/master/satuan/besar/crud'
import { useSatuanBesarFormStore } from 'src/stores/master/satuan/besar/form'
import formDialog from './FormDialog.vue'

const table = useSatuanBesarStore()
const store = useSatuanBesarFormStore()

table.getSatuan()
</script>
