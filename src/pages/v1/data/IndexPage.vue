<template>
  <div class="q-ml-sm q-mt-sm">
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-4">
        <ProductRank
          judul="Bulan ini"
          :data="store.monthly"
        />
      </div>
      <div class="col-4">
        <ProductRank
          judul="Minggu ini"
          :data="store.weekly"
        />
      </div>
      <div class="col-4">
        <ProductRank
          judul="Hari ini"
          :data="store.dayly"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6">
        <barWithLabel
          judul="Bulan ini"
          :series="store.series"
        />
      </div>
      <div class="col-6">
        <barWithLabel
          judul="Minggu ini"
          :series="store.series7"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useDashboardStore } from 'src/stores/dashboard'
import { usePenjualanTable } from 'src/stores/transaksi/penjualan/table'
import barWithLabel from './BarWithLabel.vue'
import ProductRank from './ProductPageRank.vue'
const store = useDashboardStore()
usePenjualanTable().ambilDataProduk().then(resp => {
  // console.log('produk', resp)
  store.produks = resp.product
  store.getDataRank()
})
store.getDataHutang()
store.getDataTagihan()
</script>
