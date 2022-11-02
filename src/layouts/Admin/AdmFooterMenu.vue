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
        @click="menuClick(tabb)"
      >
        <!-- <div class="f-10">
          {{ tab.name }}
        </div> -->
      </q-route-tab>
    </q-tabs>
  </q-footer>
</template>

<script setup>
import { routerInstance } from 'src/boot/router'
import { useHistoryTable } from 'src/stores/history/table'
import { useSettingStore } from 'src/stores/setting/setting'
import { ref } from 'vue'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: { type: Object, default: () => { } }
})

const setting = useSettingStore()
const history = useHistoryTable()
const menuHover = (menu) => {
  setting.setOpen()
  // console.log('menu', menu)
  if (menu.name === 'setting') {
    setting.menuOpen()
  } else {
    setting.menuClose()
  }
  if (menu.name === 'master') {
    setting.masterOpen()
  } else {
    setting.masterClose()
  }
  if (menu.name === 'transaksi') {
    setting.transaksiOpen()
  } else {
    setting.transaksiClose()
  }
  if (menu.name === 'history') {
    history.menuOpen()
  } else {
    history.menuClose()
  }
}
const menuClick = val => {
  menuHover(val)
  if (val.name === 'transaksi') {
    const oldSlug = routerInstance.currentRoute.value.params.slug ? routerInstance.currentRoute.value.params.slug : 'apem'
    let nama = ''
    switch (routerInstance.currentRoute.value.name) {
      case 'biaya':
        nama = 'biaya'
        break
      case 'pembelian':
        nama = 'pembelian'
        break
      case 'transaksi.penerimaan':
        nama = 'transaksi.penerimaan'
        break
      case 'penjualan':
        nama = 'penjualan'
        break
      case 'retur':
        nama = 'retur'
        break
      case 'detail.retur':
        nama = 'detail.retur'
        break

      default:
        nama = val.submenus[0].value
        break
    }

    routerInstance.replace({ name: nama, params: { slug: oldSlug } })
  } else if (val.submenus.length) {
    if (val.name === 'history' || val.name === 'dashboard' || val.name === 'setting') { return }
    const nama = val.submenus[0].value
    routerInstance.replace({ name: nama })
  } else {
    const nama = val.name
    routerInstance.replace({ name: nama })
  }
}

// const menus = ref([
//   { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard' },
//   { id: 2, name: 'master', icon: 'icon-mat-dataset' },
//   { id: 3, name: 'transaksi', icon: 'icon-mat-sync_alt' },
//   { id: 4, name: 'laporan', icon: 'icon-mat-donut_large' },
//   { id: 5, name: 'setting', icon: 'icon-mat-settings' }
// ])

const tab = ref('dashboard')
console.log('router', props.dark)
</script>

<style lang="scss" scoped></style>
