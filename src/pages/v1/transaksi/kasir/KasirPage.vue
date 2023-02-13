<template>
  <app-card
    title="Kas Kasir"
    desc="Halaman Laporan kas kasir harian"
  >
    <template #content>
      <!-- {{ store.hariIni }} -->
      <div class="row">
        <div class="col-2">
          Penjualan
        </div>
        <div class="col-2">
          {{ store.hariIni ? formatRp(store.hariIni.penjualan) :0 }}
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          Retur Penjualan
        </div>
        <div class="col-2">
          {{ store.hariIni ? formatRp(store.hariIni.retur_penjualan) :0 }}
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          kas keluar
        </div>
        <div class="col-2">
          {{ store.hariIni ? formatRp(store.hariIni.keluar) :0 }}
        </div>
      </div>
      <q-separator />
      <div class="row">
        <div class="col-2">
          Sisa
        </div>
        <div class="col-2">
          {{ formatRp(store.sisaHariIni) }}
        </div>
      </div>
    </template>
  </app-card>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useKasirStore } from 'src/stores/transaksi/kasir/kasir'

const store = useKasirStore()
store.getInitialData()
</script>
