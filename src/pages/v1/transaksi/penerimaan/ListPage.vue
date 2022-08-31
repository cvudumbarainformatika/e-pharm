<template>
  <q-card>
    <div>
      <q-list
        bordered
        padding
        class="rounded-borders text-primary"
      >
        <q-item>
          <q-item-section>Tanggal</q-item-section>
          <q-item-section>Kasir</q-item-section>
          <q-item-section>Nama Penerimaan</q-item-section>
          <q-item-section>
            <div class="text-right">
              Jumlah
            </div>
          </q-item-section>
          <q-item-section>Keterangan</q-item-section>
        </q-item>
        <q-separator />
        <div
          v-for="(item,i) in store.items"
          :key="i"
        >
          <q-item
            v-ripple
            class="menu"
          >
            <q-item-section>{{ item.tanggal }}</q-item-section>
            <q-item-section>{{ item.kasir!==null?item.kasir.name : 'owner' }}</q-item-section>
            <q-item-section>{{ item.penerimaan_transaction[0].penerimaan.nama }}</q-item-section>
            <q-item-section>
              <div class="text-right">
                {{ formatRp(item.total) }}
              </div>
            </q-item-section>
            <q-item-section>{{ item.penerimaan_transaction[0].keterangan }}</q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </div>
  </q-card>
</template>
<script setup>
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
import { formatRp } from 'src/modules/formatter'

const store = usePenerimaanTransaksiFormStore()
</script>
