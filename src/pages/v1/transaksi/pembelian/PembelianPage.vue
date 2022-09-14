<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <TablePage />
    </div>
  </q-page>
</template>
<script setup>
// import { onMounted } from 'vue'
import TablePage from './TablePage.vue'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { routerInstance } from 'src/boot/router'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
import { onBeforeMount } from 'vue'
import { uniqueId } from 'src/modules/utils'

const table = usePembelianTable()
const store = usePembelianDialog()

onBeforeMount(() => {
  const slug = 'PBL-' + uniqueId()
  const oldSlug = routerInstance.currentRoute.value.params.slug

  // console.log('slug depan', slug)
  table.getDetailTransaksi().then(data => {
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
})

// const uId = ref('')
table.ambilDataProduk()
// onMounted(() => {
// })
</script>
