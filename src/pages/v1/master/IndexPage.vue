<template>
  <q-page class="q-pa-sm">
    <div class="row">
      <div class="col-2">
        <MasterMenu />
      </div>
      <div class="col-10">
        <q-page v-if="path !== '/master'">
          <router-view />
        </q-page>
        <div v-else>
          <q-card>
            <NoSelectedPage />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import MasterMenu from './MasterMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NoSelectedPage from './NoSelectedPage.vue'
import { routerInstance } from 'src/boot/router'
const route = useRoute()
const path = computed(() => route.path)
// let slug = routerInstance.currentRoute.value.params.slug
let name = routerInstance.currentRoute.value.name
if (name === 'master') {
  name = 'satuan'
}
routerInstance.replace({ name })
// console.log('path', path.value)
// import MasterMenu from './MasterMenu.vue'
</script>
