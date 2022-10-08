<template>
  <q-menu
    position="left"
    persistent
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
      <q-card-section
        horizontal
        class="row items-start no-wrap"
        style="padding:2px;"
      >
        <q-card-section class="q-pb-sm text-center text-subtitle2">
          <div
            v-if="store.date === 'range'"
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
            v-if="store.date === 'spesifik'"
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
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useLaporanKeuanganStore } from 'src/stores/laporan/keuangan/keuangan'
import { ref } from 'vue'
const store = useLaporanKeuanganStore()

const rangeDate = ref({ from: null, to: null })
const tgl = ref(null)

const rangeSelected = () => {
  // store.params.from = rangeDate.value.from
  // store.params.to = rangeDate.value.to
  store.setParams('from', rangeDate.value.from)
  store.setParams('to', rangeDate.value.to)
  store.setPeriode('Tanggal ' + dateFullFormat(rangeDate.value.from) + ' - ' + dateFullFormat(rangeDate.value.to))
  store.getPenjualan()
  // store.prosesHPP()
  store.setRange()
}
const spesifikSelected = () => {
  // store.params.from = tgl.value
  store.setParams('from', tgl.value)
  store.setPeriode('Tanggal ' + dateFullFormat(tgl.value))
  store.getPenjualan()
  // store.prosesHPP()
  store.setSpesifik()
}

</script>
