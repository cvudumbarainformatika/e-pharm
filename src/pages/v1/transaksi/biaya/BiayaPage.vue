<template>
  <div class="bg-white full-width">
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
    >
      <q-tab
        class="text-primary"
        name="pengeluaran"
        label="Pengeluaran"
        no-caps
      />
      <q-tab
        class="text-primary"
        name="hutang"
        label="Hutang"
        no-caps
      />
      <q-tab
        class="text-primary"
        name="pembelian terbayar"
        label="Pembelian Terbayar"
        no-caps
      />
    </q-tabs>

    <div class="q-gutter-y-sm">
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-tab-panel name="pengeluaran">
          <div class="row q-col-gutter-sm">
            <div class="col-4">
              <AllBiaya />
            </div>
            <div class="col-8">
              <app-no-data v-if="!store.items.length" />
              <ListPage v-if="store.items.length" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="hutang">
          <div class="row q-col-gutter-sm q-mb-sm">
            <div class="col-4 text-weight-bold f-14 text-center">
              Terhutang
            </div>
            <div class="col-8 text-weight-bold f-14 text-center">
              Terbayar
            </div>
          </div>
          <q-separator />
          <div
            class="row justify-center cursor-pointer q-mt-sm q-mb-sm"
            clickable
          >
            <div class="col-4 text-center" />
            <div class="col-5 text-center">
              Periode :
              <q-badge>
                {{ hutang.tanggalBayar.from !== '' ? dateFullFormat(hutang.tanggalBayar.from) : '-' }}
              </q-badge>
              sampai
              <q-badge>
                {{ hutang.tanggalBayar.to !== '' ? dateFullFormat(hutang.tanggalBayar.to) : '-' }}
              </q-badge>
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <div class="text-center">
                  <q-date
                    v-model="hutang.tanggalBayar"
                    range
                    @update:model-value="hutang.gantiTanggalBayar"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="primary"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    <!-- @click="save" -->
                    </div>
                  </q-date>
                </div>
              </q-popup-proxy>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-5">
              <HutangAll />
            </div>
            <div class="col-7">
              <app-no-data v-if="!hutang.bayars.length" />
              <HutangList v-if="hutang.bayars.length" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="pembelian terbayar">
          <div
            class="row justify-center cursor-pointer q-mt-sm q-mb-sm"
            clickable
          >
            <div class="col-12 text-center">
              Periode :
              <q-badge>
                {{ hutang.tanggal.from !== '' ? dateFullFormat(hutang.tanggal.from) : '-' }}
              </q-badge>
              sampai
              <q-badge>
                {{ hutang.tanggal.to !== '' ? dateFullFormat(hutang.tanggal.to) : '-' }}
              </q-badge>
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <div class="text-center">
                  <q-date
                    v-model="hutang.tanggal"
                    range
                    @update:model-value="hutang.gantiTanggal"
                  >
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        v-close-popup
                        label="Cancel"
                        color="primary"
                        flat
                      />
                      <q-btn
                        v-close-popup
                        label="OK"
                        color="primary"
                        flat
                      />
                    <!-- @click="save" -->
                    </div>
                  </q-date>
                </div>
              </q-popup-proxy>
            </div>
          </div>
          <app-no-data v-if="!hutang.pembelians.length" />
          <PembelianList v-if="hutang.pembelians.length" />
          <div class="row">
            <div class="col-12" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!--<div class="row">
       <div class="col-12">
        <SearchBiaya />
      </div>
      <div class="col-4">
        <AllBiaya />
      </div>
    </div>-->
    <!-- <div class="row">
      <div
        v-if="store.items.length"
        class="col-12"
      >
        <ListPage />
      </div>
      <div
        v-if="!store.items.length"
        class="col-12"
      >
        <NoDataPage />
      </div>
    </div> -->
  </div>
</template>
<script setup>
// import SearchBiaya from './SearchBiaya.vue'
// import NoDataPage from './NoDataPage.vue'
import ListPage from './biaya/ListPage.vue'
import { useBebanTransaksiFormStore } from 'src/stores/transaksi/biaya/form'
import { useBebanTransaksiHutang } from 'src/stores/transaksi/biaya/hutang'
import { onMounted, ref } from 'vue'
import AllBiaya from './biaya/AllBiaya.vue'
import HutangAll from './hutang/HutangAll.vue'
import HutangList from './hutang/HutangList.vue'
import PembelianList from './pembelian/PembelianList.vue'
import { dateFullFormat } from 'src/modules/formatter'
const store = useBebanTransaksiFormStore()
const hutang = useBebanTransaksiHutang()
const tab = ref('pengeluaran')

store.setNotaBaru()
hutang.setNotaBaru()
onMounted(() => {
  hutang.setTanggal()
  store.getDataKasirs()
  store.getDataBeban()
  store.getDataSupplier()
  store.getMasterBeban()
  store.getPengeluaran()
  hutang.getHutang()
  hutang.getDibayar()
  hutang.getPembelian()
})
// coment sik
</script>
