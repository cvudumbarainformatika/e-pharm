<template>
  <div>
    <q-page class="q-pa-sm">
      <Suspense>
        <!-- main content -->
        <div>
          <!-- <q-menu
            v-model="setting.submenuTransaksi"
            transition-show="slide-right"
            transition-hide="slide-left"
            :offset="[0,-600]"
          >
            <TransaksiMenu />
          </q-menu> -->
          <q-page v-if="path !== '/transaksi'">
            <router-view />
          </q-page>
          <div v-else>
            <q-card>
              <NoSelectedPage />
            </q-card>
          </div>
        </div>

        <!-- loading state -->
        <template #fallback>
          <app-loading />
        </template>
      </Suspense>
    </q-page>
  </div>
</template>
<script setup>
// import TransaksiMenu from './TransaksiMenu.vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NoSelectedPage from './NoSelectedPage.vue'
import { routerInstance } from 'src/boot/router'
// import { useSettingStore } from 'src/stores/setting/setting'
// const setting = useSettingStore()
const route = useRoute()
let slug = routerInstance.currentRoute.value.params.slug
let name = routerInstance.currentRoute.value.name
if (name === 'transaksi') {
  name = 'transaksi.pembelian'
  slug = 'apem'
}
routerInstance.replace({ name, params: { slug } })
const path = computed(() => route.path)
// console.log('path', path)

</script>
