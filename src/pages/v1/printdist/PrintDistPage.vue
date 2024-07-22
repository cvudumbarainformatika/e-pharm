<template>
  <div v-if="loading">
    <app-loading />
  </div>
  <div v-else>
    <div
      id="printMe"
      class="f-10"
    >
      <div class="row text-weight-bold">
        Distribusi
      </div>
      <div
        v-if="items?.dari===kodecabang"
        class="row text-weight-bold"
      >
        Permintaan Distribusi dari {{ items?.asal?.namacabang }}
      </div>
      <div
        v-if="items?.tujuan===kodecabang"
        class="row text-weight-bold"
      >
        Kiriman Distribusi dari {{ items?.menuju?.namacabang }}
      </div>
      <div class="top-line-dash q-ma-xs" />
      <div class="top-line-dash q-mb-xs" />
      <div class="row">
        <div class="col-1" />
        <div class="col-11">
          <div class="row">
            <div class="col-6 text-right">
              Minta
            </div>
            <div class="col-6 text-right">
              Distribusi
            </div>
          </div>
        </div>
      </div>
      <div class="top-line-dash q-ma-xs" />
      <div class="top-line-dash q-mb-xs" />
      <div v-if="items?.details?.length">
        <div
          v-for="(item, i) in items?.details"
          :key="item"
          class="row"
        >
          <div class="col-1">
            {{ i+1 }}
          </div>
          <div class="col-11">
            <div class="row">
              {{ item?.produk?.nama }}
            </div>
            <div class="row">
              <div class="col-6 text-right">
                {{ item?.jumlah }}
              </div>
              <div class="col-6 text-right">
                {{ item?.qty }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-line-dash q-ma-xs" />
      <div class="top-line-dash q-mb-xs" />
      <div>
        <app-no-data v-if="!items?.details?.length" />
      </div>
      <div
        v-if="items?.dari===kodecabang"
        class="row text-weight-bold"
      >
        Tgl Permintaan {{ dateFullFormat(items?.tgl_permintaan) }}
      </div>
      <div
        v-if="items?.tujuan===kodecabang"
        class="row text-weight-bold"
      >
        Tgl Distribusi  {{ dateFullFormat(items?.tgl_distribusi) }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { dateFullFormat } from 'src/modules/formatter'
import { ref, onMounted } from 'vue'

const items = ref(null)
const kodecabang = ref(null)
const loading = ref(false)
async function getItems(val) {
  loading.value = true
  const param = {
    params: {
      id: val
    }
  }
  await api.get('v1/distribusi/get-dist-by-id', param)
    .then(resp => {
      loading.value = false
      // console.log('resp', resp?.data)
      items.value = resp?.data?.data
      kodecabang.value = resp?.data?.kodecabang
      setTimeout(() => {
        myPrinting()
      }, 500)
    })
    .catch(() => { loading.value = false })
}
onMounted(() => {
  // btn.value.$.appContext.directives.print = printObj
  // btn.value.click()
  const slug = routerInstance.currentRoute.value.params.slug
  // items.value = slug
  getItems(slug)
  console.log('slug', slug)
})

function afterPrint () {
  window.close()
}

// eslint-disable-next-line no-unused-vars
function myPrinting () {
  // console.log('print ', store.form)
  window.print()
  setTimeout(function () {
    afterPrint()
  }, 500)
}
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
