<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <LeftDrawer
      v-if="!mobile"
      v-model="leftDrawerOpen"
      :dark="dark"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        size="sm"
        padding="sm"
        icon="icon-mat-display_settings"
        color="primary"
        direction="up"
      >
        <q-fab-action
          :color="dark?'warning':'dark'"
          icon="icon-mat-tungsten"
          @click="setDark(dark)"
        />
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>
<script setup>

import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

import LeftDrawer from './LeftDrawer.vue'
// import MasterHeader from './MasterHeader.vue'
// import MobileFooterMenu from './AdmFooterMenu.vue'

const $q = useQuasar()

const leftDrawerOpen = ref(false)

const dark = computed(() => {
  return $q.dark.isActive
})
function setDark(val) {
  const x = !val
  $q.dark.set(x)
}
</script>
