<template>
  <div
    id="printMe"
    class="column f-12"
  >
    <div class="toko text-center text-weight-bold">
      {{ setting.info.nama }}
    </div>
    <div class="toko text-center">
      {{ setting.info.alamat }}
    </div>
    <div class="toko text-center">
      {{ setting.info.tlp }}
    </div>
    <div class="top-line" />
    <div class="flex items-center justify-between q-px-sm">
      <div>
        NOTA: {{ store.form.reff }}
      </div>
      <div>
        TANGGAL:{{ dateFormat(store.form.tanggal) }}
      </div>
    </div>
    <div
      v-if="store.form.faktur !== null"
      class="flex items-center justify-between q-px-xs"
    >
      <div>
        FAKTUR: {{ store.form.faktur }}
      </div>
      <div>
        TANGGALF: {{ dateFormat(store.form.tanggal_faktur) }}
      </div>
    </div>
    <div class="top-line" />
    <div
      v-for="(produk, i) in store.produks"
      :key="i"
      class="details q-px-xs"
    >
      <div class="namabarang">
        {{ produk.product.nama }}
      </div>
      <div class="flex items-center justify-between">
        <div>
          <div>{{ produk.qty }} x {{ formatRp(produk.harga) }}</div>
        </div>
        <div>
          <div>{{ formatRp(produk.harga * produk.qty) }}</div>
        </div>
      </div>
    </div>

    <div class="top-line" />
    <div class="text-right q-px-xs text-weight-bold">
      TOTAL : {{ store.totalSemua ? formatRp(store.totalSemua) : formatRp(store.form.total) }}
    </div>
    <div
      v-if="store.form.jenis == 'tunai'"
      class="text-right q-px-xs text-weight-bold"
    >
      BAYAR : {{ store.form.bayar? formatRp(olahUang(store.form.bayar)):0 }}
    </div>
    <div
      v-if="store.form.jenis == 'tunai'"
      class="text-right q-px-xs text-weight-bold"
    >
      KEMBALI : {{ store.form.kembali?formatRp(olahUang(store.form.kembali)):0 }}
    </div>
    <div
      v-if="store.form.kasir"
      class="text-right q-px-xs text-weight-bold"
    >
      KASIR : {{ Object.keys(store.form.kasir).length ? store.form.kasir.name : store.form.kasir }}
    </div>
    <div
      v-if="store.form.supplier"
      class="text-right q-px-xs text-weight-bold"
    >
      SUPPLIER : {{ Object.keys(store.form.supplier).length ? store.form.supplier.nama : store.form.supplier }}
    </div>
    <div
      v-if="store.form.distributor"
      class="text-right q-px-xs text-weight-bold"
    >
      DISTRIBUTOR : {{ Object.keys(store.form.supplier).length ? store.form.supplier.nama : store.form.supplier }}
    </div>
    <div
      v-if="store.form.dokter"
      class="text-right q-px-xs text-weight-bold"
    >
      DOKTER : {{ Object.keys(store.form.dokter).length ? store.form.dokter.nama : store.form.dokter }}
    </div>
    <div
      v-if="store.form.jenis === 'hutang' || store.form.jenis === 'piutang'"
      class="text-right q-px-xs text-weight-bold"
    >
      TEMPO : {{ dateFormat(store.form.tempo) }}
    </div>
    <div class="top-line" />
    <div class="text-center q-pb-xl">
      Terimakasih Sudah Membeli Obat-obatan di Apotik Kami
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { formatRp, olahUang, dateFormat } from 'src/modules/formatter'
import { usePrintStore } from 'src/stores/print'
import { useSettingStore } from 'src/stores/setting/setting'
// import { computed } from 'vue'
const router = useRouter()
const store = usePrintStore()
const setting = useSettingStore()
onMounted(() => {
  // console.log(btn.value.$.appContext.directives)
  // btn.value.$.appContext.directives.print = printObj
  // btn.value.click()
  setTimeout(() => {
    myPrinting()
  }, 1000)
})

function afterPrint () {
  const r = confirm('Press a button!')
  if (r === true) {
    window.close()
    router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  } else {
    window.close()
  }
}

function myPrinting () {
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 500)
}
// const printObj = {
//   id: 'printMe',
//   popTitle: 'Laporan Rekap',
//   // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
//   // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
//   beforeOpenCallback (vue) {
//     // printed.value = true
//     console.log('wait...')
//   },
//   openCallback (vue) {
//     console.log('opened')
//   },
//   closeCallback (vue) {
//     // printed.value = false
//     console.log('closePrint')
//   }
// }
</script>

<style lang="scss" scoped>

    /* change height as you like */
    @media print {
        body.sheet {
            width: 80mm
        }
    }
.top-line-tipis {
  border-top: 0.5px solid black;
}

.top-line {
  border-top: 2px solid black;
}

.bottom-line {
  border-bottom: 2px solid black;
}

</style>
