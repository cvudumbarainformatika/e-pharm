<template>
  <q-page class="q-ma-sm">
    <div class="row q-col-gutter-md">
      <div class="col-2">
        <menuPage />
      </div>
      <div class="col-10">
        <UserPage v-if="setting.menu==='user'" />
        <SettingMenuPage v-if="setting.menu==='menu'" />
        <SettingInfoPage v-if="setting.menu==='info'" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import { useSettingUserStore } from 'src/stores/setting/user/user'
import menuPage from './menu/MenuPage.vue'
import UserPage from './user/UserPage.vue'
import SettingMenuPage from './setting/SettingMenuPage.vue'
import SettingInfoPage from './info/SettingInfoPage.vue'
const setting = useSettingStore()
const user = useSettingUserStore()
user.getAllUser()
</script>
