<template>
  <q-page>
    <div>
      <app-card :is-header="false">
        <template #content>
          <!-- <q-card-section> -->
          <app-table-stok
            title="Data Stok"
            ada-search
            ada-see-more
            ada-adjust
            ada-refresh
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
            <template #col-stokAwal>
              <div>Stok Awal Master</div>
            </template>
            <template #col-kode_produk>
              <div>Kode Produk</div>
            </template>
            <template #col-stok_awal>
              <div>Stok Awal Periode</div>
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
                {{ row?.rak?.nama }}
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
          <!-- </q-card-section> -->
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
import { date } from 'quasar'

const awalBulan = date.formatDate(Date.now(), 'YYYY-MM-' + '01')
const table = useLaporanStokTable()
const more = useLaporanMoreProduct()
table.penyesuaian.reff = 'FPST-' + uniqueId()

table.setForm('from', awalBulan)
table.setForm('selection', 'tillToday')
table.setPeriode()
table.getDataStok()
</script>
