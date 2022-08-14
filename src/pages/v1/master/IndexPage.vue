<template>
  <q-page class="q-pa-lg flex flex-center">
    <div
      v-for="(link, i) in links"
      :key="i"
    >
      <q-card class="my-card">
        <q-card-section>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate provident neque eveniet id qui velit expedita consectetur voluptates, laborum vel, animi unde est voluptatum architecto optio assumenda consequatur aut. Facere!
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
const links = ref([
  { id: 1, name: 'dashboard', icon: 'icon-mat-dashboard' },
  { id: 2, name: 'master', icon: 'icon-mat-dataset' },
  { id: 3, name: 'transaksi', icon: 'icon-mat-sync_alt' },
  { id: 4, name: 'laporan', icon: 'icon-mat-donut_large' },
  { id: 5, name: 'setting', icon: 'icon-mat-settings' }
])
</script>

<style lang="scss">
.my-card {
  width: 150px;
  height: 200px;
  margin: 10px;
}
</style>
