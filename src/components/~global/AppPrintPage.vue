<template>
  <q-card style="margin-left:2cm; width:128mm;">
    <q-card-section>
      <div class="text-center">
        {{ setting?.info?.nama }}
      </div>
      <div class="text-center">
        {{ setting?.info?.alamat }}
      </div>
      <div class="text-center">
        {{ setting?.info?.tlp }}
      </div>
      <div class="text-center">
        Nota : {{ store.form.reff }}
      </div>
      <div
        v-if="store.form.faktur!==null"
        class="text-center"
      >
        Faktur : {{ store.form.faktur }}
      </div>
      <div
        v-if="store.form.faktur!==null"
        class="text-center"
      >
        Tanggal Faktur : {{ dateFullFormat(store.form.tanggal_faktur) }}
      </div>
      <div class="row top-line">
        <div class="col-4">
          <strong>Nama</strong>
        </div>
        <div class="col-2">
          <strong>Jumlah</strong>
        </div>
        <div class="col-3 text-right">
          <strong>Harga</strong>
        </div>
        <div class="col-3 text-right">
          <strong>Sub Total</strong>
        </div>
      </div>
      <div
        v-for="(produk, i) in store.produks"
        :key="i"
        class="text-center"
      >
        <div class="row items-center">
          <div class="col-4 text-left">
            {{ produk?.product?.nama }}
          </div>
          <div class="col-2">
            {{ produk.qty }}
          </div>
          <div class="col-3 text-right">
            {{ formatRp(produk.harga) }}
          </div>
          <div class="col-3 text-right">
            {{ formatRp(produk.harga * produk.qty) }}
          </div>
        </div>
      </div>
      <div class="bottom-line top-line-tipis">
        <div
          v-if="store.form.nama==='PEMBELIAN'"
          class="row"
        >
          <div class="col-6 text-right">
            <strong>Diskon</strong>
          </div>
          <div class="col-6 text-right">
            {{ store.form.potongan }} %
          </div>
        </div>
        <div
          v-if="store.form.nama==='PEMBELIAN'"
          class="row"
        >
          <div class="col-6 text-right">
            <strong>PPN</strong>
          </div>
          <div class="col-6 text-right">
            {{ store.form.ongkir }} %
          </div>
        </div>
        <div class="row">
          <div class="col-6 text-right">
            <strong>Total</strong>
          </div>
          <div class="col-6 text-right">
            {{ store.totalSemua ? formatRp(store.totalSemua) : formatRp(store.form.total) }}
          </div>
        </div>
        <div
          v-if="store.form.jenis == 'tunai'"
          class="row"
        >
          <div class="col-6 text-right">
            <strong>Bayar</strong>
          </div>
          <div class="col-6 text-right">
            {{ formatRp(olahUang(store.form.bayar)) }}
          </div>
        </div>
        <div
          v-if="store.form.jenis == 'tunai'"
          class="row"
        >
          <div class="col-6 text-right">
            <strong>Kembalian</strong>
          </div>
          <div class="col-6 text-right">
            {{ formatRp(olahUang(store.form.kembali)) }}
          </div>
        </div>
      </div>
      <div
        v-if="store.form.kasir"
        class="row"
      >
        <div class="col-6">
          <strong>Kasir</strong>
        </div>
        <div class="col-6 text-right">
          {{ typeof (store.form.kasir)==='string' ? store.form.kasir: store.form.kasir.name }}
        </div>
      </div>
      <div
        v-if="store.form.supplier"
        class="row"
      >
        <div class="col-6">
          <strong>Supplier</strong>
        </div>
        <div class="col-6 text-right">
          {{ typeof(store.form.supplier)==='string'? store.form.supplier:store.form.supplier.nama }}
        </div>
      </div>
      <div
        v-if="store.form.distributor"
        class="row"
      >
        <div class="col-6">
          <strong>Distributor</strong>
        </div>
        <div class="col-6 text-right">
          {{ typeof(store.form.distributor)==='string' ? store.form.distributor:store.form.distributor.nama }}
        </div>
      </div>
      <div
        v-if="store.form.dokter"
        class="row"
      >
        <div class="col-6">
          <strong>Dokter</strong>
        </div>
        <div class="col-6 text-right">
          {{ typeof(store.form.dokter)==='string' ? store.form.dokter:store.form.dokter.nama }}
        </div>
      </div>
      <div
        v-if="store.form.jenis==='hutang' || store.form.jenis==='piutang'"
        class="row"
      >
        <div class="col-6 ">
          <strong>Tempo</strong>
        </div>
        <div class="col-6 text-right">
          {{ dateFormat(store.form.tempo) }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { formatRp, olahUang, dateFormat, dateFullFormat } from 'src/modules/formatter'
import { usePrintStore } from 'src/stores/print'
import { useSettingStore } from 'src/stores/setting/setting'
// import { computed } from 'vue'
const store = usePrintStore()
const setting = useSettingStore()
// const total = computed(() => { return store.harga * store.qty })
</script>
<style lang="scss" scoped>
.top-line-tipis{
  border-top: 0.5px solid;
}
.top-line{
  border-top: 2px solid;
}
.bottom-line{
  border-bottom: 2px solid;
}
</style>
