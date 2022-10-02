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
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <MoreTable />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import MoreTable from './MoreTable.vue'
// import { useLaporanStokTable } from 'src/stores/laporan/stok/table'

// const table = useLaporanStokTable()
</script>
