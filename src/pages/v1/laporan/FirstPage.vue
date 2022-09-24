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
        transition-prev="scale"
        transition-next="scale"
      >
        <q-tab-panel name="transaksi">
          <TopMenu />
          <div v-if="table.selected">
            <TablePage />
            <!-- <TablePage v-if="table.transactionType === 'produk'" />
      <LaporanTransaksi v-if="table.transactionType === 'transaksi'" /> -->
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
          <div class="text-h6">
            Stok
          </div>
          Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
        </q-tab-panel>

        <q-tab-panel name="keuangan">
          <div class="text-h6">
            Keuangan
          </div>
          Nostrum necessitatibus expedita dolores? Voluptatem repudiandae magni ea.
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
// import LaporanTransaksi from './transaksi/LaporanTransaksi.vue'
import TopMenu from './transaksi/TopMenu.vue'
import { onUnmounted, ref } from 'vue'
import { useSettingStore } from 'src/stores/setting/setting'
import TotalPage from './transaksi/TotalPage.vue'

const setting = useSettingStore()

const tab = ref('transaksi')
const table = useLaporanTable()
const button = useLaporanMorphStore()
table.setColumns()
table.selected = false
button.setDays()
button.setMonths()
const reset = () => {
  table.resetData()
  button.date = ''
}
onUnmounted(() => reset())
</script>
