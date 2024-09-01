<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="">
      <q-bar class="bg-primary text-white print-hide">
        <q-space />

        <q-btn
          dense
          flat
          icon="icon-mat-close"
          @click="close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="print-hide">
        <div class="row justify-end q-mr-lg">
          <q-btn
            icon="icon-mat-print"
            color="dark"
            round
            @click="print"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center text-h6">
          Surat Pesanan
        </div>
        <div class="row justify-center ">
          Nomor : {{ store.toPrint?.nopemesanan }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row justify-end">
          Kepada Yth.
        </div>
        <div class="row text-weight-bold justify-end">
          {{ store.toPrint?.supplier?.nama }}
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-12 ">
            <q-input
              v-model="katapembuka"
              type="textarea"
              autogrow
              borderless
              style="max-width: 100%;"
            >
              <q-tooltip class="print-hide">
                Bisa di edit, tapi tidak disimpan
              </q-tooltip>
            </q-input>
          </div>
        </div>
        <div v-if="store.toPrint?.detail.length">
          <div class="row no-wrap text-weight-bold bg-grey-4 bt bb">
            <div class="col-1 bl br">
              No
            </div>
            <div class="col-7 br">
              Item
            </div>
            <div class="col-2 text-right br">
              <div class="q-mr-sm">
                Jumlah
              </div>
            </div>
            <div class="col-2 br">
              <div class="q-ml-sm">
                Satuan
              </div>
            </div>
          </div>
          <div
            v-for="(item,i) in store.toPrint?.detail"
            :key="item"
            class="row bb"
          >
            <div class="col-1 bl br">
              {{ i+1 }}
            </div>
            <div class="col-7 br">
              {{ item?.produk?.nama }}
            </div>
            <div class="col-2 text-right br">
              <div class="q-mr-sm">
                {{ item?.qty }}
              </div>
            </div>
            <div class="col-2 br">
              <div class="q-ml-sm">
                {{ item?.satuan }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-12 ">
            <q-input
              v-model="katapenutup"
              type="textarea"
              autogrow
              borderless
              style="max-width: 100%;"
            >
              <q-tooltip class="print-hide">
                Bisa di edit, tapi tidak disimpan
              </q-tooltip>
            </q-input>
          </div>
        </div>
        <div class="row text-weight-bold justify-end q-mb-xl">
          <div class="col-4 text-center">
            Hormat Kami,
          </div>
        </div>
        <div class="row no-wrap text-weight-bold justify-end">
          <div class="col-4 text-center">
            {{ adaNama? setting?.info?.nama:'' }}
          </div>
          <div class="col-auto print-hide">
            <q-checkbox
              v-model="adaNama"
              dense
            >
              <q-tooltip>Nama Toko</q-tooltip>
            </q-checkbox>
          </div>
        </div>
        <div class="row text-weight-bold justify-end">
          <div class="col-4 text-center">
            {{ adaPemilik? setting?.info?.pemilik:'' }}
          </div>

          <div class="col-auto print-hide">
            <q-checkbox
              v-model="adaPemilik"
              dense
            >
              <q-tooltip>Pemilik Toko</q-tooltip>
            </q-checkbox>
          </div>
        </div>
        <div class="row text-weight-bold justify-end">
          <div
            v-if="custom"
            class="col-4 text-center"
          >
            <q-input
              v-model="customText"
              dense
              autogrow
              type="textarea"
              class="print-hide"
            />
            <div v-if="custom">
              {{ customText }}
            </div>
          </div>

          <div class="col-auto print-hide">
            <q-checkbox
              v-model="custom"
              dense
            >
              <q-tooltip>Custom Text</q-tooltip>
            </q-checkbox>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import { useListPemesananStore } from 'src/stores/transaksi/pemesanan/list'
import { ref } from 'vue'

const store = useListPemesananStore()

// setting
const setting = useSettingStore()

const adaPemilik = ref(true)
const adaNama = ref(true)
const custom = ref(false)
const katapembuka = ref('Mohon dikirimkan pesanan dengan spesifikasi sebagai berikut:')
const katapenutup = ref('Demikian Surat Pesanan ini dibuat untuk digunakan sebagaimana mestinya')
const customText = ref('')
function close() {
  store.printOpen = false
  store.toPrint = null
}
function print() {
  window.print()
}
window.onafterprint = function() {
  console.log('Printing completed...')
  close()
}
</script>
<style lang="scss" scoped>
.bt{
  border-top: 1px solid black;

}
.bb{
  border-bottom: 1px solid black;

}
.br{
  border-right: 1px solid black;
  padding-right: 2px;
  padding-left: 2px;
}
.bl{
  border-left: 1px solid black;
  padding-left: 2px;
}
</style>
