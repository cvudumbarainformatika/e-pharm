<template>
  <q-page class="q-mb-lg q-pb-lg ">
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
      :class=" setting.dark ? 'page-dark text-white' : 'bg-grey-3 text-primary' + ' print-hide'"
      dense
    >
      <q-tab
        name="transaksi"
        label="Transaksi"
        no-caps
      />
      <q-tab
        name="stok"
        label="Stok"
        no-caps
      />
      <q-tab
        name="keuangan"
        label="Keuangan"
        no-caps
      />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-tab-panel name="transaksi">
          <TopMenu />
          <div v-if="table.selected">
            <!-- <TablePage /> -->
            <TablePage v-if="table.transactionType === 'produk'" />
            <LaporanTransaksi v-if="table.transactionType === 'transaksi'" />
            <TotalPage v-if="table.totalTransaction" />
          </div>
          <div v-else>
            <q-card>
              <app-no-selected-page
                icon="icon-mat-warning"
                text="Belum ada Transaksi yang dipilih"
              />
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="stok">
          <StokTopMenu />
          <app-card :is-header="false">
            <template #content>
              <div class="text-h6 text-center">
                {{ titleCase(setting.info.nama) }}
              </div>
              <div class="text-h6 text-center">
                Laporan Stok
              </div>
              <div class="text-caption text-center">
                {{ titleCase(stok.periode) }}
              </div>
            </template>
          </app-card>
          <StokTable />
        </q-tab-panel>

        <q-tab-panel name="keuangan">
          <KeuanganTopMenu />
          <!-- <div class="text-h6">
            Keuangan
          </div> -->
          <PageKeuangan />
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- <MorphButton /> -->
  </q-page>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import TablePage from './transaksi/TablePage.vue'
// import MorphButton from './MorphButton.vue'
import { useLaporanMorphStore } from 'src/stores/laporan/button'
import LaporanTransaksi from './transaksi/LaporanTransaksi.vue'
import TopMenu from './transaksi/TopMenu.vue'
import { onUnmounted, ref } from 'vue'
import { useSettingStore } from 'src/stores/setting/setting'
import TotalPage from './transaksi/TotalPage.vue'
import { useLaporanTransaksiStore } from 'src/stores/laporan/transaksi'
import StokTopMenu from './stok/StokTopMenu.vue'
import StokTable from './stok/StokTable.vue'
import PageKeuangan from './keuangan/PageKeuangan.vue'
import KeuanganTopMenu from './keuangan/KeuanganTopMenu.vue'
import { useLaporanKeuanganStore } from 'src/stores/laporan/keuangan/keuangan'
import { date } from 'quasar'
import { titleCase } from 'src/modules/formatter'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'

const setting = useSettingStore()

const awalBulan = date.formatDate(Date.now(), 'YYYY-MM-' + '01')

const tab = ref('transaksi')
const table = useLaporanTable()
const button = useLaporanMorphStore()
const transaksi = useLaporanTransaksiStore()
const keuangan = useLaporanKeuanganStore()
const stok = useLaporanStokTable()

transaksi.setColumns()
table.setColumns()
table.selected = true
table.setForm('date', 'bulan')
table.setForm('nama', 'PENJUALAN')
button.setDays()
button.setMonths()
table.beforeGetData()
table.periode = 'Bulan Ini'
keuangan.setParams('from', awalBulan)
// keuangan.setParams('from', '2022-09-20')
// keuangan.setParams('to', '2022-09-21')
// keuangan.setParams('selection', 'range')
// table.periode = 'Tanggal ' + keuangan.params.from + ' - ' + keuangan.params.to
keuangan.getBebans()
keuangan.getPenerimaan()
keuangan.getPenjualan()
// keuangan.prosesHPP()

const reset = () => {
  table.resetData()
  button.date = ''
}
onUnmounted(() => reset())
</script>
