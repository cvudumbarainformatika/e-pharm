<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col-2">
        <TransaksiMenu />
      </div>
      <div class="col-10">
        <q-page v-if="path !== '/transaksi'">
          <router-view />
        </q-page>
        <div v-else>
          <q-card>
            <NoSelectedPage />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import TransaksiMenu from './TransaksiMenu.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NoSelectedPage from './NoSelectedPage.vue'
import { routerInstance } from 'src/boot/router'
// import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
// const table = usePembelianTable()
const route = useRoute()
let slug = routerInstance.currentRoute.value.params.slug
let name = routerInstance.currentRoute.value.name
if (name === 'transaksi') {
  name = 'pembelian'
  slug = 'apem'
}
// console.log('name', name)
// table.getDetailTransaksi().then(() => {
routerInstance.replace({ name, params: { slug } })
// })
const path = computed(() => route.path)
// console.log('path', path)
</script>
