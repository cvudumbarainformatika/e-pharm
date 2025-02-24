<template>
  <div
    id="printMe"
    class="column f-18"
  >
    <!-- {{ info }}
    {{ form }}
    {{ produks }} -->
    <div class="toko q-my-xs text-center text-weight-bold">
      {{ store.info.nama }}
    </div>
    <div class="toko q-my-xs text-center">
      {{ store.info.alamat }}
    </div>
    <div class="toko text-center q-my-xs">
      {{ store.info.tlp }}
    </div>
    <br>
    <br>
    <br>
    <div class="q-px-sm">
      NOTA: {{ store.form.nota? store.form.nota:'-' }}
    </div>
    <div class="q-px-sm">
      TANGGAL:{{ dateFormat(store.form.tanggal) }}
    </div>
    <div
      v-if="store.form.faktur !== null"
      class="q-px-xs"
    >
      FAKTUR: {{ store.form.faktur }}
    </div>
    <div
      v-if="store.form.faktur !== null"
    >
      TANGGAL: {{ dateFormat(store.form.tanggal_faktur) }}
    </div>
    <div class="top-line-dash" />
    <div
      v-for="(produk, i) in store.produks"
      :key="i"
      class="details q-px-xs"
    >
      <div class="namabarang">
        {{ produk?.product?.nama }}
      </div>
      <div class="flex items-center justify-between">
        <div>
          <div>{{ produk.qty }} x {{ formatRp(produk.harga) }}</div>
        </div>
        <div>
          <div>{{ formatRp(produk.harga * produk.qty + produk.nilai_r) }}</div>
        </div>
      </div>
    </div>

    <div class="top-line-dash" />
    <div class="text-right q-px-xs text-weight-bold">
      {{ store.totalSemua }}
      TOTAL : {{ store.totalSemua ? formatRp(store.totalSemua) : formatRp(olahUang(store.form.total)) }}
    </div>
    <div
      v-if="store.form.embalase"
      class="text-right q-px-xs print-hide"
    >
      Embalase : {{ typeof store.form.embalase==='string'? 'Rp. '+ store.form.embalase : formatRp(store.form.embalase) }}
    </div>
    <div
      v-if="store.form.jenis == 'tunai'"
      class="text-right q-px-xs"
    >
      Bayar : {{ store.form.bayar? formatRp(olahUang(store.form.bayar)):0 }}
    </div>
    <div
      v-if="store.form.jenis == 'tunai'"
      class="text-right q-px-xs"
    >
      Kembali : {{ store.form.kembali?formatRp(olahUang(store.form.kembali)):0 }}
    </div>
    <div class="top-line-dash" />
    <div
      v-if="store.form.kasir"
      class="text-left q-px-xs"
    >
      Kasir : {{ typeof store.form.kasir !== 'string' ? store.form.kasir.name : store.form.kasir }}
    </div>
    <div
      v-if="store.form.perusahaan"
      class="text-left q-px-xs"
    >
      Distributor : {{ typeof store.form.perusahaan !== 'string' ? store.form.perusahaan.nama : store.form.perusahaan }}
    </div>
    <div
      v-if="store.form.customer"
      class="text-left q-px-xs"
    >
      Customer : {{ typeof store.form.customer !== 'string' ? store.form.customer.nama : store.form.customer }}
    </div>
    <div
      v-if="store.form.dokter"
      class="text-left q-px-xs"
    >
      Dokter : {{ typeof store.form.dokter!=='string' ? store.form.dokter.nama : store.form.dokter }}
    </div>
    <div
      v-if="store.form.jenis === 'hutang' || store.form.jenis === 'piutang'"
      class="text-left q-px-xs"
    >
      Tempo : {{ dateFormat(store.form.tempo) }}
    </div>
    <div
      class="text-left q-px-xs"
    >
      Item : {{ store.produks.length }}
    </div>
    <div class="top-line-dash" />
    <br>
    <div class="text-center  q-pt-sm">
      Terima Kasih
    </div>
    <div class="text-center q-py-sm">
      Semoga Cepat Sembuh
    </div>
    <div class="text-center q-pb-xl text-italic">
      Maaf obat yang sudah dibeli tidak dapat ditukar / dikembalikan.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'

import { formatRp, olahUang, dateFormat } from 'src/modules/formatter'
import { usePrintStore } from 'src/stores/print'
import { routerInstance } from 'src/boot/router'
// import { useSettingStore } from 'src/stores/setting/setting'
// import { computed } from 'vue'
// const router = useRouter()
defineProps({
  info: { type: Object, default: () => {} },
  form: { type: Object, default: () => {} },
  produks: { type: Array, default: () => [] }
})
const store = usePrintStore()
// const setting = useSettingStore()
onMounted(() => {
  // btn.value.$.appContext.directives.print = printObj
  // btn.value.click()
  const slug = routerInstance.currentRoute.value.params.slug
  // console.log('slug', slug)
  store.getPrint(slug).then(() => {
    myPrinting()
  })
  // setTimeout(() => {
  // }, 500)
})

function afterPrint () {
  // const r = confirm('Press a button!')
  // if (r === true) {
  // router.push({ path: store.prevUrl ? store.prevUrl : '/history' })
  window.close()
  // } else {
  //   window.close()
  // }
}

function myPrinting () {
  // console.log('print ', store.form)
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
            width: 76mm
        }
    }
.top-line-tipis {
  border-top: 0.5px solid black;
}

.top-line-dash {
  border-top: 1.5px dashed black;
}
.top-line {
  border-top: 2px solid black;
}

.bottom-line {
  border-bottom: 2px solid black;
}

</style>
