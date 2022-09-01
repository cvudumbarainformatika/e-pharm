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
const route = useRoute()
const path = computed(() => route.path)
</script>
