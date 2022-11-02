<template>
  <div>
    <q-page class="q-pa-sm">
      <!-- <q-menu
        v-model="setting.submenuMaster"
        transition-show="slide-right"
        transition-hide="slide-left"
        :offset="[0,-600]"
      >
        <MasterMenu />
      </q-menu> -->
      <q-page v-if="path !== '/master'">
        <router-view />
      </q-page>
      <div v-else>
        <q-card>
          <NoSelectedPage />
        </q-card>
      </div>
    </q-page>
  </div>
</template>
<script setup>
// import MasterMenu from './MasterMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NoSelectedPage from './NoSelectedPage.vue'
import { routerInstance } from 'src/boot/router'
// import { useSettingStore } from 'src/stores/setting/setting'
const route = useRoute()
const path = computed(() => route.path)
// let slug = routerInstance.currentRoute.value.params.slug
let name = routerInstance.currentRoute.value.name
if (name === 'master') {
  name = 'satuan'
}
routerInstance.replace({ name })
// const setting = useSettingStore()
// console.log('path', path.value)
// import MasterMenu from './MasterMenu.vue'
</script>
