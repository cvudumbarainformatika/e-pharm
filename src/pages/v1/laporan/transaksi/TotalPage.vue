<template>
  <div>
    <!-- {{ table.totalTransaction }} -->
    <div class="row">
      <div class="col-3 text-h6">
        <strong>Total {{ table.form.nama }}</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ formatRpDouble(table.totalTransaction.jml,2) }}</strong>
      </div>
    </div>
    <div
      v-if="table.form.nama==='PENJUALAN' && !table.form.q"
      class="row items-center"
    >
      <div class="col-3 text-weight-bold f-16">
        <strong>Total Retur Penjualan</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ table.totalReturTransaction ? (parseFloat(table.totalReturTransaction.jml) > 0?formatRpDouble(parseFloat(table.totalReturTransaction.jml),2):0):0 }}</strong>
      </div>
    </div>
    <div
      v-if="table.form.nama==='PENJUALAN' && !table.form.q"
      class="row items-center"
    >
      <div class="col-3 text-weight-bold f-16">
        <strong>Total</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ formatRpDouble(parseFloat(table.totalTransaction.jml)-(table.totalReturTransaction?parseFloat(table.totalReturTransaction.jml):0),2) }}</strong>
      </div>
    </div>
    <div
      v-if="table.form.nama==='PEMBELIAN' && !table.form.q"
      class="row items-center"
    >
      <div class="col-3 text-weight-bold f-16">
        <strong>Total dengan diskon dan PPN</strong>
      </div>
      <div class="col-1 text-h6">
        <strong>:</strong>
      </div>
      <div class="col-8 text-h6 text-right">
        <strong>{{ parseFloat(table.totalTransaction.jmlSmw)>0?formatRpDouble(parseFloat(table.totalTransaction.jmlSmw),2):0 }}</strong>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatRpDouble } from 'src/modules/formatter'
import { useLaporanTable } from 'src/stores/laporan/table'

const table = useLaporanTable()
</script>
