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

// import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
// import { uniqueId } from 'src/modules/utils'
// const table = usePembelianTable()
// const slug = 'PBL-' + uniqueId()
// console.log(slug)
const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const menus = ref([
  { id: 1, name: 'Pembelian', icon: 'icon-mat-inventory_2', link: '/pembelian/PBL-' },
  { id: 2, name: 'Penjualan', icon: 'icon-mat-shopping_bag', link: '/penjualan/PJL-' },
  { id: 3, name: 'Transaksi Penerimaan', icon: 'icon-mat-account_balance_wallet', link: '/transaksi/penerimaan' },
  { id: 4, name: 'Beban Biaya', icon: 'icon-mat-payment', link: '/biaya' },
  { id: 5, name: 'Retur', icon: 'icon-mat-assignment_return', link: '/retur' },
  { id: 6, name: 'History', icon: 'icon-mat-inventory', link: '/history' }
  // { id: 7, name: 'Bayar Hutang', icon: 'icon-mat-credit_score', link: '/bayar hutang' },

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
