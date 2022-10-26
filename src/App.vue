<template>
  <router-view v-slot="{ Component }">
    <transition name="scale">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
import { usePenjualanTable } from './stores/transaksi/penjualan/table'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    const penjualan = usePenjualanTable()
    penjualan.ambilDataDistributor()
    // console.log($q.dark.isActive)
    $q.dark.set(false)
    $q.iconSet.set(customIcons)
    document.body.setAttribute(['data-theme'], 'custom')
  }
})
</script>
