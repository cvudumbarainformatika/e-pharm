<template>
  <Suspense
    @fallback="loading"
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
  import('./FrontPage.vue')
)
const loading = () => {
  useSettingStore().transaksiLoading = true
}
</script>
