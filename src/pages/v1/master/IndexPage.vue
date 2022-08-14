<template>
  <MasterMenu />
  <q-page-container>
    <router-view />
  </q-page-container>
  <q-page class="q-pa-lg " />
</template>
<script setup>
import MasterMenu from './MasterMenu.vue'
</script>
