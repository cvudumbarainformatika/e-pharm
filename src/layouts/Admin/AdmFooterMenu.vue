<template>
  <q-footer
    bordered
    class="bg-white shadow-1"
  >
    <q-tabs
      v-model="tab"
      active-color="primary"
      indicator-color="transparent"
      class="text-grey-10"
    >
      <!-- :to="{ name: tab.url }" -->
      <q-route-tab
        v-for="(tabb, i) in menus"
        :key="'tab' + i"
        :to="{ name: tabb.name }"
        :name="tabb.name"
        :icon="tabb.icon"
        no-caps
      >
        <!-- <div class="f-10">
          {{ tab.name }}
        </div> -->
      </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const menus = ref([
  { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard' },
  { id: 2, name: 'master', icon: 'icon-mat-dataset' },
  { id: 3, name: 'transaksi', icon: 'icon-mat-sync_alt' },
  { id: 4, name: 'laporan', icon: 'icon-mat-donut_large' },
  { id: 5, name: 'setting', icon: 'icon-mat-settings' }
])

const tab = ref('dashboard')
console.log('router', props.dark)
</script>

<style lang="scss" scoped></style>
