<template>
  <q-dialog>
    <app-print-page
      v-if="nama==='PEMBELIAN'"
    />
    <!-- class="print-only" -->
    <app-print-penjualan
      v-if="nama==='PENJUALAN'"
    />
    <!-- class="print-only" -->
  </q-dialog>
</template>
<script setup>
defineProps({
  nama: { type: String, default: '' }
})
// window.print()
</script>
