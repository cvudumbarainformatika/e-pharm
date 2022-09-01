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
import { ref } from 'vue'

const items = ref([

  { id: 1, name: 'Pembelian', icon: 'icon-mat-inventory_2', link: '/pembelian/PBL-' },
  { id: 2, name: 'Penjualan', icon: 'icon-mat-shopping_bag', link: '/penjualan/PJL-' },
  { id: 3, name: 'Transaksi Penerimaan', icon: 'icon-mat-account_balance_wallet', link: '/transaksi/penerimaan' },
  { id: 4, name: 'Beban Biaya', icon: 'icon-mat-payment', link: '/biaya' },
  { id: 5, name: 'Retur', icon: 'icon-mat-assignment_return', link: '/retur' }
])
</script>
