<template>
  <q-card class="full-width">
    <div>
      <div class="text-center text-weight-bold q-mb-md f-14">
        <div class="row">
          <div class="col-12">
            Daftar Tagihan
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            Total : {{ formatRp(store.totalTagihan) }}
          </div>
        </div>
      </div>
      <div
        v-for="(item,i) in store.notas"
        :key="i"
        class="q-mb-md"
      >
        <q-separator />
        <div class="text-right  q-mt-sm">
          <q-btn
            class="q-mr-md"
            color="primary"
            round
            flat
            icon="icon-mat-print"
            @click="emits('print',item)"
          />
          <app-btn
            label="Pakai nota ini"
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
            Detail Tagihan :
          </div>
          <q-separator />
          <q-item class="text-weight-bold">
            <!-- <q-item-section>Nama Pengeluaran </q-item-section> -->
            <q-item-section>Ditagihkan kepada </q-item-section>
            <q-item-section>Nota Jual </q-item-section>
            <q-item-section>Jumlah Pengeluaran</q-item-section>
            <q-item-section>Keterangan</q-item-section>
          </q-item>
          <q-separator />
          <div
            v-for="(detail, a) in item.details"
            :key="a"
          >
            <q-item
              v-ripple
              class="menu"
            >
              <q-item-section>{{ detail.dokter ? 'dr. '+ detail.dokter.nama : detail.customer ? detail.customer.nama :'-' }}</q-item-section>
              <q-item-section>{{ detail.nota }}</q-item-section>
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
import { useTagihanPiutang } from 'src/stores/transaksi/penerimaan/piutang'
const emits = defineEmits(['print'])
const store = useTagihanPiutang()
const gantiNota = val => {
  store.setForm('reff', val.reff)
}
</script>
