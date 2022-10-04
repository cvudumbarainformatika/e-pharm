<template>
  <q-menu
    v-model="menu.isOpen"
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
        pilih range
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { useLaporanKeuanganMenuStore } from 'src/stores/laporan/keuangan/menu'

const menu = useLaporanKeuanganMenuStore()
</script>
