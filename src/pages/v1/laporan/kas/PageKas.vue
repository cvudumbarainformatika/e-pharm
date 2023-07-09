<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-bold">
        Laporan Kas {{ setting.info.nama }}
      </div>
      <div class="title-desc">
        Periode : {{ store.periode }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row text-weight-bold">
        <div class="col-1">
          A.
        </div>
        <div class="col-7">
          PENJUALAN
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          - Penjualan (tunai)
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.penjualan) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          - Retur Penjualan
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.returPenjualan) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Penjualan Bersih
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penjualanBersih) }}
        </div>
      </div>

      <div class="  row text-weight-bold">
        <div class="col-1">
          B.
        </div>
        <div class="col-7">
          PEMBELIAN
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          - Pembelian
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.pembelian) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          - Total Diskon dan PPN
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.diskon) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          - Total Pembelian dengan Diskon dan PPN
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.totalSmw) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="  row">
        <div class="col-1" />
        <div class="col-7">
          - Retur Pembelian
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.returPembelian) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pembelian Bersih (total pembelian dg diskon dan ppn - retur pembelian)
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.pembelianBersih) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="  row text-weight-bold">
        <div class="col-1">
          C.
        </div>
        <div class="col-7">
          HARGA POKOK PENJUALAN (HPP)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="  row">
        <div class="col-1" />
        <div class="col-7">
          - Persediaan Awal
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.persediaanAwal) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="  row">
        <div class="col-1" />
        <div class="col-7">
          - Pesediaan Akhir
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.persediaanAkhir) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          HPP (Pembelian bersih + Persediaan awal - Persediaan akhir)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.HPP) }}
        </div>
      </div>
      <div class="  row text-weight-bold">
        <div class="col-1">
          D.
        </div>
        <div class="col-7">
          PENGELUARAN
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div
        v-for="(beban, i) in store.bebans"
        :key="i"
      >
        <div
          v-if="!isHas(beban.nama,'HUTANG').length"
          class="row"
        >
          <div class="col-1" />
          <div class="col-7">
            {{ beban.nama }}
          </div>
          <div class="col-2 text-right">
            {{ formatRp(beban.nominal) }}
          </div>
          <div class="col-2 text-right" />
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pengeluaran (tunai)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.bebanNoHut) }}
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pengeluaran
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.beban) }}
        </div>
      </div>
      <div class="row text-weight-bold">
        <div class="col-1">
          E.
        </div>
        <div class="col-7">
          PENDAPATAN
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div
        v-for="(terima, i) in store.penerimaans"
        :key="i"
      >
        <div
          v-if="!isHas(terima.nama,'PIUTANG').length"
          class="row"
        >
          <div class="col-1" />
          <div class="col-7">
            {{ terima.nama }}
          </div>
          <div class="col-2 text-right">
            {{ formatRp(terima.nominal) }}
          </div>
          <div class="col-2 text-right" />
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pendapatan (tunai)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penerimaanNoPiu) }}
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pendapatan
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penerimaan) }}
        </div>
      </div>
      <div
        v-if="store.labaKas !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7">
          <span class="text-weight-bold">Laba (Tunai) </span> [Penjualan bersih - HPP - Beban (tunai) + Penerimaan (tunai)]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right text-weight-bold">
          {{ formatRp(store.labaKas) }}
        </div>
      </div>
      <div
        v-if="store.laba !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7">
          <span class="text-weight-bold">Laba (dengan utang / piutang) </span> [Penjualan bersih - HPP - Beban + Penerimaan ]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right text-weight-bold">
          {{ formatRp(store.laba) }}
        </div>
      </div>
      <div
        v-else-if="store.rugiKas !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7 ">
          <span class="text-weight-bold">Rugi (Tunai)</span> [Penjualan bersih - HPP - Beban (tunai) + Penerimaan (tunai)]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-negative text-right text-weight-bold">
          ({{ formatRp(store.rugiKas) }})
        </div>
      </div>
      <div
        v-else-if="store.rugi !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7">
          <span class="text-weight-bold">Rugi (dengan utang / piutang)</span> [Penjualan bersih - HPP - Beban + Penerimaan ]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-negative text-right text-weight-bold">
          ({{ formatRp(store.rugiKas) }})
        </div>
      </div>
      <div
        v-else
        class="row"
      >
        <div class="col-1" />
        <div class="col-7 text-weight-bold">
          Laba \ Rugi
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right text-weight-bold">
          Rp. 0
        </div>
      </div>>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useLaporanKeuanganStore } from 'src/stores/laporan/keuangan/keuangan'
import { useSettingStore } from 'src/stores/setting/setting'
import { formatRp, isHas } from 'src/modules/formatter'

const setting = useSettingStore()
const store = useLaporanKeuanganStore()
</script>
<style lang="scss" scoped>

.row{
  border-bottom: 0.5px solid $grey-6;
  margin-top: 10px;
  padding-bottom:5px;
}
</style>
