<template>
  <div
    v-for="(item, i) in items"
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
          :active-class="setting.dark ? 'bg-grey-9 text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
          clickable
          exact
          @click="setting.pilihItem(item)"
        >
          <!-- <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section> -->
          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useSettingStore } from 'src/stores/setting/setting'
import { computed } from 'vue'
const auth = useAuthStore().user.role
const items = computed(() => {
  const apem = setting.menus.filter(data => { return data.name === 'setting' })
  if (apem.length) {
    console.log(apem[0].submenus)
    if (auth === 'root') {
      return apem[0].submenus
    } else {
      return apem[0].submenus.filter(data => { return data.value !== 'menu' })
    }
  }
  return [0, 0]
})

// import { ref } from 'vue'
// const items = ref([
//   { id: 0, name: 'User', value: 'user', icon: 'icon-mat-density_small' },
//   { id: 1, name: 'Menu', value: 'menu', icon: 'icon-mat-insert_drive_file' }
// { id: 2, name: 'Pembelian', value: 'PEMBELIAN', icon: 'icon-mat-inventory_2' },
// { id: 3, name: 'Penjualan', value: 'PENJUALAN', icon: 'icon-mat-shopping_bag' },
// { id: 4, name: 'Transaksi Penerimaan', value: 'PENERIMAAN', icon: 'icon-mat-account_balance_wallet' },
// { id: 5, name: 'Beban Biaya', value: 'BEBAN', icon: 'icon-mat-payment' },
// { id: 6, name: 'Retur Pembelian', value: 'RETUR PEMBELIAN', icon: 'icon-mat-assignment_return' },
// { id: 7, name: 'Retur Penjualan', value: 'RETUR PENJUALAN', icon: 'icon-mat-assignment_return' },
// { id: 8, name: 'Form Penyesuaian', value: 'FORM PENYESUAIAN', icon: 'icon-mat-tune' }
// ])
const setting = useSettingStore()
</script>
<style lang="scss" scoped>
.menu {
  text-decoration: none;
  color: $grey-5;
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
