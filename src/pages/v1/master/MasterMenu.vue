<template>
  <div
    class="q-pa-md"
    style="max-width: 250px"
  >
    <q-list
      bordered
      padding
      class="rounded-borders text-primary"
    >
      <router-link
        v-for="(menu,i) in menus"
        :key="i"
        :to="`${menu.name}`"
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
  { id: 1, name: 'satuan', icon: 'icon-mat-gas_meter' },
  { id: 2, name: 'produk', icon: 'icon-mat-workspaces' },
  { id: 3, name: 'rak', icon: 'icon-mat-table_rows' },
  { id: 4, name: 'kategori', icon: 'icon-mat-category' }

])
function activated(val) {
  if (val) {
    if (props.dark) {
      return 'page-dark text-white'
    } else {
      return 'bg-grey-4 text-primary'
    }
  }
  return 'text-grey-5'
}
</script>

<style lang="scss" scoped>
.my-menu-link{
  color: white;
  background: #35df25;
}

.my-card {
  width: 150px;
  height: 200px;
  margin: 10px;
}
</style>
