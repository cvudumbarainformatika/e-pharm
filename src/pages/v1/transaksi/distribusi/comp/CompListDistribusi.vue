<template>
  <app-table-extend
    :columns="store.columns"
    :column-hide="store.columnHide"
    :items="store.items"
    :meta="store.meta"
    :per-page="store.params.per_page"
    :loading="store.loading"
    :to-search="store.params.q"
    :click-able="true"
    :default-btn="false"
    :ada-tambah="false"
    :ada-filter="false"
    :tanda-tangan="false"
    row-no
    @find="store.setSearch"
    @goto="store.setPage"
    @set-row="store.setPerPage"
    @refresh="store.refreshTable"
    @on-click="onClick"
  >
    <template #col-nomor>
      Nomor
    </template>
    <template #col-tanggal>
      Tanggal
    </template>
    <template #col-asal>
      Dikirim Oleh
    </template>
    <template #col-menuju>
      Tujuan Pengiriman
    </template>
    <template #col-pic>
      PIC
    </template>

    <template #cell-nomor="{row}">
      {{ row?.nodistribusi }}
    </template>
    <template #cell-tanggal="{row}">
      <div
        v-if="row?.tgl_distribusi"
        class="row no-wrap q-col-gutter-sm"
      >
        <div
          class="col-4"
          style="min-width:fit-content"
        >
          Dikirim :
        </div>
        <div
          class="col-8"
          style="min-width:fit-content"
        >
          {{ dateFullFormat( row?.tgl_distribusi) }}
        </div>
      </div>
      <div
        v-if="row?.tgl_terima"
        class="row no-wrap q-col-gutter-sm"
      >
        <div
          class="col-4"
          style="min-width:fit-content"
        >
          Diterima :
        </div>
        <div
          class="col-8"
          style="min-width:fit-content"
        >
          {{ dateFullFormat(row?.tgl_terima) }}
        </div>
      </div>
    </template>
    <template #cell-asal="{row}">
      {{ row?.asal?.namacabang }}
    </template>
    <template #cell-menuju="{row}">
      {{ row?.menuju?.namacabang }}
    </template>
    <template #cell-pic="{row}">
      <div
        v-if="row?.pengirim"
        class="row no-wrap q-col-gutter-sm"
      >
        <div
          class="col-4"
          style="min-width:fit-content"
        >
          Pengirim :
        </div>
        <div
          class="col-8"
          style="min-width:fit-content"
        >
          {{ row?.pengirim }}
        </div>
      </div>
      <div
        v-if="row?.penerima"
        class="row no-wrap q-col-gutter-sm"
      >
        <div
          class="col-4"
          style="min-width:fit-content"
        >
          Penerima :
        </div>
        <div
          class="col-8"
          style="min-width:fit-content"
        >
          {{ row?.penerima }}
        </div>
      </div>
    </template>
    <template #expand="{ row }">
      <div v-if="row?.details?.length">
        <div class="row no-wrap text-weight-bold bg-dark text-white ">
          <div
            class="col-auto q-pa-xs"
            style="width:5%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            No
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:35%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Produk
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:20%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Masuk
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:20%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Keluar
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:20%; border-top: 1px solid white; border-left: 1px solid white; border-right: 1px solid white"
          >
            Subtotal
          </div>
        </div>
        <div
          v-for="(det,i) in row?.details"
          :key="det"
        >
          <div class="row no-wrap ">
            <div
              class="col-auto q-pa-xs"
              style="width:5%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ i+1 }}
            </div>
            <div
              class="col-auto q-pa-xs"
              style="width:35%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ det?.produk?.nama }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:20%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ setMasuk(row,det) }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:20%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ setKeluar(row,det) }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:20%; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black"
            >
              {{ formatDouble(det?.subtotal) }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <app-no-data />
      </div>
    </template>
  </app-table-extend>
</template>
<script setup>
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useSettingStore } from 'src/stores/setting/setting'
import { useListDistribusiStore } from 'src/stores/transaksi/distribusi/list'
import { onMounted } from 'vue'

const store = useListDistribusiStore()
// setting
const setting = useSettingStore()
function setMasuk(row, det) {
  // console.log(setting?.kodecabang)
  return row?.tujuan === setting?.kodecabang ? det?.qty ?? 0 : 0
}
function setKeluar(row, det) {
  // console.log(setting?.kodecabang)
  return row?.dari === setting?.kodecabang ? det?.qty ?? 0 : 0
}
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

onMounted(() => {
  store.getDataTable()
})
</script>
