<template>
  <app-card
    title="Kas Kasir"
    desc="Halaman Laporan kas kasir harian"
  >
    <template #content>
      <div v-if="store.items?.length">
        <div
          v-for="item in store.items"
          :key="item"
          class="q-ma-md"
        >
          <div class="row">
            <div class="col-2 text-weight-bold">
              Nama Kasir
            </div>
            <div class="col-6 text-weight-bold">
              {{ item?.name }}
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              Penjualan
            </div>
            <div class="col-2">
              {{ !isNaN(item?.penjualan) ? formatRp(item?.penjualan) :0 }}
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              Retur Penjualan
            </div>
            <div class="col-2">
              {{ !isNaN(item?.retur) ? formatRp(item?.retur) :0 }}
            </div>
          </div>

          <q-separator />
          <div class="row">
            <div class="col-2">
              Sisa
            </div>
            <div class="col-2">
              {{ formatRp(item.sisaHariIni) }}
            </div>
          </div>
        </div>
        <div class="row text-weight-bold">
          <div class="col-2">
            Total Kas Hari Ini
          </div>
          <div class="col-auto">
            {{ formatRp(store.items?.reduce((a,b)=>parseFloat(a)+parseFloat(b.sisaHariIni),0)) }}
          </div>
        </div>
      </div>
      <div v-if="!store.items?.length">
        <app-no-data />
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
