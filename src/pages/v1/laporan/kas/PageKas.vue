<template>
  <div class="row justify-end q-mr-md">
    <q-btn
      v-print="printObj"
      color="dark"
      icon="icon-mat-print"
      round
      dense
    >
      <q-tooltip>Print</q-tooltip>
    </q-btn>
  </div>
  <q-card
    id="printMe"
    flat
    class="f-12"
  >
    <q-card-section>
      <div class="text-h6 text-weight-bold">
        Laporan Kas {{ setting?.info?.nama }}
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
          - Penjualan
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
      <!--
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
        <div class="col-5">
          - Pembelian
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.pembelian) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Total Diskon dan PPN
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.diskon) }}
        </div>
        <div class="col-2 text-right" />
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
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.pembelianBersih) }}
        </div>
      </div>
      -->
      <!--
      <div class="  row text-weight-bold">
        <div class="col-1">
          C.
        </div>
        <div class="col-7">
          PERSEDIAAN AKHIR
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-4">
          - Persedian Awal
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.persediaanAwal) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Pembelian Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.masukBefore) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Retur Penjualan Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.returPenjualanBefore) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Distribusi Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.distribusiMasukBefore) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-4">
          Stok Masuk Sebelum periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.masukSB) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Penjualan Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.keluarBefore) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Retur Pembelian Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.returPembelianBefore) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Distribusi Sebelum Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.distribusiKeluarBefore) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-6">
          Stok Keluar Sebelum periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.keluarSB) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          Stok Awal (Persediaan Awal + Stok Masuk - Stok Keluar)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store?.stokAwal) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Pembelian Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.masukPeriod) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Retur Penjualan Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.returPenjualanPeriod) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-3">
          - Distribusi Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.distribusiMasukPeriod) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-4">
          Stok Masuk Selama periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.masukP) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Penjualan Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.keluarPeriod) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Retur Pembelian Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.returPembelianPeriod) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Distribusi Selama Periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.distribusiMasukPeriod) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-6">
          Stok Keluar Selama periode
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store?.keluarP) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          Stok Berjalan (Stok Masuk - Stok Keluar)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store?.stokBerjalan) }}
        </div>
        <div class="col-2 text-right" />
      </div>

      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          Persediaan Akhir (Stok Awal + Stok Berjalan)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store?.persediaanAkhir) }}
        </div>
      </div>
    -->
      <div class="  row text-weight-bold">
        <div class="col-1">
          B.
        </div>
        <div class="col-7">
          HARGA POKOK PENJUALAN (HPP)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <!-- <div class="row">
        <div class="col-1" />
        <div class="col-5">
          - Pembelian Periode Ini
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.pembelianBersih) }}
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.pembelianBersih) }}
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
      </div> -->
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          HPP ( Jumlah Barang Terjual * harga Beli )
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.HPP) }}
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Laba Kotor (Penjualan - HPP)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penjualanBersih - store.HPP) }}
        </div>
      </div>
      <div class="  row text-weight-bold">
        <div class="col-1">
          C.
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
            {{ formatRp(beban.total) }}
          </div>
          <div class="col-2 text-right" />
        </div>
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Total Pengeluaran
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.beban) }}
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pengeluaran (tunai)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.bebanNoHut) }}
        </div>
      </div> -->
      <!-- <div class="row">
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
          D.
        </div>
        <div class="col-7">
          LABA / RUGI
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          Penjualan
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.penjualanBersih) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-5">
          HPP ( Jumlah Barang Terjual * harga Beli )
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.HPP) }}
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Laba Kotor
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.penjualanBersih - store.HPP) }}
        </div>
        <div class="col-2 text-right" />
      </div>
      <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pengeluaran
        </div>
        <div class="col-2 text-right">
          {{ formatRp(store.beban) }}
        </div>
        <div class="col-2 text-right" />
      </div> -->
      <!-- <div
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
      </div> -->
      <!-- <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pendapatan (tunai)
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penerimaanNoPiu) }}
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="col-1" />
        <div class="col-7">
          Pendapatan
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right">
          {{ formatRp(store.penerimaan) }}
        </div>
      </div> -->
      <!-- <div
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
      </div> -->
      <div
        v-if="store.laba !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7">
          <span class="text-weight-bold">Laba Bersih</span> [Laba Kotor - Pengeluaran ]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-right text-weight-bold">
          {{ formatRp(store.laba) }}
        </div>
      </div>
      <!-- <div
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
      </div> -->
      <div
        v-else-if="store.rugi !== 0"
        class="row"
      >
        <div class="col-1" />
        <div class="col-7">
          <span class="text-weight-bold">Rugi</span> [Laba Kotor - Beban ]
        </div>
        <div class="col-2 text-right" />
        <div class="col-2 text-negative text-right text-weight-bold">
          ({{ formatRp(store.rugi) }})
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

const printObj = {
  id: 'printMe'
  // popTitle: title,
}
</script>
<style lang="scss" scoped>

.row{
  border-bottom: 0.5px solid $grey-6;
  margin-top: 10px;
  padding-bottom:5px;
}
</style>
