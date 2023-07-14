<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            :key="table.items"
            title="Data Produk"
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
            <template #col-stok_awal>
              <div>stok awal</div>
            </template>
            <template #col-limit_stok>
              <div>limit stok</div>
            </template>
            <template #col-harga_beli>
              <div>harga beli</div>
            </template>
            <template #col-harga_jual_umum>
              <div>harga jual Reguler</div>
            </template>
            <template #col-harga_jual_resep>
              <div>harga jual resep</div>
            </template>
            <template #col-harga_jual_cust>
              <div>harga jual grosir</div>
            </template>
            <template #col-satuanBesar>
              <div>satuan besar</div>
            </template>
            <template #cell-satuan="{row}">
              <div>{{ row.satuan !==null ? row.satuan.nama : '-' }}</div>
            </template>
            <template #cell-satuanBesar="{row}">
              <div>{{ row.satuanBesar !==null ? row.satuanBesar.nama : '-' }}</div>
            </template>
            <template #cell-merk="{row}">
              <div>{{ row.merk===null ? '' : row.merk.nama }}</div>
            </template>
            <template #cell-rak="{row}">
              <div>{{ row.rak.nama }}</div>
            </template>
            <template #cell-kategori="{row}">
              <div>{{ row.kategori !==null? row.kategori.nama : '-' }}</div>
            </template>
            <template #cell-harga_beli="{row}">
              <div>{{ formatter.formatRpDouble(row.harga_beli) }}</div>
            </template>
            <template #cell-harga_jual_umum="{row}">
              <div>{{ formatter.formatRpDouble(row.harga_jual_umum) }}</div>
            </template>
            <template #cell-harga_jual_resep="{row}">
              <div>{{ formatter.formatRpDouble(row.harga_jual_resep) }}</div>
            </template>
            <template #cell-harga_jual_cust="{row}">
              <div>{{ formatter.formatRpDouble(row.harga_jual_cust) }}</div>
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
import { useProdukTable } from 'src/stores/master/produk/table'
import { useProdukFormStore } from 'src/stores/master/produk/form'
import * as formatter from 'src/modules/formatter'
import formDialog from './FormDialog.vue'

// import { ref } from 'vue'

const table = useProdukTable()
const store = useProdukFormStore()

table.getDataTable()
</script>
