<template>
  <q-page class="bg-white">
    <q-tabs
      v-model="tab"
      align="justify"
      narrow-indicator
    >
      <q-tab
        class="text-primary"
        name="pendapatan"
        label="Pendapatan"
        no-caps
      />
      <q-tab
        class="text-primary"
        name="tagihan"
        label="Buat Tagihan"
        no-caps
      />
      <q-tab
        class="text-primary"
        name="tagihan terbayar"
        label="Tagihan Tertagih dan Terbayar"
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
        <q-tab-panel name="pendapatan">
          <div class="row q-col-gutter-sm">
            <div class="col-4">
              <AllPendapatan />
            </div>
            <div class="col-8">
              <app-no-data v-if="!store.items.length" />
              <ListPage v-if="store.items.length" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tagihan">
          <div class="row q-col-gutter-sm">
            <div class="col-5">
              <TagihanAll />
            </div>
            <div class="col-7">
              <app-no-data v-if="!tagihan.notas.length" />
              <TagihanList
                v-if="tagihan.notas.length"
                @print="printTagihan"
              />
              <PrintTagihanPage
                v-model="tagihan.printTagihan"
                :items="tagihanDiPrint"
                :info="setting.infos"
                @tutup="tagihan.closeTagihan()"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="tagihan terbayar">
          <div class="row q-col-gutter-sm q-mb-sm">
            <div class="col-4 text-weight-bold f-14 text-center">
              Tertagih
            </div>
            <div class="col-8 text-weight-bold f-14 text-center">
              Terbayar
            </div>
          </div>
          <q-separator />
          <div
            class="row justify-center cursor-pointer q-mt-sm"
            clickable
          >
            <div class="col-4 text-center" />
            <div class="col-5 text-center">
              Periode :
              <q-badge>
                {{ tagihan.tanggal.from !== '' ? dateFullFormat(tagihan.tanggal.from) : '-' }}
              </q-badge>
              sampai
              <q-badge>
                {{ tagihan.tanggal.to !== '' ? dateFullFormat(tagihan.tanggal.to) : '-' }}
              </q-badge>
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="tagihan.tanggal"
                  range
                  @update:model-value="tagihan.gantiTanggal"
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
              </q-popup-proxy>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col-4">
              <app-no-data v-if="!tagihan.notas.length" />
              <PembayaranAll v-if="tagihan.notas.length" />
            </div>
            <div class="col-8">
              <app-no-data v-if="!tagihan.dibayars.length" />
              <ListTerbayar v-if="tagihan.dibayars.length" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- <div class="row">
      <div class="col-12">
        <SearchPenerimaan />
      </div>
    </div>
    <div class="row">
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
  </q-page>
</template>
<script setup>
// import SearchPenerimaan from './SearchPenerimaan.vue'
// import NoDataPage from './NoDataPage.vue'
// import ListPage from './pendapatan/ListPage.vue'
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
import { useTagihanPiutang } from 'src/stores/transaksi/penerimaan/piutang'
import { onMounted, ref } from 'vue'
import AllPendapatan from './pendapatan/AllPendapatan.vue'
import ListPage from './pendapatan/ListPage.vue'
import TagihanAll from './tagihan/TagihanAll.vue'
import TagihanList from './tagihan/TagihanList.vue'
import PrintTagihanPage from './tagihan/PrintTagihanPage.vue'
import PembayaranAll from './pembayaran/PembayaranAll.vue'
import ListTerbayar from './pembayaran/ListTerbayar.vue'
import { useSettingStore } from 'src/stores/setting/setting'
import { dateFullFormat } from 'src/modules/formatter'
const store = usePenerimaanTransaksiFormStore()
const tagihan = useTagihanPiutang()
const setting = useSettingStore()
const tab = ref('pendapatan')

store.setNotaBaru()
tagihan.setNotaBaru()
onMounted(() => {
  tagihan.setTanggal()
  store.getDataKasirs()
  store.getMasterPenerimaan()
  // store.getDataPenerimaan()
  store.getDataDistributor()
  store.getPenerimaan()
  tagihan.getTagihan()
  tagihan.getNotaTagihan()
  tagihan.getTerbayar()
})
const tagihanDiPrint = ref({})
const printTagihan = val => {
  // console.log(val)
  tagihanDiPrint.value = val
  tagihan.openTagihan()
}
// coment sik
</script>
