<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col-2">
        <TransaksiMenu />
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
import TransaksiMenu from './TransaksiMenu.vue'
</script>
