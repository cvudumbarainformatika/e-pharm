<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-stok
            title="Details Stok"
            :columns="more.columns"
            :column-hide="more.columnHide"
            :items="more.items"
            :meta="more.meta"
            :per-page="more.params.per_page"
            :order-by="more.params.order_by"
            :sort="more.params.sort"
            :loading="more.loading"
            :to-search="more.params.q"
            @seemore="more.seeMore"
            @goto="more.setPage"
            @set-row="more.setPerPage"
            @refresh="more.refreshTable"
            @find="more.setSearch"
            @set-order="more.setOder"
            @new-data="more.newData"
            @edit-data="more.editData"
            @delete="more.deletesData"
            @adjust="more.editData"
          >
            <template #col-qty>
              <div>Jumlah</div>
            </template>
            <template #col-product_id>
              <div>Nama</div>
            </template>
            <template #cell-product_id="{row}">
              <div>
                {{ row.nama }}
              </div>
            </template>
            <template #col-transaksi>
              <div>Transaksi</div>
            </template>
            <template #col-tanggal>
              <div>Tanggal</div>
            </template>
            <template #cell-tanggal="{row}">
              <div>{{ dateFullFormat(row.tanggal) }}</div>
            </template>
          </app-table-stok>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
  </q-page>
</template>
<script setup>
import { useLaporanMoreProduct } from 'src/stores/laporan/stok/more'
import { dateFullFormat } from 'src/modules/formatter'

const more = useLaporanMoreProduct()

// table.getDataStok()
</script>
