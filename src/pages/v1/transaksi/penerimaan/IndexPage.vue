<template>
  <Suspense
    @fallback="loading"
    @resolve="resolve"
  >
    <!-- main content -->
    <AsyncComp />

    <!-- loading state -->
    <template #fallback>
      <app-loading />
    </template>
  </Suspense>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./PenerimaanPage.vue')
)

const loading = () => {
  useSettingStore().transaksiLoading = true
}
const resolve = () => {
  useSettingStore().transaksiLoading = false
}
</script>
