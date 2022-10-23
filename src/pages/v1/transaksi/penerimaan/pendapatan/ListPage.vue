<template>
  <q-card class="full-width">
    <div>
      <div class="text-center text-weight-bold q-mb-md f-14">
        Pendapatan Bulan Ini
      </div>
      <div
        v-for="(item,i) in store.items"
        :key="i"
        class="q-mb-md"
      >
        <q-separator />
        <div class="text-right  q-mt-sm">
          <app-btn
            label="Bayar nota ini"
            @click="gantiNota(item)"
          />
        </div>
        <q-list
          bordered
          padding
          class="rounded-borders"
        >
          <q-item class="text-weight-bold">
            <q-item-section>Tanggal</q-item-section>
            <q-item-section>Nota</q-item-section>
            <q-item-section>Kasir</q-item-section>
            <q-item-section>Total</q-item-section>
          </q-item>
          <q-separator />

          <q-item
            v-ripple
            class="menu"
          >
            <q-item-section>{{ dateFullFormat(item.tanggal) }}</q-item-section>
            <q-item-section>{{ item.reff }}</q-item-section>
            <q-item-section>{{ item.kasir!==null?item.kasir.name : 'owner' }}</q-item-section>
            <q-item-section>{{ formatRp(item.total) }}</q-item-section>
          </q-item>

          <q-separator />
          <div class="f-14 q-ml-md  q-py-sm">
            Detail Pendapatan :
          </div>
          <q-separator />
          <q-item class="text-weight-bold">
            <q-item-section>Nama Pendapatan </q-item-section>
            <q-item-section>Jumlah Pendapatan</q-item-section>
            <q-item-section>Keterangan</q-item-section>
          </q-item>
          <q-separator />
          <div
            v-for="(detail, a) in item.penerimaan_transaction"
            :key="a"
          >
            <q-item
              v-ripple
              class="menu"
            >
              <q-item-section>{{ detail.penerimaan?detail.penerimaan.nama:'-' }}</q-item-section>
              <q-item-section>{{ formatRp(detail.sub_total) }}</q-item-section>
              <q-item-section>{{ detail.keterangan }}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
import { formatRp, dateFullFormat } from 'src/modules/formatter'

const store = usePenerimaanTransaksiFormStore()
const gantiNota = val => {
  store.setForm('reff', val.reff)
}
</script>
