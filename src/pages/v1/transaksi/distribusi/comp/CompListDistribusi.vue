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
    <template #cell-Aksi="{row}">
      <!-- {{ row?.dari }}{{ setting?.kodecabang }} -->
      <div class="row">
        <div v-if="row?.dari === setting?.kodecabang && row.status===2">
          <q-btn
            dense
            icon="icon-mat-send"
            color="primary"
            flat
            @click="distribusikan(row)"
          >
            <q-tooltip>Distribusikan</q-tooltip>
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
            style="width:15%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Kode Produk
          </div>

          <div
            class="col-auto q-pa-xs"
            style="width:15%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Permintaan
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:15%; border-top: 1px solid white; border-left: 1px solid white;"
          >
            Masuk
          </div>
          <div
            class="col-auto q-pa-xs"
            style="width:15%; border-top: 1px solid white; border-left: 1px solid white; border-right: 1px solid white"
          >
            Keluar
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
              style="width:15%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              {{ det?.kode_produk }}
            </div>

            <div
              class="col-auto text-right q-pa-xs"
              style="width:15%; border-bottom: 1px solid black; border-left: 1px solid black; "
            >
              {{ det?.jumlah }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:15%; border-bottom: 1px solid black; border-left: 1px solid black;"
            >
              <!-- <div v-if="(row?.tujuan === setting?.kodecabang) && row.flag==='2'">
                <app-input
                  v-model="det.qty"
                  label="Jumlah Distribusi"
                  class="text-right"
                  outlined
                  @update:model-value="updateQty"
                />
              </div>
              <div v-else>
              </div> -->
              {{ setMasuk(row,det) }}
            </div>
            <div
              class="col-auto text-right q-pa-xs"
              style="width:15%; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black"
            >
              <div v-if="(row?.dari === setting?.kodecabang) && row.status===2">
                <app-input
                  v-model="det.qty"
                  label=" "
                  class="text-right"
                  outlined
                  @update:model-value="updateQty"
                />
              </div>
              <div v-else>
                {{ setKeluar(row,det) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <app-no-data />
      </div>
    </template>
  </app-table-extend>
  <q-dialog
    v-model="isOpen"
    persistent
  >
    <q-card style="min-width: 70%">
      <q-card-section>
        <div class="row text-weight-bold f-18 q-ma-md justify-center">
          KONFIRMASI
        </div>
        <div class="row f-14 q-ma-md">
          {{ message }}
        </div>
        <div v-if="gasama?.length">
          <div class="row bg-dark text-white">
            <div class="col-1">
              No
            </div>
            <div class="col-5">
              Produk
            </div>
            <div class="col-3">
              Permintaan
            </div>
            <div class="col-3">
              Distribusi
            </div>
          </div>
          <div
            v-for="(item,i) in gasama"
            :key="item"
          >
            <div class="row">
              <div class="col-1">
                {{ i+1 }}
              </div>
              <div class="col-5">
                {{ item?.produk?.nama }}
              </div>
              <div class="col-3">
                {{ item?.jumlah }}
              </div>
              <div class="col-3">
                {{ item?.qty }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <div class="q-mr-sm">
          <q-btn
            label="Batal"
            color="dark"
            push
            no-caps
            :loading="data?.loading"
            :disable="data?.loading"
            @click="isOpen=false"
          />
        </div>
        <div class="q-mr-md">
          <q-btn
            label="Distribusikan"
            color="primary"
            push
            no-caps
            :loading="data?.loading"
            :disable="data?.loading"
            @click="kirim()"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { date } from 'quasar'
import { routerInstance } from 'src/boot/router'
import { dateFullFormat } from 'src/modules/formatter'
import { useSettingStore } from 'src/stores/setting/setting'
import { useListDistribusiStore } from 'src/stores/transaksi/distribusi/list'
import { onMounted, ref } from 'vue'

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
// eslint-disable-next-line no-unused-vars
function updateQty(val) {
  console.log(val)
}
const isOpen = ref(false)
const message = ref('')
const data = ref(null)
const gasama = ref(null)
function distribusikan(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  isOpen.value = true
  gasama.value = val?.details?.filter(a => a.qty !== a.jumlah)
  if (gasama.value?.length) {
    message.value = 'Jumlah Distribusi Tidak Sama, Apakah Akan dilanjutkan?'
  } else {
    message.value = 'Distribusikan Sesuai Permintaan?'
  }
  data.value = val
}
function kirim() {
  data.value.tgl_distribusi = date.formatDate(Date.now(), 'YYYY-MM-DD')
  store.distribusikan(data.value).then(() => {
    isOpen.value = false
  })
  console.log('kirim')
}
function print(val) {
  console.log(val)
  val.expand = !val.expand
  val.highlight = !val.highlight
  const newRoute = routerInstance.resolve({
    path: '/printdist',
    name: 'printdist',
    params: { slug: val?.id }
  })
  // console.log('ro', newRoute.href, newRoute)
  window.open(newRoute.href, '_blank')
}
onMounted(() => {
  store.getDataTable()
})
</script>
