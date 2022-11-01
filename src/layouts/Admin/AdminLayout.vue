<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <!-- <app-print-page class="print-only" /> -->
    <AdmHeader
      :dark="dark"
      :mobile="mobile"
      class="print-hide"
      @toggle-left="toggleLeftDrawer"
    />
    <LeftDrawer
      v-if="!mobile && role !=='kasir'"
      v-model="leftDrawerOpen"
      :dark="dark"
      class="print-hide"
      :menus="menus"
    />
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="desktop"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <!-- menu bottom mobile -->
    <adm-footer-menu
      v-if="mobile && role !== 'kasir'"
      :dark="dark"
      :menus="menus"
    />
    <q-page-container>
      <router-view />
      <!-- :name="transitionName" -->
      <!-- <router-view v-slot="{ Component }">
        <transition
          enter-active-class="slide-left"
          leave-active-class="slide-right"
          :duration="300"
          appear
        >
          <component :is="Component" />
        </transition>
      </router-view> -->
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
        class="print-hide"
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
import { computed, onMounted, ref } from 'vue'

import LeftDrawer from './LeftDrawer.vue'
import AdmHeader from './AdmHeader.vue'
import AdmFooterMenu from './AdmFooterMenu.vue'
import { useAuthStore } from 'src/stores/auth'
import { useHistoryTable } from 'src/stores/history/table'
import { useSettingStore } from 'src/stores/setting/setting'
// import { routerInstance } from 'src/boot/router'

const store = useAuthStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md
const history = useHistoryTable()
const setting = useSettingStore()
const role = computed(() => {
  return store.user ? store.user.role : 'kasir'
})

const dark = computed(() => {
  return $q.dark.isActive
})

// const transitionName = ref('slide-left')
// const route = routerInstance
// console.log('Layout route ', routerInstance)
// watch(() => routerInstance, (to, from) => {
//   console.log('Layout route ', routerInstance)
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//   console.log('app : ', fromDepth, ' - ', toDepth)
// })

function setDark(val) {
  const x = !val
  $q.dark.set(x)
  history.dark = x
  setting.dark = x
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// console.log('menus atas', setting.menus)
const menus = computed(() => {
  // console.log('role', role.value)
  if (role.value === 'gudang') {
    // console.log('menus', setting.menus)
    return setting.menus.filter(data => { return data.name === 'transaksi' || data.name === 'master' })
  } else { return setting.menus }
})
// console.log('menus bawah', menus.value)
// const menus = ref([
//   { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard', link: 'dashboard' },
//   { id: 2, name: 'master', icon: 'icon-mat-dataset', link: 'master' },
//   { id: 3, name: 'transaksi', icon: 'icon-mat-sync_alt', link: 'transaksi' },
//   { id: 4, name: 'history', icon: 'icon-mat-history', link: 'history' },
//   { id: 4, name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
//   { id: 5, name: 'setting', icon: 'icon-mat-settings', link: 'setting' }
// ])

onMounted(() => {
  store.getUser()
})

// -----------------get data autocomplete----------------- //
//
setting.getInitialData()
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>
