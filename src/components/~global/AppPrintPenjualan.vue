<template>
  <q-card
    style="margin:0px;"
    flat
  >
    <q-card-section>
      <div class="text-center">
        {{ setting?.info?.nama }}
      </div>
      <div class="text-center">
        {{ setting.info.alamat }}
      </div>
      <div class="text-center">
        {{ setting.info.tlp }}
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
          <div class="col-4">
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
          {{ Object.keys(store.form.kasir).length ? store.form.kasir.name : store.form.kasir }}
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
          {{ Object.keys(store.form.supplier).length ? store.form.supplier.nama : store.form.supplier }}
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
          {{ Object.keys(store.form.distributor).length ? store.form.distributor.nama : store.form.distributor }}
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
          {{ Object.keys(store.form.dokter).length ? store.form.dokter.nama : store.form.dokter }}
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
import { formatRp, olahUang, dateFormat } from 'src/modules/formatter'
import { usePrintStore } from 'src/stores/print'
import { useSettingStore } from 'src/stores/setting/setting'
// import { computed } from 'vue'
const store = usePrintStore()
const setting = useSettingStore()
// const total = computed(() => { return store.harga * store.qty })
</script>
<style lang="scss" scoped>
.top-line-tipis {
  border-top: 0.5px solid;
}

.top-line {
  border-top: 2px solid;
}

.bottom-line {
  border-bottom: 2px solid;
}

/* change height as you like */
    @media print {
        body.sheet {
            width: 80mm
        }
    }
</style>
