<template>
  <div>
    <div class="row">
      <div class="col-3 text-h6">
        <strong>Total</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ formatRp(table.totalTransaction.jml) }}</strong>
      </div>
    </div>
    <div class="row">
      <div class="col-3 text-h6">
        <strong>Potongan</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ formatRp(table.totalTransaction.diskon) }}</strong>
      </div>
    </div>
    <div class="row">
      <div class="col-3 text-h6">
        <strong>Ongkir</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ formatRp(table.totalTransaction.ongkos) }}</strong>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useLaporanTable } from 'src/stores/laporan/table'

const table = useLaporanTable()
</script>
