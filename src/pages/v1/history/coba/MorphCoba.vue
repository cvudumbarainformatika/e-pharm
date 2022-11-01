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
        Cari transaksi
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="morphStore.search"
          autofocus
          dark
          flat
          standout
          @keyup.enter="cari"
        >
          <template #append>
            <q-icon
              name="icon-mat-search"
              dark
              clickable
              @click="cari"
            />
          </template>
        </q-input>
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

      <!-- <q-card-actions align="right">
        <q-btn
          flat
          label="Next"
          @click="nextMorph"
        />
      </q-card-actions> -->
    </q-card>

    <q-card
      v-morph:card2:mygroup:500.tween="morphGroupModel"
      class="absolute-bottom-left q-ma-md bg-primary text-white"
      style="width: 300px; border-bottom-left-radius: 2em"
    >
      <q-card-section class="text-h6">
        Pilih Status Transaksi
      </q-card-section>

      <q-card-section class="q-py-xl text-center text-subtitle2">
        <q-list
          bordered
          padding
          class="rounded-borders text-white"
        >
          <div
            v-for="(item, i) in morphStore.statuses"
            :key="i"
          >
            <q-item
              v-ripple
              class="menu"
              clickable
              exact
              @click="statusSelected(item)"
            >
              <q-item-section>
                {{ item.name }}
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
  </div>
</template>

<script setup>
// import { notifCenterVue } from 'src/modules/utils'
import { cobaMorphStore } from 'src/stores/transaksi/history/coba/morph'
import { ref } from 'vue'

const morphStore = cobaMorphStore()
// const nextMorp = {
//   btn: 'card1',
//   card1: 'card2',
//   card2: 'btn'
// }
const morphGroupModel = ref('btn')
const nextMorph = () => {
  morphGroupModel.value = 'card1'
}
const transactionSelected = (val) => {
  morphGroupModel.value = 'card2'
  morphStore.transaction = val.value
  // console.log(val)
}
const statusSelected = val => {
  morphGroupModel.value = 'btn'
  morphStore.status = val.value
  morphStore.getDataNamaStatus()
  // notifCenterVue(`telah di pilih transaksi : ${morphStore.transaction} dengan status ${morphStore.status} (${val.name})`)
  // console.log(val)
}
const cari = () => {
  morphStore.getDataSearch()
  // notifCenterVue(`telah di pilih cari transaksi : ${morphStore.search} `)
  morphGroupModel.value = 'btn'
}
</script>
