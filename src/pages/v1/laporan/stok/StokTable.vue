<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-stok
            title="Data Stok"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.form.per_page"
            :order-by="table.form.order_by"
            :sort="table.form.sort"
            :loading="table.loading"
            :to-search="table.form.q"
            @seemore="table.seeMore"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="table.newData"
            @edit-data="table.editData"
            @delete="table.deletesData"
            @adjust="table.editData"
          >
            <template #col-barcode>
              <div>Barcode</div>
            </template>
            <template #col-stok_awal>
              <div>Stok Awal</div>
            </template>
            <template #cell-stok_awal="{row}">
              <div>
                {{ row.stok_awal }}
              </div>
            </template>
            <template #col-nama>
              <div>Nama</div>
            </template>
            <template #col-stokBerjalan>
              <div>Stok Berjalan</div>
            </template>
            <template #col-rak>
              <div>Rak</div>
            </template>
            <template #cell-rak="{row}">
              <div>
                {{ row.rak.nama }}
              </div>
            </template>
            <template #col-stokSekarang>
              <div>Stok Sekarang</div>
            </template>
            <template #cell-stokSekarang="{row}">
              <div
                v-if="row.stokSekarang<0"
                class="text-negative text-weight-bold"
              >
                {{ row.stokSekarang }}
              </div>
              <div v-else>
                {{ row.stokSekarang }}
              </div>
            </template>
            <template #col-returPenjualan>
              <div>Retur Penjualan</div>
            </template>
          </app-table-stok>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <formDialog v-model="table.formOpen" />
    <DialogSeeMore v-model="more.isOpen" />
  </q-page>
</template>
<script setup>
import { uniqueId } from 'src/modules/utils'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'
import formDialog from './FormDialog.vue'
import DialogSeeMore from './DialogSeeMore.vue'
import { useLaporanMoreProduct } from 'src/stores/laporan/stok/more'

const table = useLaporanStokTable()
const more = useLaporanMoreProduct()
table.penyesuaian.reff = 'FPST-' + uniqueId()

// table.getDataStok()
</script>
