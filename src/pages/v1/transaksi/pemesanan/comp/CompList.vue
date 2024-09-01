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
      Tanggal Pemesanan
    </template>
    <template #col-distributor>
      Distributor
    </template>

    <template #cell-nomor="{row}">
      {{ row?.nopemesanan }}
    </template>
    <template #cell-tanggal="{row}">
      <div
        class="row no-wrap "
      >
        {{ dateFullFormat( row?.tgl_pemesanan) }}
      </div>
    </template>
    <template #cell-distributor="{row}">
      {{ row?.supplier?.nama }}
    </template>
    <template #cell-Aksi="{row}">
      <!-- {{ row?.dari }}{{ setting?.kodecabang }} -->
      <div class="row items-center">
        <div
          v-if="row.flag==='2'"
          class="q-mr-xs"
        >
          <q-btn
            dense
            icon="icon-mat-lock"
            color="primary"
            flat
            :loading="row?.loading"
            :disable="store.loadingKunci"
            @click="bukaKunci(row)"
          >
            <q-tooltip>Buka Kunci</q-tooltip>
          </q-btn>
        </div>
        <div>
          <q-btn
            dense
            icon="icon-mat-print"
            color="dark"
            round
            size="sm"
            @click="print(row)"
          >
            <q-tooltip>Print</q-tooltip>
          </q-btn>
        </div>
      </div>
    </template>
    <template #expand="{ row }">
      <div v-if="row?.detail?.length">
        <div class="row no-wrap text-weight-bold bg-dark text-white ">
          <div
            class="col-auto q-pa-xs"
            style="width:5%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            No
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:40%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Produk
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:20%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Kode Produk
          </div>

          <div
            class="col-auto q-pa-xs"
            style="width:15%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            jumlah
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:20%; border-top: 1px solid white; border-left: 1px solid white; border-right: 1px solid white"
          >
            Satuan
          </div>
        </div>
        <div
          v-for="(det,i) in row?.detail"
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
              style="width:40%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ det?.produk?.nama }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:20%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ det?.kode_produk }}
            </div>

            <div
              class="col-auto text-right q-pa-xs"
              style="width:15%; border-bottom: 1px solid black; border-left: 1px solid black; "
            >
              {{ det?.qty }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:20%; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black"
            >
              {{ det?.satuan }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <app-no-data />
      </div>
    </template>
  </app-table-extend>
  <compPrint v-model="store.printOpen" />
</template>
<script setup>
// import { date } from 'quasar'
import { dateFullFormat } from 'src/modules/formatter'
import { useListPemesananStore } from 'src/stores/transaksi/pemesanan/list'
import { onMounted } from 'vue'

const store = useListPemesananStore()
import compPrint from './CompPrint.vue'

function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
// eslint-disable-next-line no-unused-vars
function updateQty(val, item) {
  item.subtotal = parseFloat(item.qty) * parseFloat(item?.harga)
  console.log(val, item.subtotal, item)
}

function bukaKunci(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.bukaKunci(val)
}

function print(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  store.printOpen = true
  store.toPrint = val
  // console.log('ro', newRoute.href, newRoute)
  // window.open(newRoute.href, '_blank')
}
onMounted(() => {
  store.getDataTable()
})
</script>
