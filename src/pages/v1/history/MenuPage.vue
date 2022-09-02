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
import { ref } from 'vue'

const items = ref([
  { id: 0, name: 'Seluruhnya', value: 'all', icon: 'icon-mat-density_small' },
  { id: 1, name: 'Pembelian', value: 'PEMBELIAN', icon: 'icon-mat-inventory_2' },
  { id: 2, name: 'Penjualan', value: 'PENJUALAN', icon: 'icon-mat-shopping_bag' },
  { id: 3, name: 'Transaksi Penerimaan', value: 'PENERIMAAN', icon: 'icon-mat-account_balance_wallet' },
  { id: 4, name: 'Beban Biaya', value: 'BEBAN', icon: 'icon-mat-payment' },
  { id: 5, name: 'Retur', value: 'RETUR', icon: 'icon-mat-assignment_return' }
])
const table = useHistoryTable()
</script>
