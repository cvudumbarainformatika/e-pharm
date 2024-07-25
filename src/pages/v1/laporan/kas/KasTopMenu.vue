<template>
  <q-card>
    <q-card-section
      style="padding:5px;"
      class="q-ml-md"
    >
      <div class="row items-center print-hide">
        <!-- <q-icon
          name="icon-mat-menu"
          flat
          :color="setting.dark? 'white':'primary'"
          size="25px"
          round
          class="cursor-pointer"
        >
        </q-icon> -->
        <q-btn
          no-caps
          label="Bulan Ini"
          :flat="store.date!=='tillToday'"
          :push="store.date==='tillToday'"
          color="primary"
          :loading="store.loading && store.date==='tillToday'"
          @click="today"
        />
        <!-- <q-btn
          no-caps
          label="Pilih Tanggal"
          :flat="store.date!=='spesifik'"
          :push="store.date==='spesifik'"
          color="primary"
          :loading="store.loading && store.date==='spesifik'"
          @click="pilihTgl"
        >
          <TopMenuContent
            @selected="selected"
            @show="show"
            @hide="hide"
          />
        </q-btn> -->
        <q-btn
          no-caps
          label="Pilih Range Tanggal"
          :flat="store.date!=='range'"
          :push="store.date==='range'"
          color="primary"
          :loading="store.loading && store.date==='range'"
          @click="pilihRange"
        >
          <TopMenuContent
            @selected="selected"
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
import { date } from 'quasar'
import { useLaporanKeuanganStore } from 'src/stores/laporan/keuangan/keuangan'
import { ref } from 'vue'
import TopMenuContent from './TopMenuContent.vue'

const store = useLaporanKeuanganStore()

const selection = ref({ prev: '', next: '' })
const hide = () => {
  if (selection.value.next === '') {
    store.date = selection.value.prev
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
  store.setParams('from', awalBulan)
  store.date = 'tillToday'
  selection.value.prev = store.date
  selection.value.next = 'tillToday'
  store.periode = 'Bulan Ini'
  store.setParams('selection', 'tillToday')
  store.getPenjualan()
  // store.prosesHPP()
//   console.log('today', awalBulan)
//   console.log('today quasar', date.formatDate(Date.now(), 'YYYY-MM-' + '01'))
}
// const pilihTgl = () => {
//   selection.value.prev = store.date
//   store.setSpesifik()
//   store.date = 'spesifik'
// }
const pilihRange = () => {
  selection.value.prev = store.date
  store.setRange()
  store.date = 'range'
}
// const setting = useSettingStore
</script>
