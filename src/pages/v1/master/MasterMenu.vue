<template>
  <div
    class="q-pa-sm "
    style="max-width: 150px"
  >
    <q-list
      bordered
      padding
      class="rounded-borders text-primary"
    >
      <router-link
        v-for="(menu,i) in menus"
        :key="i"
        :to="`${menu.link}`"
        replace
        class="menu"
        :active-class="activated(true)"
      >
        <q-item
          v-ripple
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section>{{ menu.name }}</q-item-section>
        </q-item>
      </router-link>
    </q-list>
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
  { id: 2, name: 'Produk', icon: 'icon-mat-workspaces', link: 'produk' },
  { id: 3, name: 'Rak', icon: 'icon-mat-table_rows', link: 'rak' },
  { id: 4, name: 'Kategori', icon: 'icon-mat-category', link: 'kategori' }

])
function activated(val) {
  if (val) {
    if (props.dark) {
      return 'page-dark text-white'
    } else {
      return 'bg-cyan-1 text-secondary'
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
