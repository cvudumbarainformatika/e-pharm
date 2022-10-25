<template>
  <q-card class="full-width">
    <q-card-section>
      <div class="text-h6 text-weight-bold">
        Menu Setting
      </div>
      <div class="title-desc">
        Edit Menu
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section horizontal>
      <q-card-section style="width:400px;">
        <div class="row q-mb-sm">
          <app-btn
            v-if="add===false"
            label="Tambah Menu"
            @click="add=true"
          />
        </div>
        <div v-if="add===true">
          <AddMenu
            :nama="namaMenu"
            :icon="iconMenu"
            :link="linkMenu"
            :loading="setting.loading"
            @updatenama="uNamaMenu"
            @updateicon="uIconMenu"
            @updatelink="uLinkMenu"
            @batal="batal"
            @simpan="tambahMenu"
          />
        </div>
        <div
          v-for="(item, i) in setting.menus"
          :key="i"
        >
          <q-card>
            <q-list
              bordered
              padding
              class="rounded-borders text-primary q-mb-sm"
            >
              <q-item

                v-ripple
                class="menu"
                :active="curentmenu===item.name"
                :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
                clickable
                exact
                @click="pilihMenu(item, i)"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section>
                  link : {{ item.link }}
                </q-item-section>
                <q-item-section>
                  <div class="row">
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="primary"
                      icon="icon-mat-edit"
                    >
                      <q-popup-proxy
                        :offset="[260, -42]"
                        transition-show="jump-up"
                        transition-hide="jump-down"
                        @before-show="beforeEdit(item, i)"
                      >
                        <q-banner>
                          <AddMenu
                            :nama="namaMenu"
                            :icon="iconMenu"
                            :link="linkMenu"
                            :loading="setting.loading"
                            @updatenama="uNamaMenu"
                            @updateicon="uIconMenu"
                            @updatelink="uLinkMenu"
                            @batal="batal"
                            @simpan="saveEdit"
                          />
                        </q-banner>
                      </q-popup-proxy>
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Edit Data
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="negative"
                      icon="icon-mat-delete_sweep"
                      @click="deleteMenu(item,i)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Delete Data
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-card-section>
      <q-card-section style="width:400px;">
        <div class="row q-mb-sm">
          <app-btn
            v-if="addsub===false"
            label="Tambah Sub Menu"
            @click="addsub=true"
          />
        </div>
        <div v-if="addsub===true">
          <AddSubMenu
            :nama="namaSubMenu"
            :icon="iconSubMenu"
            :link="linkSubMenu"
            :route="routeMenu"
            :loading="setting.loading"
            @updatenama="uNamaSubMenu"
            @updateicon="uIconSubMenu"
            @updatelink="uLinkSubMenu"
            @updateroute="uRouteMenu"
            @batal="batalSub"
            @simpan="tambahSubMenu"
          />
        </div>
        <div
          v-if="setting.menus[index]"
        >
          <q-card
            v-for="(item, i) in setting.menus[index].submenus"
            :key="i"
          >
            <q-list
              bordered
              padding
              class="rounded-borders text-primary q-mb-sm"
            >
              <q-item
                v-ripple
                class="menu"
                :active="setting.menu===item.value"
                :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
                clickable
                exact
                @click="pilihSubMenu(item, i)"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  {{ item.name }}
                </q-item-section>
                <q-item-section>
                  <div class="row q-mb-sm">
                    link : {{ item.link }}
                  </div>
                  <div class="row q-mb-sm">
                    nama route : {{ item.value }}
                  </div>
                </q-item-section>
                <q-item-section>
                  <div class="row justify-end">
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="primary"
                      icon="icon-mat-edit"
                    >
                      <q-popup-proxy
                        :offset="[300, -42]"
                        transition-show="jump-up"
                        transition-hide="jump-down"
                        @before-show="beforeSubEdit(item, i)"
                      >
                        <q-banner>
                          <AddSubMenu
                            :nama="namaSubMenu"
                            :link="linkSubMenu"
                            :icon="iconSubMenu"
                            :route="routeMenu"
                            :loading="setting.loading"
                            @updatenama="uNamaSubMenu"
                            @updateicon="uIconSubMenu"
                            @updatelink="uLinkSubMenu"
                            @updateroute="uRouteMenu"
                            @batal="batalSub"
                            @simpan="saveSubEdit"
                          />
                        </q-banner>
                      </q-popup-proxy>
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Edit Data
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      class=""
                      size="sm"
                      round
                      color="negative"
                      icon="icon-mat-delete_sweep"
                      @click="deleteSubMenu(item, i)"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="center middle"
                      >
                        Delete Data
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
  <!-- { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard', link: 'dashboard' }, -->

  <!-- { id: 1, name: 'Transaksi Pemesanan', value: 'transaksi.pemesanan', link: 'transaksi/pemesanan/TRP-' }, -->
</template>
<script setup>
import { Dialog } from 'quasar'
import { findWithAttr } from 'src/modules/utils'
import { useSettingStore } from 'src/stores/setting/setting'
import { computed, ref } from 'vue'
import AddMenu from './AddMenu.vue'
import AddSubMenu from './AddSubMenu.vue'
const setting = useSettingStore()

const index = computed(() => {
  const ind = findWithAttr(setting.menus, 'name', curentmenu.value)
  console.log('index', ind)
  return ind
})

const pilihMenu = (val, index) => {
  curentmenu.value = val.name
  indexEdit = index
}
const save = () => {
  setting.saveSetting().then(() => {
    setting.getDataSetting()
    add.value = false
    namaMenu.value = null
    iconMenu.value = 'icon-mat-'
    linkMenu.value = null
    namaSubMenu.value = null
    routeMenu.value = null
    iconSubMenu.value = 'icon-mat-'
    linkSubMenu.value = null
    addsub.value = false
  })
}
const popup = ref(false)
const curentmenu = ref('Dashboard')
// const sub = [
//   { name: 'dashboard', icon: 'icon-mat-dashboard', link: 'dashboard', submenus: [] },
//   {
//     name: 'master',
//     icon: 'icon-mat-dataset',
//     link: 'master',
//     submenus: [
//       { name: 'Satuan', icon: 'icon-mat-gas_meter', link: 'satuan' },
//       { name: 'Rak', icon: 'icon-mat-table_rows', link: 'rak' },
//       { name: 'Kategori', icon: 'icon-mat-category', link: 'kategori' },
//       { name: 'Distributor', icon: 'icon-mat-rv_hookup', link: 'supplier' },
//       { name: 'Dokter', icon: 'icon-mat-medication', link: 'dokter' },
//       { name: 'Produk', icon: 'icon-mat-workspaces', link: 'produk' },
//       { name: 'Beban', icon: 'icon-mat-assessment', link: 'beban' },
//       { name: 'Penerimaan', icon: 'icon-mat-attach_money', link: 'penerimaan' },
//       { name: 'Customer', icon: 'icon-mat-local_shipping', link: 'customer' },
//       { name: 'Merk', icon: 'icon-mat-auto_awesome_mosaic', link: 'merk' },
//       { name: 'Perusahaan', icon: 'icon-mat-business', link: 'perusahaan' }

//     ]
//   },
//   {
//     name: 'transaksi',
//     icon: 'icon-mat-sync_alt',
//     link: 'transaksi',
//     submenus: [
//       { name: 'Pembelian', value: 'pembelian', icon: 'icon-mat-inventory_2', link: '/pembelian/PBL-' },
//       { name: 'Penjualan', value: 'penjualan', icon: 'icon-mat-shopping_bag', link: '/penjualan/PJL-' },
//       { name: 'Transaksi Penerimaan', value: 'transaksi.penerimaan', icon: 'icon-mat-account_balance_wallet', link: '/transaksi/penerimaan' },
//       { name: 'Beban Biaya', value: 'biaya', icon: 'icon-mat-payment', link: '/biaya' },
//       { name: 'Retur', value: 'retur', icon: 'icon-mat-assignment_return', link: '/retur' }

//     ]
//   },
//   {
//     name: 'history',
//     icon: 'icon-mat-history',
//     link: 'history',
//     submenus: [
//       { name: 'Seluruhnya', value: 'all', icon: 'icon-mat-density_small' },
//       { name: 'Draft', value: 'draft', icon: 'icon-mat-insert_drive_file' },
//       { name: 'Pembelian', value: 'PEMBELIAN', icon: 'icon-mat-inventory_2' },
//       { name: 'Penjualan', value: 'PENJUALAN', icon: 'icon-mat-shopping_bag' },
//       { name: 'Transaksi Penerimaan', value: 'PENERIMAAN', icon: 'icon-mat-account_balance_wallet' },
//       { name: 'Beban Biaya', value: 'BEBAN', icon: 'icon-mat-payment' },
//       { name: 'Retur Pembelian', value: 'RETUR PEMBELIAN', icon: 'icon-mat-assignment_return' },
//       { name: 'Retur Penjualan', value: 'RETUR PENJUALAN', icon: 'icon-mat-assignment_return' },
//       { name: 'Form Penyesuaian', value: 'FORM PENYESUAIAN', icon: 'icon-mat-tune' }
//     ]
//   },
//   { name: 'laporan', icon: 'icon-mat-description', link: 'laporan', submenus: [] },
//   {
//     name: 'setting',
//     icon: 'icon-mat-settings',
//     link: 'setting',
//     submenus: [
//       { name: 'User', value: 'user', icon: 'icon-mat-density_small' },
//       { name: 'Menu', value: 'menu', icon: 'icon-mat-insert_drive_file' }
//     ]
//   }
// ]
// Menu
const add = ref(false)
const namaMenu = ref(null)
const iconMenu = ref('icon-mat-')
const linkMenu = ref(null)
const uNamaMenu = val => { namaMenu.value = val }
const uIconMenu = val => { iconMenu.value = val }
const uLinkMenu = val => { linkMenu.value = val }

const tambahMenu = () => {
  // setting.menus = sub // ini untuk seed all data
  const temp = { name: namaMenu.value, icon: iconMenu.value, value: linkMenu.value.toLowerCase(), link: linkMenu.value, submenus: [] }
  setting.menus.push(temp)
  save()
  // console.log(temp)
}
const batal = () => {
  popup.value = false
  namaMenu.value = null
  iconMenu.value = 'icon-mat-'
  linkMenu.value = null
  add.value = false
}

let indexEdit = 0
const subMenu = ref([])
const beforeEdit = (val, i) => {
  namaMenu.value = val.name
  iconMenu.value = val.icon
  linkMenu.value = val.link
  subMenu.value = val.submenus
  indexEdit = i
}
const saveEdit = val => {
  const temp = { name: namaMenu.value, icon: iconMenu.value, link: linkMenu.value, value: linkMenu.value.toLowerCase(), submenus: subMenu.value }
  setting.menus[indexEdit] = temp
  curentmenu.value = temp.name
  save()
  // console.log('edit', menu)
}

const deleteMenu = (val, index) => {
  // const index = findWithAttr(setting.menus, 'name', val.name)
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>menu: ${val.name}</strong> Akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      if (index > -1) { // only splice array when item is found
        setting.menus.splice(index, 1) // 2nd parameter means remove one item only
        save()
      }
    })
}

