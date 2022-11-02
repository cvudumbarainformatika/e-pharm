<template>
  <div>
    <q-page class="q-ma-sm">
      <!-- <q-menu
        v-model="setting.submenuEvent"
        transition-show="slide-right"
        transition-hide="slide-left"
        :offset="[0,-600]"
      >
        <menuPage />
      </q-menu> -->
      <UserPage v-if="setting.menu==='user'" />
      <SettingMenuPage v-if="setting.menu==='menu'" />
      <SettingInfoPage v-if="setting.menu==='info'" />
      <SettingThemesPage v-if="setting.menu==='theme'" />
    </q-page>
  </div>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import { useSettingUserStore } from 'src/stores/setting/user/user'
// import menuPage from './menu/MenuPage.vue'
import UserPage from './user/UserPage.vue'
import SettingMenuPage from './setting/SettingMenuPage.vue'
import SettingInfoPage from './info/SettingInfoPage.vue'
import SettingThemesPage from './themes/SettingThemesPage.vue'
const setting = useSettingStore()
const user = useSettingUserStore()
user.getAllUser()
</script>
