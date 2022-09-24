<template>
  <div
    v-for="(item, i) in items"
    :key="i"
  >
    <q-card>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <q-item
          v-ripple
          class="menu"
          :active="table.nama===item.value"
          :active-class="setting.dark ? 'page-dark text-white aktif-dark' : ' bg-grey-4 text-primary aktif'"
          clickable
          exact
          @click="table.pilihTransaksi(item)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            {{ item.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script setup>
import { useHistoryTable } from 'src/stores/history/table'
import { useSettingStore } from 'src/stores/setting/setting'
import { ref } from 'vue'

const items = ref([
  { id: 0, name: 'Seluruhnya', value: 'all', icon: 'icon-mat-density_small' },
  { id: 1, name: 'Draft', value: 'draft', icon: 'icon-mat-insert_drive_file' },
  { id: 2, name: 'Pembelian', value: 'PEMBELIAN', icon: 'icon-mat-inventory_2' },
  { id: 3, name: 'Penjualan', value: 'PENJUALAN', icon: 'icon-mat-shopping_bag' },
  { id: 4, name: 'Transaksi Penerimaan', value: 'PENERIMAAN', icon: 'icon-mat-account_balance_wallet' },
  { id: 5, name: 'Beban Biaya', value: 'BEBAN', icon: 'icon-mat-payment' },
  { id: 6, name: 'Retur Pembelian', value: 'RETUR PEMBELIAN', icon: 'icon-mat-assignment_return' },
  { id: 7, name: 'Retur Penjualan', value: 'RETUR PENJUALAN', icon: 'icon-mat-assignment_return' }
])
const setting = useSettingStore()
const table = useHistoryTable()
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
