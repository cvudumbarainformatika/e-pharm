<template>
  <q-page
    style="max-height: calc(100vh - 92px) !important; overflow: scroll;"
  >
    <q-tabs
      v-model="tab"
      align="left"
      narrow-indicator
      :class=" setting.dark ? 'page-dark text-white q-ml-sm' : 'bg-grey-3 text-primary q-ml-sm' + ' print-hide'"
      active-color="white"
      active-bg-color="primary"
      indicator-color="yellow"
      dense
    >
      <q-tab
        name="distribusi"
        label="Transaksi Distribusi"
        no-caps
      />
      <q-tab
        name="list"
        label="History Distribusi"
        no-caps
      />
    </q-tabs>
    <div
      class="q-ml-sm"
    >
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-tab-panel name="distribusi">
          <FormDistribusi />
        </q-tab-panel>
        <q-tab-panel name="list">
          <ListDistribusi />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import { ref } from 'vue'

import FormDistribusi from './comp/CompFormDistribusi.vue'
import ListDistribusi from './comp/CompListDistribusi.vue'

const setting = useSettingStore()
const tab = ref('distribusi')
</script>
