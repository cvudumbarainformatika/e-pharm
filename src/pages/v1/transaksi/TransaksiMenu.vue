<template>
  <div
    class="q-pa-sm "
  >
    <!-- style="max-width: 150px" -->
    <q-card>
      <div
        v-if="setting.transaksiLoading"
        class="flex column flex-center bg-loading-bg__table"
        style="height:200px"
      >
        <div>
          <q-spinner-cube
            color="primary"
            size="40px"
          />
        </div>
        <div :class="'text-primary q-mt-sm'">
          Mohon maaf, masih loading ...
        </div>
      </div>
      <q-list
        v-if="!setting.transaksiLoading"
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <!-- <div
        replace
      > -->
        <q-item
          v-for="(menu,i) in menus.submenus"
          :key="i"
          v-ripple
          class="menu"
          :active="menu.value!=='retur' ? menu.value === path: 'detail.retur' === path || menu.value === path"
          :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
          :to="`${menu.link}`"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section>{{ menu.name }} </q-item-section>
        </q-item>
      <!-- </div> -->
      </q-list>
    </q-card>
  </div>
</template>
<script setup>
// import { routerInstance } from 'src/boot/router'
import { useSettingStore } from 'src/stores/setting/setting'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const menus = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'transaksi' })
  if (apem.length) return apem[0]
  return [0, 0]
})

const setting = useSettingStore()
const path = computed(() => useRoute().name)
// import { computed, ref } from 'vue'
// console.log('path', path)
// const menus = ref([
//   { id: 1, name: 'Pembelian', value: 'pembelian', icon: 'icon-mat-inventory_2', link: '/pembelian/PBL-' },
//   { id: 2, name: 'Penjualan', value: 'penjualan', icon: 'icon-mat-shopping_bag', link: '/penjualan/PJL-' },
//   { id: 3, name: 'Transaksi Penerimaan', value: 'transaksi.penerimaan', icon: 'icon-mat-account_balance_wallet', link: '/transaksi/penerimaan' },
//   { id: 4, name: 'Beban Biaya', value: 'biaya', icon: 'icon-mat-payment', link: '/biaya' },
//   { id: 5, name: 'Retur', value: 'retur', icon: 'icon-mat-assignment_return', link: '/retur' }
// { id: 6, name: 'History', icon: 'icon-mat-inventory', link: '/history' }
// { id: 7, name: 'Bayar Hutang', icon: 'icon-mat-credit_score', link: '/bayar hutang' },

// ])
// function activated(val) {
//   if (val) {
//     if (props.dark) {
//       return 'page-dark text-white'
//     } else {
//       return 'bg-grey-4 text-primary'
//     }
//   }
//   return 'text-grey-5 bg-white'
// }
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
