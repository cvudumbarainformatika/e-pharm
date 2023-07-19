<template>
  <!-- v-model="table.isOpen" -->
  <!-- persistent -->
  <q-menu
    position="left"
    transition-show="jump-right"
    transition-hide="jump-left"
    fit
    :offset="[6,7]"
    style=" min-height: 450px;"
  >
    <q-card style=" max-width: fit-content; min-height: 450px;">
      <q-bar>
        <q-btn
          v-close-popup
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="q-pb-sm text-center text-subtitle2">
        <q-list
          bordered
          padding
          class="rounded-borders"
        >
          <div
            v-if="table.date === 'range'"
            class="text-primary"
          >
            <q-date
              v-model="rangeDate"
              range
            />
            <q-btn
              v-close-popup
              flat
              label="Close"
              @click="rangeSelected"
            />
          </div>
          <div
            v-if="table.date === 'spesifik'"
            class="text-primary"
          >
            <q-date v-model="tgl" />
            <q-btn
              v-close-popup
              flat
              label="Close"
              @click="spesifikSelected"
            />
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { ref } from 'vue'
import { useLaporanMoreProduct } from 'src/stores/laporan/stok/more'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'
const table = useLaporanStokTable()
const more = useLaporanMoreProduct()
const emits = defineEmits(['selected'])

const rangeDate = ref({ from: null, to: null })
const tgl = ref(null)

// const dateSelected = val => {
//   table.date = val.value
//   more.setParams('selection', val.value)
//   if (val.value === 'tillToday') {
//     table.getDataStok()
//     closePopup()
//   }
// }

const rangeSelected = () => {
  // console.log('menu', 'range')
  emits('selected', 'range')
  table.form.from = rangeDate.value.from
  table.form.to = rangeDate.value.to
  more.setParams('from', rangeDate.value.from)
  more.setParams('to', rangeDate.value.to)
  more.setParams('selection', 'range')
  table.setForm('selection', 'range')
  table.setRange()
  table.setPeriode()
  table.getDataStok()
  // closePopup()
}
const spesifikSelected = () => {
  table.form.from = tgl.value
  more.setParams('from', tgl.value)
  more.setParams('selection', 'spesifik')
  table.setForm('selection', 'spesifik')
  emits('selected', 'spesifik')
  table.setSpesifik()
  table.setPeriode()
  table.getDataStok()
  // closePopup()
}

// const closePopup = () => {
//   table.isOpen = !table.isOpen
// }
</script>
