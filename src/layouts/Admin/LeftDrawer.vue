<template>
  <q-drawer
    show-if-above
    :width="70"
  >
    <!-- logo -->
    <div class="absolute-top">
      <div
        class=" flex flex-center"
        style="height: 60px;"
      >
        <q-avatar size="40px">
          <img src="~assets/logos/logo.png">
        </q-avatar>
      </div>
    </div>
    <!-- <q-scroll-area
        class="fit"
        style="height:calc(100%-50px) ;padding-top:50px"
      > -->
    <div
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <router-link
        v-for="(menu, i) in menus"
        :key="i"
        :to="`/${menu.link}`"
        replace
        class="sidebar flex flex-center"
        :active-class="props.dark ? 'bg-grey-9 text-white aktif-dark' : 'bg-grey-4 text-primary aktif'"
        exact
        @click="menuClick(menu)"
      >
        <!-- :class="!dark?'page-light':'page-dark'" -->
        <q-tooltip
          class="bg-primary"
          anchor="center right"
          self="center left"
          :offset="[5, 5]"
        >
          <strong class="">{{ menu.name }}</strong>
          <!-- <em>right</em> -->
          (<q-icon name="icon-mat-keyboard_arrow_right" />)
        </q-tooltip>
        <q-icon
          :name="menu.icon"
          size="25px"
        />
      </router-link>
    </div>
    <!-- </q-scroll-area> -->

    <div class="just-shadow absolute-full overflow-hidden no-pointer-events" />
  </q-drawer>
</template>

<script setup>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'

import { routerInstance } from 'src/boot/router'
// import { uniqueId } from 'src/modules/utils'
// import { useSettingStore } from 'src/stores/setting/setting'
// import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
// import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
// import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: { type: Object, default: () => {} }
})

const menuClick = val => {
  // console.log('menu path', val.link)
  // console.log('curent path', routerInstance.currentRoute.value.path)
  // console.log('menu name ', val.name)
  // console.log('menu value', val.value)
  // console.log('curent name', routerInstance.currentRoute.value.name)
  // const gaPunya = val.submenus
  // console.log('name', !!val.submenus)
  // const store = usePembelianDialog()
  // const setting = useSettingStore()
  // const table = usePembelianTable()

  if (val.name === 'transaksi') {
    // console.log('transaksi')
    const oldSlug = routerInstance.currentRoute.value.params.slug ? routerInstance.currentRoute.value.params.slug : 'apem'
    // const name = routerInstance.currentRoute.value.name
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
    console.log('ga masuk', val.submenus)
    const nama = val.name
    routerInstance.replace({ name: nama })
  }
}
// const menus = ref([
//   { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard', link: 'dashboard' },
//   { id: 2, name: 'master', icon: 'icon-mat-dataset', link: 'master' },
//   { id: 3, name: 'transaksi', icon: 'icon-mat-sync_alt', link: 'transaksi' },
//   { id: 4, name: 'history', icon: 'icon-mat-history', link: 'history' },
//   { id: 4, name: 'laporan', icon: 'icon-mat-description', link: 'laporan' },
//   { id: 5, name: 'setting', icon: 'icon-mat-settings', link: 'setting' }
// ])

// function activated(val) {
//   if (val) {
//     if (props.dark) {
//       return 'page-dark text-white'
//     } else {
//       return 'bg-grey-4 text-primary'
//     }
//   }
//   return 'text-grey-5'
// }

// const router = useRouter()
// console.log('router', props.dark)
</script>

<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height:60px;
}

a.sidebar {
  text-decoration: none;
  color:$grey-5;
}
a.router-link-active, a.router-link-exact-active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
  }
.aktif {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
  }
.aktif-dark {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $white;
  }

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
