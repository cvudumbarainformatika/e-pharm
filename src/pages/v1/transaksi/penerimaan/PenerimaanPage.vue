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
        label="Tagihan"
        no-caps
      />
      <q-tab
        class="text-primary"
        name="tagihan terbayar"
        label="Tagihan Terbayar"
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
          belum
          <!-- <div class="row q-col-gutter-sm">
            <div class="col-5">
              <HutangAll />
            </div>
            <div class="col-7">
              <app-no-data v-if="!hutang.bayars.length" />
              <HutangList v-if="hutang.bayars.length" />
            </div>
          </div> -->
        </q-tab-panel>

        <q-tab-panel name="tagihan terbayar">
          belum
          <!-- <app-no-data v-if="!hutang.pembelians.length" />
          <PembelianList v-if="hutang.pembelians.length" />
          <div class="row">
            <div class="col-12" />
          </div> -->
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
import { onMounted, ref } from 'vue'
import AllPendapatan from './pendapatan/AllPendapatan.vue'
import ListPage from './pendapatan/ListPage.vue'
const store = usePenerimaanTransaksiFormStore()
const tab = ref('pendapatan')

store.setNotaBaru()
onMounted(() => {
  store.getDataKasirs()
  store.getMasterPenerimaan()
  // store.getDataPenerimaan()
  store.getDataDistributor()
  store.getPenerimaan()
})
// coment sik
</script>
