<template>
  <Suspense>
    <!-- main content -->
    <AsyncComp />

    <!-- loading state -->
    <template #fallback>
      <q-inner-loading
        showing
        color="primary"
      >
        <div
          class="flex column flex-center bg-loading-bg__table"
          style="height:400px"
        >
          <div>
            <q-spinner-cube
              color="primary"
              size="40px"
            />
          </div>
          <div class="text-primary q-mt-sm">
            harap bersabar, menunggu...
          </div>
        </div>
      </q-inner-loading>
    </template>
  </Suspense>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./PenerimaanTable.vue')
)
</script>
