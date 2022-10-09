<template>
  <div
    class="q-pa-md absolute-bottom-left"
    style="height: 280px; max-height: 80vh"
  >
    <q-btn
      v-morph:btn:mygroup:300.resize="morphGroupModel"
      class="absolute-bottom-left q-ma-md"
      fab
      color="primary"
      size="lg"
      icon="icon-mat-search"
      @click="nextMorph"
    />

    <q-card
      v-morph:card1:mygroup:500.resize="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 300px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Pilih transaksi
      </q-card-section>
      <q-card-section class="text-subtitle1 text-center">
        <q-list
          bordered
          padding
          class="rounded-borders text-white"
        >
          <div
            v-for="(item, i) in morphStore.transactions"
            :key="i"
          >
            <q-item
              v-ripple
              class="menu"
              clickable
              exact
              @click="transactionSelected(item)"
            >
              <q-item-section>
                {{ item.name }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card
      v-morph:card2:mygroup:500.tween="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 300px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Pilih Periode Transaksi
      </q-card-section>

      <q-card-section class="q-py-xl text-center text-subtitle2">
        <q-list
          bordered
          padding
          class="rounded-borders text-white"
        >
          <div
            v-for="(item, i) in morphStore.dates"
            :key="i"
          >
            <q-item
              v-ripple
              class="menu"
              clickable
              exact
              @click="dateSelected(item)"
            >
              <q-item-section>
                {{ item.nama }}
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card-section>

      <!-- <q-card-actions align="right">
        <q-btn
          flat
          label="Close"
          @click="nextMorph"
        />
      </q-card-actions> -->
    </q-card>

    <q-card
      v-morph:card3:mygroup:500.tween="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 400px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Pilih tanggal
      </q-card-section>

      <q-card-section class="q-py-xl text-center text-subtitle2">
        <q-list
          bordered
          padding
          class="rounded-borders text-white"
        >
          <div v-if="morphStore.date === 'harian'">
            <q-item
              v-ripple
              class="menu"
              clickable
              exact
            >
              <q-item-section>
                <app-autocomplete-new
                  v-model="table.form.hari"
                  flat
                  dark
                  style="width: 90%"
                  label="Tanggal"
                  autocomplete="nama"
                  option-value="value"
                  option-label="nama"
                  :source="morphStore.days"
                  @on-select="daySelected"
                />
              </q-item-section>
            </q-item>
          </div>
          <div v-if="morphStore.date === 'bulanan'">
            <div
              v-for="(item, i) in morphStore.months"
              :key="i"
            >
              <q-item
                v-ripple
                class="menu"
                clickable
                exact
                @click="monthSelected(item)"
              >
                <q-item-section>
                  {{ item.nama }}
                </q-item-section>
              </q-item>
            </div>
          </div>

          <div
            v-if="table.form.date === 'range'"
            class="text-primary"
          >
            <q-date
              v-model="rangeDate"
              range
            />
          </div>
        </q-list>
      </q-card-section>

      <q-card-actions
        v-if="table.form.date === 'range'"
        align="right"
      >
        <q-btn
          flat
          label="Close"
          @click="rangeSelected"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
// import { notifCenterVue } from 'src/modules/utils'
import { dateFormat } from 'src/modules/formatter'
import { useLaporanMorphStore } from 'src/stores/laporan/button'
import { useLaporanTable } from 'src/stores/laporan/table'
import { ref } from 'vue'

const table = useLaporanTable()
const morphStore = useLaporanMorphStore()
// const nextMorp = {
//   btn: 'card1',
//   card1: 'card2',
//   card2: 'btn'
// }
const morphGroupModel = ref('btn')
const rangeDate = ref({ from: null, to: null })
const nextMorph = () => {
  morphGroupModel.value = 'card1'
}
const transactionSelected = (val) => {
  morphGroupModel.value = 'card2'
  table.form.nama = val.value
  table.selected = false
  // console.log(val)
}
const dateSelected = (val) => {
  morphGroupModel.value = val.next
  morphStore.date = val.value
  table.form.date = val.date
  table.form[val.date] = val.param
  // console.log('date ', val)
  table.periode = val.nama
  if (val.next === 'btn') {
    table.getDetailTransactions()
  }
}
const daySelected = (val) => {
  // console.log('day', val)
  table.periode = ' Tanggal ' + val
  morphGroupModel.value = 'btn'
  table.getDetailTransactions()
}
const monthSelected = (val) => {
  // console.log('month ', val)
  table.periode = 'Bulan ' + val.nama
  morphGroupModel.value = 'btn'
  table.form.bulan = val.value
  table.getDetailTransactions()

  // console.log(table.form)
}

const rangeSelected = (val) => {
  table.periode =
    '  ' + dateFormat(rangeDate.value.from) + ' - ' + dateFormat(rangeDate.value.to)
  // console.log('range ', val)
  morphGroupModel.value = 'btn'
  table.form.from = rangeDate.value.from
  table.form.to = rangeDate.value.to

  table.getDetailTransactions()

  // console.log(rangeDate.value)
  // console.log(table.form)
}
// const cari = () => {
//   morphStore.getDataSearch()
//   // notifCenterVue(`telah di pilih cari transaksi : ${morphStore.search} `)
//   morphGroupModel.value = 'btn'
// }
</script>
