<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
          @click="close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h6 text-center">
          {{ titleCase(setting.info.nama) }}
        </div>
        <div class="text-h6 text-center">
          Laporan Details Stok
        </div>
        <div class="text-caption text-center">
          {{ titleCase(stok.periode) }}
        </div>
      </q-card-section>
      <q-card-section>
        <MoreTable />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useLaporanMoreProduct } from 'src/stores/laporan/stok/more'
import { useSettingStore } from 'src/stores/setting/setting'
import { titleCase } from 'src/modules/formatter'
import MoreTable from './MoreTable.vue'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'

const setting = useSettingStore()
const stok = useLaporanStokTable()
const more = useLaporanMoreProduct()
const close = () => {
  more.setParams('page', 1)
}
</script>
