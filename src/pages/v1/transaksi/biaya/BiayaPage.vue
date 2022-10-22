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
        name="hutang terbayar"
        label="Hutang Terbayar"
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
          <div class="text-h6">
            Alarms
          </div>
          Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
        </q-tab-panel>

        <q-tab-panel name="hutang terbayar">
          <div class="text-h6">
            Movies
          </div>
          Nostrum necessitatibus expedita dolores? Voluptatem repudiandae magni ea.
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
import ListPage from './ListPage.vue'
import { useBebanTransaksiFormStore } from 'src/stores/transaksi/biaya/form'
import { onMounted, ref } from 'vue'
import AllBiaya from './AllBiaya.vue'
const store = useBebanTransaksiFormStore()
const tab = ref('pengeluaran')

store.setNotaBaru()
onMounted(() => {
  store.getDataKasirs()
  store.getDataBeban()
  store.getDataSupplier()
  store.getMasterBeban()
  store.getPengeluaran()
})
// coment sik
</script>
