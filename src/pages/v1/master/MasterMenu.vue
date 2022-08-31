<template>
  <div
    class="q-pa-sm "
  >
    <!-- style="max-width: 150px" -->
    <q-card>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <!-- <div
        replace
      > -->
        <q-item
          v-for="(menu,i) in menus"
          :key="i"
          v-ripple
          class="menu"
          :active-class="activated(true)"
          :to="`${menu.link}`"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section>{{ menu.name }}</q-item-section>
        </q-item>
      <!-- </div> -->
      </q-list>
    </q-card>
  </div>
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
  { id: 1, name: 'Satuan', icon: 'icon-mat-gas_meter', link: 'satuan' },
  { id: 2, name: 'Rak', icon: 'icon-mat-table_rows', link: 'rak' },
  { id: 3, name: 'Kategori', icon: 'icon-mat-category', link: 'kategori' },
  { id: 4, name: 'Supplier', icon: 'icon-mat-rv_hookup', link: 'supplier' },
  { id: 5, name: 'Dokter', icon: 'icon-mat-medication', link: 'dokter' },
  { id: 6, name: 'Produk', icon: 'icon-mat-workspaces', link: 'produk' },
  { id: 7, name: 'Beban', icon: 'icon-mat-assessment', link: 'beban' },
  { id: 7, name: 'Penerimaan', icon: 'icon-mat-attach_money', link: 'penerimaan' },
  { id: 8, name: 'Distributor', icon: 'icon-mat-local_shipping', link: 'customer' },
  { id: 9, name: 'Merk', icon: 'icon-mat-auto_awesome_mosaic', link: 'merk' },
  { id: 10, name: 'Perusahaan', icon: 'icon-mat-business', link: 'perusahaan' }

])
function activated(val) {
  if (val) {
    if (props.dark) {
      return 'page-dark text-white'
    } else {
      return 'bg-grey-4 text-primary'
    }
  }
  return 'text-grey-5 bg-white'
}
</script>

<style lang="scss" scoped>

.my-card {
  width: 150px;
  height: 200px;
  margin: 10px;
}

.container{
  width: calc(100% - 90px);
  height:60px;
}

a.menu{
  text-decoration: none;
  color:$grey-5;
}

a.router-link-active, a.router-link-exact-active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
  }

</style>
