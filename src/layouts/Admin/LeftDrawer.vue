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
      v-if="Object.keys(props.menus).length"
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <!-- <div
        v-for="(menu, i) in menus"
        :key="i"
        @mouseenter="menuHover(menu,i)"
      >
        <router-link
          :to="`/${menu.link}`"
          replace
          class="sidebar flex flex-center"
          :active-class="props.dark ? 'bg-grey-9 text-white aktif-dark' : 'bg-grey-4 text-primary aktif'"
          exact
          @click="menuClick(menu)"
        >
          <q-tooltip
            class="bg-primary"
            anchor="center right"
            self="center left"
            :offset="[5, 5]"
          >
            <strong class="">{{ menu.name }}</strong>

            (<q-icon name="icon-mat-keyboard_arrow_right" />)
          </q-tooltip>
          <q-icon
            :name="menu.icon"
            size="25px"
          />
        </router-link>
      </div> -->
      <div
        v-for="(menu, i) in props.menus"
        :key="i"
        @mouseenter="hover(menu,i)"
      >
        <q-item
          ref="refItem"
          :key="i"
          :to="`/${menu.link}`"
          replace
          class="sidebar flex flex-center"
          :active-class="props.dark ? 'aktif-dark text-white' :'aktif text-primary'"
          :active="aktif(path)===menu.link"
          @click="menuClick(menu,i)"
        >
          <q-menu
            ref="refMenu"
            anchor="top right"
            self="top left"
            transition-show="slide-down"
            transition-hide="slide-right"
            :offset="[0,0]"
            fit
            max-height="600px"
          >
            <div
              v-if="menu.submenus.length"
              class="anu"
            >
              <!-- style="width:250px; height:calc(100%-60px) ;" -->
              <q-card>
                <q-card-section>
                  <div class="text-weight-bold f-12">
                    <q-item :to="`/${menu.link}`">
                      <q-item-section>{{ menu.name }}</q-item-section>
                    </q-item>
                  </div>
                  <div class="q-my-sm">
                    <q-separator />
                  </div>
                  <HistoryMenuPage v-if="history.tableMenu" />
                  <MasterMenu v-if="setting.submenuMaster" />
                  <SettingMenuPage v-if="setting.submenuEvent" />
                  <TransaksiMenu v-if="setting.submenuTransaksi" />
                <!--
                <div
                  v-for="(submenu,n) in menu.submenus"
                  :key="n"
                >
                  <div v-if="submenu.link">
                      <q-item
                      ref="refSubItem"
                      :to="`/${submenu.link}`"
                      replace
                      class="submenu flex flex-center item item-link"
                      :active-class="dark? 'active-dark' : 'active'"
                      :active="path===submenu.name"
                      exact
                    >
                      <q-item-section
                        v-if="submenu.icon"
                        avatar
                      >
                        <q-icon
                          :name="submenu.icon"
                          size="25px"
                        />
                      </q-item-section>
                      <q-item-section>{{ submenu.nama }}</q-item-section>
                    </q-item>
                  </div>
                </div>
                    -->
                </q-card-section>
              </q-card>
            </div>
            <q-card v-if="!menu.submenus.length">
              <q-card-section>
                <div class="text-weight-bold f-12">
                  <q-item :to="`/${menu.link}`">
                    <q-item-section>{{ menu.name }}</q-item-section>
                  </q-item>
                </div>
              </q-card-section>
            </q-card>
          </q-menu>
          <!-- <q-tooltip
                class="bg-primary"
                anchor="center right"
                self="center left"
                :offset="[5, 5]"
              >
                <strong class="">{{ menu.name }}</strong>

                (<q-icon name="icon-mat-keyboard_arrow_right" />)
              </q-tooltip> -->
          <q-icon
            :name="menu.icon"
            size="25px"
          />
        </q-item>
      </div>
    </div>
    <!-- </q-scroll-area> -->
    <!-- skeleton -->
    <div
      v-if="Object.keys(props.menus).length===0"
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>

      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>

      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>

      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>

      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>

      <div class="sidebar flex flex-center">
        <q-skeleton
          animation="pulse"
          width="25px"
          height="25px"
        />
      </div>
    </div>

    <div class="just-shadow absolute-full overflow-hidden no-pointer-events">
    <!-- </div> -->
    </div>
  </q-drawer>
</template>

<script setup>
import { routerInstance } from 'src/boot/router'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryTable } from 'src/stores/history/table'
import { useSettingStore } from 'src/stores/setting/setting'

import HistoryMenuPage from 'src/pages/v1/history/MenuPage.vue'
import MasterMenu from 'src/pages/v1/master/MasterMenu.vue'
import SettingMenuPage from 'src/pages/v1/setting/menu/MenuPage.vue'
import TransaksiMenu from 'src/pages/v1/transaksi/TransaksiMenu.vue'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  menus: { type: Object, default: () => {} }
})
const setting = useSettingStore()
const history = useHistoryTable()

const path = computed(() => useRoute().name)

const aktif = (apem) => {
  const temp = apem.split('/')
  return temp[0]
}
const refItem = ref(null)
const refMenu = ref(null)
const prev = ref(0)
const hover = (menu, i) => {
  refMenu.value[i].show()
  if (!refItem.value[i].active) {
    refMenu.value[i].offset[0] = 16
    refMenu.value[i].offset[1] = 0
  } else {
    refMenu.value[i].offset[0] = 0
    refMenu.value[i].offset[1] = 0
  }

  if (i !== prev.value) {
    leave(prev.value)
  }
  prev.value = i
  // setting.setOpen()
  // console.log('menu', menu)
  // console.log('ref menu', refMenu.value[i])
  if (menu.name === 'setting') {
    refMenu.value[i].offset[1] = 365
    setting.menuOpen()
  } else {
    setting.menuClose()
  }
  if (menu.name === 'master') {
    refMenu.value[i].offset[1] = 125
    setting.masterOpen()
  } else {
    setting.masterClose()
  }
  if (menu.name === 'transaksi') {
    refMenu.value[i].offset[1] = 185
    setting.transaksiOpen()
  } else {
    setting.transaksiClose()
  }
  if (menu.name === 'history') {
    refMenu.value[i].offset[1] = 245
    history.menuOpen()
  } else {
    history.menuClose()
  }
}
const leave = (i) => {
  refMenu.value[i].hide()
}
const menuClick = val => {
  // menuHover(val)
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
.anu{
  width: 250px;
  height: calc(100%-60px);
}
.sidebar {
  width: calc(100% - 10px);
  height:60px;
}

a.sidebar {
  text-decoration: none;
  color:$grey-5;
}

.submenu {
  width: calc(100% - 10px);
  height: 30px;
  text-decoration: none;
  color: $grey-5;
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
    background-color: $grey-4;
  }
.aktif-dark {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $white;
    background-color: $dark-page;
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
