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
        <q-btn
          no-caps
          label="Pilih Tanggal"
          :flat="store.date!=='spesifik'"
          :push="store.date==='spesifik'"
          color="primary"
          :loading="store.loading && store.date==='spesifik'"
          @click="pilihTgl"
        >
          <TopMenuContent />
        </q-btn>
        <q-btn
          no-caps
          label="Pilih Range Tanggal"
          :flat="store.date!=='range'"
          :push="store.date==='range'"
          color="primary"
          :loading="store.loading && store.date==='range'"
          @click="pilihRange"
        >
          <TopMenuContent />
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
// import { useSettingStore } from 'src/stores/setting/setting'
import { date } from 'quasar'
import { useLaporanKeuanganStore } from 'src/stores/laporan/keuangan/keuangan'
import TopMenuContent from './TopMenuContent.vue'

const store = useLaporanKeuanganStore()

const today = () => {
  const awalBulan = date.formatDate(Date.now(), 'YYYY-MM-' + '01')
  store.setParams('from', awalBulan)
  store.date = 'tillToday'
  store.periode = 'Bulan Ini'
  store.setParams('selection', 'tillToday')
  store.getPenjualan()
  // store.prosesHPP()
  console.log('today', awalBulan)
  console.log('today quasar', date.formatDate(Date.now(), 'YYYY-MM-' + '01'))
}
const pilihTgl = () => {
  store.setSpesifik()
  store.setParams('selection', 'spesifik')
  store.date = 'spesifik'
}
const pilihRange = () => {
  store.setRange()
  store.setParams('selection', 'range')
  store.date = 'range'
}
// const setting = useSettingStore
</script>
