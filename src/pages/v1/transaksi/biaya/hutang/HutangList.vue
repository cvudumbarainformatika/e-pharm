<template>
  <q-card class="full-width">
    <div>
      <div class="text-center text-weight-bold q-mb-md f-14">
        <div class="row">
          <div class="col-12">
            Bayar Hutang Bulan Ini
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            Total : {{ formatRp(store.totalBayar) }}
          </div>
        </div>
      </div>
      <div
        v-for="(item,i) in store.bayars"
        :key="i"
        class="q-mb-md"
      >
        <!-- <q-separator />
        <div class="text-right  q-mt-sm">
          <app-btn
            label="Bayar nota ini"
            @click="gantiNota(item)"
          />
        </div> -->
        <q-list
          bordered
          padding
          class="rounded-borders"
        >
          <q-item class="text-weight-bold">
            <q-item-section>Tanggal Bayar</q-item-section>
            <q-item-section>Nota</q-item-section>
            <q-item-section>Kasir</q-item-section>
            <q-item-section>Distributor</q-item-section>
            <q-item-section>Total</q-item-section>
            <!-- <q-item-section>Nama Pengeluaran</q-item-section> -->
            <!-- <q-item-section>
            <div class="text-right">
              Jumlah
            </div>
          </q-item-section> -->
            <!-- <q-item-section>Keterangan</q-item-section> -->
          </q-item>
          <q-separator />

          <q-item
            v-ripple
            class="menu"
          >
            <q-item-section>{{ dateFullFormat(item.tanggal_bayar) }}</q-item-section>
            <q-item-section>{{ item.reff }}</q-item-section>
            <q-item-section>{{ item.kasir!==null?item.kasir.name : 'owner' }}</q-item-section>
            <q-item-section>{{ item.supplier!==null?item.supplier.nama : '-' }}</q-item-section>
            <q-item-section>{{ formatRp(item.total) }}</q-item-section>
            <!-- <q-item-section>{{ item.beban_transaction[0].beban.nama }}</q-item-section> -->
            <!-- <q-item-section>
              <div class="text-right">
                {{ formatRp(item.total) }}
              </div>
            </q-item-section> -->
            <!-- <q-item-section>{{ item.beban_transaction[0].keterangan }}</q-item-section> -->
            <!-- <q-item-section></q-item-section> -->
          </q-item>

          <q-separator />
          <div class="f-14 q-ml-md  q-py-sm">
            Detail Pengeluaran :
          </div>
          <q-separator />
          <q-item class="text-weight-bold">
            <q-item-section>Nama Pengeluaran </q-item-section>
            <q-item-section>Jumlah Pengeluaran</q-item-section>
            <q-item-section>Keterangan</q-item-section>
          </q-item>
          <q-separator />
          <div
            v-for="(detail, a) in item.beban_transaction"
            :key="a"
          >
            <q-item
              v-ripple
              class="menu"
            >
              <q-item-section>{{ detail.beban?detail.beban.nama:'-' }}</q-item-section>
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
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useBebanTransaksiHutang } from 'src/stores/transaksi/biaya/hutang'

const store = useBebanTransaksiHutang()
// const gantiNota = val => {
//   store.setForm('reff', val.reff)
// }
</script>
