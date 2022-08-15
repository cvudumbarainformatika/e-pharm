<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col-2">
        <MasterMenu />
      </div>
      <div class="col-10">
        <q-page>
          <router-view />
        </q-page>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import MasterMenu from './MasterMenu.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('History', window.history.length)
})

// import MasterMenu from './MasterMenu.vue'
</script>
