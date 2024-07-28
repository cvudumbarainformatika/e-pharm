<template>
  <q-layout
    view="lHh LpR lFr"
    :class="dark?'':'page-light'"
  >
    <!-- <app-print-page class="print-only" /> -->
    <AdmHeader
      :dark="dark"
      :mobile="mobile"
      :cabangs="dist?.cabangs"
      :notif="notifStore?.unreadNotif"
      :loading-notif="notifStore.loading"
      class="print-hide"
      @toggle-left="toggleLeftDrawer"
      @handle-notif="handleNotif"
    />
    <LeftDrawer
      v-if="!mobile"
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
      class="print-hide"
    >
      <!-- drawer content -->
    </q-drawer>

    <!-- menu bottom mobile -->
    <adm-footer-menu
      v-if="mobile"
      :dark="dark"
      :menus="menus"
      class="print-hide"
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
import { notifchanel } from 'src/modules/sockets'
import { useNotificationStore } from 'src/stores/setting/notifikasi'
import { useDistribusiFormStore } from 'src/stores/transaksi/distribusi/distribusi'
import { useRoute } from 'vue-router'
import { useListDistribusiStore } from 'src/stores/transaksi/distribusi/list'
import { useSatuanBesarStore } from 'src/stores/master/satuan/besar/crud'
import { useSatuanStore } from 'src/stores/master/satuan/crud'
import { useSupplierTable } from 'src/stores/master/supplier/table'
import { useCabangTable } from 'src/stores/master/cabang/table'
import { useCustomerTable } from 'src/stores/master/customer/table'
import { useDokterTable } from 'src/stores/master/dokter/table'
import { useKategoriTable } from 'src/stores/master/kategori/table'
import { useMerkTable } from 'src/stores/master/merk/table'
import { usePerusahaanTable } from 'src/stores/master/perusahaan/table'
import { useProdukTable } from 'src/stores/master/produk/table'
import { useRakTable } from 'src/stores/master/rak/table'
// import { routerInstance } from 'src/boot/router'
// import { usePenjualanTable } from 'src/stores/transaksi/penjualan/table'

// const penjualan = usePenjualanTable()
// penjualan.ambilDataDistributor()

const store = useAuthStore()
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const $q = useQuasar()
const mobile = $q.screen.lt.md
const history = useHistoryTable()
const setting = useSettingStore()
const notifStore = useNotificationStore()
const dist = useDistribusiFormStore()

const role = computed(() => {
  return store.user ? store.user.role : null
})

const dark = computed(() => {
  return $q.dark.isActive
})
// const notif = ref([
//   // { data: 'anu' },
//   // { data: 'anu2' }
// ])
notifchanel.subscribed(() => {
  console.log('subscribed notif channel!!!')
}).listen('.notif', (e) => {
  console.log('listen to chanel notif', e)
  console.log('kode cabang', setting?.kodecabang)
  const ada = notifStore?.unreadNotif.find(a => a.id === e?.message?.id)
  if (!ada && e?.message?.receiver === setting?.kodecabang) {
    const mes = e?.message
    notifStore?.unreadNotif.push(mes)
    // notifStore.readNotif(mes).then(() => {
    //   panggilData(mes)
    // })
  }
  if (ada && e?.message?.action === 'is_read') {
    ada.is_read = 1
  }
  if (e.message.type === 'ambilLaporan') {
    notifStore.getLaporan(e?.message)
  }
  // console.log('listen to chanel antrean data', e.message)
})
// notifchannel.subscribed(() => {
//   console.log('subscribed notif 2 channel!!!')
// }).listen('.notif', (e) => {
//   console.log('listen to chanel notif 2', e)
//   // console.log('listen to chanel antrean data', e.message)
// })

function handleNotif(val) {
  console.log('handleNotif', val)
  notifStore.readNotif(val).then(() => {
    panggilData(val)
  })
}
const router = useRoute()
const list = useListDistribusiStore()
const satBes = useSatuanBesarStore()
const satkec = useSatuanStore()
const sup = useSupplierTable()
const cab = useCabangTable()
const cus = useCustomerTable()
const dok = useDokterTable()
const kate = useKategoriTable()
const merk = useMerkTable()
const perus = usePerusahaanTable()
const prod = useProdukTable()
const rak = useRakTable()
function panggilData(val) {
  const path = router.path
  console.log('pabggil', val)
  console.log('roue', router.path)
  const model = val?.model === 'Product' ? 'Produk' : val?.model
  const modelK = model?.toLowerCase()
  console.log('mode', model, modelK)
  if (path?.includes('/transaksi/distribusi') && val?.model.includes('Distribusi')) list.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Satuan')) {
    satBes.getSatuan(true)
    satkec.getSatuan(true)
  }
  if (path?.includes(modelK) && model.includes('Suppl')) sup.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Caban')) cab.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Custom')) cus.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Dokte')) dok.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Katego')) kate.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Merk')) merk.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Perusa')) perus.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Produ')) prod.getDataTable(true)
  if (path?.includes(modelK) && model.includes('Rak')) rak.getDataTable(true)
}
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
  // if (role.value === 'gudang') {
  //   // console.log('menus', setting.menus)
  //   return setting.menus.filter(data => { return data.name === 'transaksi' || data.name === 'master' })
  // } else { return setting.menus }
  const menu = setting.menus.map(menu => {
    if (menu.submenus.length && role.value !== null) {
      const submenu = menu.submenus.filter(sub => {
        const apem = sub.roles.includes(role.value) ? sub : false
        // console.log('sub', apem)
        return apem
        // return sub.roles.includes(role.value) ? sub : false
      })
      menu.submenus = submenu
      if (submenu.length) return menu
      else return false
    } else {
      const temp = menu.roles ? menu.roles.includes(role.value) ? menu : false : false
      // console.log('mnu', temp)
      return temp
    }
  })
  const apem = menu.filter(men => {
    let temp = false
    if (men) {
      temp = men
    }
    return temp
  })
  // console.log('role', role.value)
  // console.log('menus', menu)
  // console.log('apem', apem)
  return apem
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
notifStore.getUnreadNotif()
dist.getCabangs()
// setting.getDataSetting(resp => {
//   console.log('resp nya', resp?.uread)
// })
// function toggleRightDrawer() {
//   rightDrawerOpen.value = !rightDrawerOpen.value
// }
</script>
