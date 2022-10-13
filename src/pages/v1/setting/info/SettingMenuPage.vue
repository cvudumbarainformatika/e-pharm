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
                @click="pilihMenu(item)"
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
                      @click="editMenu(item)"
                    >
                      <q-popup-proxy
                        :offset="[260, -42]"
                        transition-show="jump-up"
                        transition-hide="jump-down"
                        @before-show="beforeEdit(item)"
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
                      @click="deleteMenu(item)"
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
          v-for="(item, i) in setting.menus[index].submenus"
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
                :active="setting.menu===item.value"
                :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
                clickable
                exact
                @click="pilihMenu(item)"
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
                  actions
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

const pilihMenu = val => {
  curentmenu.value = val.name
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
// Menu
const add = ref(false)
const namaMenu = ref(null)
const iconMenu = ref('icon-mat-')
const linkMenu = ref(null)
const uNamaMenu = val => { namaMenu.value = val }
const uIconMenu = val => { iconMenu.value = val }
const uLinkMenu = val => { linkMenu.value = val }

const tambahMenu = () => {
  const temp = { name: namaMenu.value, icon: iconMenu.value, link: linkMenu.value }
  setting.menus.push(temp)
  save()
  console.log(temp)
}
const batal = () => {
  popup.value = false
  namaMenu.value = null
  iconMenu.value = 'icon-mat-'
  linkMenu.value = null
  add.value = false
}

const beforeEdit = val => {
  namaMenu.value = val.name
  iconMenu.value = val.icon
  linkMenu.value = val.link
}
let indexEdit = null
const editMenu = val => {
  popup.value = true
  const index = findWithAttr(setting.menus, 'name', val.name)
  indexEdit = index
  const menu = setting.menus[index]

  console.log('edit', menu)
}
const saveEdit = val => {
  const temp = { name: namaMenu.value, icon: iconMenu.value, link: linkMenu.value }
  setting.menus[indexEdit] = temp
  curentmenu.value = temp.name
  save()
  // console.log('edit', menu)
}
const deleteMenu = val => {
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>Perusahaan: ${val}</strong> Akan ditambahkan?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {

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
  const temp = { name: namaSubMenu.value, value: routeMenu.value, icon: iconSubMenu.value, link: linkSubMenu.value }
  const ind = findWithAttr(setting.menus, 'name', curentmenu.value)
  subMenus.value = setting.menus[ind].submenus
  // console.log('sub menu', subMenus.value)
  subMenus.value.push(temp)
  setting.menus[ind].submenus = subMenus.value
  save()
  // setting.saveSetting().then(() => {
  //   setting.getDataSetting()
  //   namaSubMenu.value = null
  //   routeMenu.value = null
  //   iconSubMenu.value = 'icon-mat-'
  //   linkSubMenu.value = null
  //   addsub.value = false
  // })
  console.log(temp)
}
const batalSub = () => {
  namaSubMenu.value = null
  routeMenu.value = null
  iconSubMenu.value = 'icon-mat-'
  linkSubMenu.value = null
  addsub.value = false
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
