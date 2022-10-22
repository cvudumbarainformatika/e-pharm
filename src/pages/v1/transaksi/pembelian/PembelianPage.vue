<template>
  <Suspense>
    <q-page class="q-pa-sm">
      <div class="row">
        <TablePage />
      </div>
    </q-page>
    <template #fallback>
      loading ....
    </template>
  </Suspense>
</template>
<script setup>
// import { onMounted } from 'vue'
import TablePage from './TablePage.vue'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { routerInstance } from 'src/boot/router'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
import { uniqueId } from 'src/modules/utils'
import { useSettingStore } from 'src/stores/setting/setting'

const table = usePembelianTable()
const store = usePembelianDialog()
const setting = useSettingStore()

const slug = 'PBL-' + uniqueId()
const oldSlug = routerInstance.currentRoute.value.params.slug

// console.log('slug depan', slug)
setting.transaksiLoading = true
table.getDetailTransaksi().then(data => {
  setting.transaksiLoading = false
  if (data !== undefined) {
    routerInstance.replace({ name: 'pembelian', params: { slug: oldSlug } })
    table.form.reff = oldSlug
    store.form.reff = oldSlug
  } else {
    routerInstance.replace({ name: 'pembelian', params: { slug } })
    table.resetData()
    store.resetData()
    table.form.reff = slug
    store.form.reff = slug
  }
})

// const uId = ref('')
// table.ambilDataProduk()
// onMounted(() => {
// })
</script>