// sub menu
const addsub = ref(false)
const subMenus = ref([])
const namaSubMenu = ref(null)
const iconSubMenu = ref('icon-mat-')
const routeMenu = ref(null)
const linkSubMenu = ref(null)
const uNamaSubMenu = val => { namaSubMenu.value = val }
const uIconSubMenu = val => { iconSubMenu.value = val }
const uRouteMenu = val => { routeMenu.value = val }
const uLinkSubMenu = val => { linkSubMenu.value = val }

const tambahSubMenu = () => {
  const temp = { name: namaSubMenu.value, value: routeMenu.value, link: linkSubMenu.value, icon: iconSubMenu.value }
  const ind = findWithAttr(setting.menus, 'name', curentmenu.value)
  subMenus.value = setting.menus[ind].submenus ? setting.menus[ind].submenus : []
  // console.log('sub menu', subMenus.value)
  subMenus.value.push(temp)
  setting.menus[ind].submenus = subMenus.value
  // setting.menus[ind].submenus = sub
  save()
  console.log(temp)
}
const batalSub = () => {
  namaSubMenu.value = null
  routeMenu.value = null
  iconSubMenu.value = 'icon-mat-'
  linkSubMenu.value = null
  addsub.value = false
}

let indexSubEdit = 0
const beforeSubEdit = (val, index) => {
  namaSubMenu.value = val.name
  routeMenu.value = val.value
  linkSubMenu.value = val.link
  iconSubMenu.value = val.icon
  indexSubEdit = index
  console.log('before menu', setting.menus[indexEdit])
  console.log('before sub', setting.menus[indexEdit].submenus[index])
  // console.log('before sub', sub)
}
const curentSubMenu = ref('')
const saveSubEdit = val => {
  const temp = { name: namaSubMenu.value, value: routeMenu.value, link: linkSubMenu.value, icon: iconSubMenu.value }
  const menu = setting.menus[indexEdit].submenus
  menu[indexSubEdit] = temp
  save()
  console.log('edit', menu)
  curentSubMenu.value = temp.name
}
const deleteSubMenu = (val, index) => {
  // const index = findWithAttr(setting.menus, 'name', val.name)
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>sub menu: ${val.name}</strong> Akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      if (index > -1) { // only splice array when item is found
        setting.menus[indexEdit].submenus.splice(index, 1) // 2nd parameter means remove one item only
        save()
      }
    })
}
const pilihSubMenu = val => {
  curentSubMenu.value = val.name
  console.log(val)
}
</script>
<style lang="scss" scoped>
.menu {
  text-decoration: none;
  color: $grey-9;
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
</style>
