<template>
  <q-card>
    <q-card-section style="padding:5px;">
      <div class="row items-center print-hide">
        <!-- <q-icon
          name="icon-mat-menu"
          flat
          :color="setting.dark? 'white':'primary'"
          size="25px"
          round
          class="cursor-pointer"
        >
          <StockMenuCotent />
        </q-icon> -->
        <q-btn
          no-caps
          label="Bulan Ini"
          :flat="table.date!=='tillToday'"
          :push="table.date==='tillToday'"
          color="primary"
          :loading="table.loading && table.date==='tillToday'"
          @click="today"
        />
        <q-btn
          no-caps
          label="Pilih Tanggal"
          :flat="table.date!=='spesifik'"
          :push="table.date==='spesifik'"
          color="primary"
          :loading="table.loading && table.date==='spesifik'"
          @click="pilihTgl"
        >
          <StockMenuCotent
            @selected="selected"
            @show="show"
            @hide="hide"
          />
        </q-btn>
        <q-btn
          no-caps
          label="Pilih Range Tanggal"
          :flat="table.date!=='range'"
          :push="table.date==='range'"
          color="primary"
          :loading="table.loading && table.date==='range'"
          @click="pilihRange"
        >
          <StockMenuCotent
            @selectd="selected"
            @show="show"
            @hide="hide"
          />
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
// import { useSettingStore } from 'src/stores/setting/setting'
import StockMenuCotent from './menucontent/StockMenuCotent.vue'
import { useLaporanMoreProduct } from 'src/stores/laporan/stok/more'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'
import { date } from 'quasar'
import { ref } from 'vue'
const table = useLaporanStokTable()
const more = useLaporanMoreProduct()

// const setting = useSettingStore()

const selection = ref({ prev: '', next: '' })
const hide = () => {
  if (selection.value.next === '') {
    table.date = selection.value.prev
  }
  // console.log('I am hide', selection.value)
}
const show = () => {
  selection.value.next = ''
  // console.log('I am show', selection.value)
}
const selected = val => {
  selection.value.next = val
  // console.log('selected', val)
}

const today = () => {
  const awalBulan = date.formatDate(Date.now(), 'YYYY-MM-' + '01')
  table.date = 'tillToday'
  selection.value.prev = table.date
  selection.value.next = 'tillToday'
  more.setParams('selection', 'tillToday')
  table.setForm('from', awalBulan)
  table.setForm('selection', 'tillToday')
  table.setPeriode()
  table.getDataStok()
}
const pilihTgl = () => {
  selection.value.prev = table.date
  table.setSpesifik()
  table.date = 'spesifik'
}
const pilihRange = () => {
  selection.value.prev = table.date
  table.setRange()
  table.date = 'range'
}

</script>
