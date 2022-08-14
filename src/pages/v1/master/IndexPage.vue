<template>
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
</template>
<script setup>
import MasterMenu from './MasterMenu.vue'
</script>
