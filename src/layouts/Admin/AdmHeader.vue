<template>
  <q-header
    :bordered="!mobile"
    reveal
    :class="dark?'bg-dark':'bg-white text-dark'"
  >
    <div
      class="q-px-sm q-py-sm flex items-center justify-between"
      style="height:60px"
    >
      <!-- LEFT -->
      <div>
        <q-btn
          v-if="!mobile"
          flat
          round
          icon="icon-mat-segment"
          class="flip__icon"
          @click="emit('toggleLeft')"
        />
        <div v-else>
          <q-avatar size="40px">
            <img src="~assets/logos/logo.png">
          </q-avatar>
        </div>
        <div>
          <!-- <q-menu
            v-model="setting.sMenu"
            style="margin-top:40px;"
            transition-show="slide-right"
            transition-hide="slide-left"
          >
            <HistoryMenuPage v-if="history.tableMenu" />
            <MasterMenu v-if="setting.submenuMaster" />
            <SettingMenuPage v-if="setting.submenuEvent" />
            <TransaksiMenu v-if="setting.submenuTransaksi" />
          </q-menu> -->
        </div>
        <!-- <q-menu
          v-model=""
          transition-show="slide-right"
          transition-hide="slide-left"
          :offset="[0,0]"
        >
        </q-menu> -->
      </div>
      <!-- RIGHT -->
      <div :class="!mobile?'q-pr-md':'q-pr-sm'">
        <!-- <q-btn
          flat
          round
          icon="icon-eva-bell-outline"
        /> -->
        <q-avatar
          size="40px"
          class="q-ml-sm cursor-pointer bg-grey"
        >
          <img :src="image">
          <adm-header-menu-profile />
        </q-avatar>
      </div>
    </div>
  </q-header>
</template>

<script setup>
// import HistoryMenuPage from 'src/pages/v1/history/MenuPage.vue'
// import MasterMenu from 'src/pages/v1/master/MasterMenu.vue'
// import SettingMenuPage from 'src/pages/v1/setting/menu/MenuPage.vue'
// import TransaksiMenu from 'src/pages/v1/transaksi/TransaksiMenu.vue'
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { imageSever } from 'src/boot/axios'
// import { useHistoryTable } from 'src/stores/history/table'
// import { useSettingStore } from 'src/stores/setting/setting'
const store = useAuthStore()
// const history = useHistoryTable()
// const setting = useSettingStore()
const emit = defineEmits(['toggleLeft'])
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  mobile: {
    type: Boolean,
    default: false
  }
})

const image = computed(() => {
  let imgUrl = new URL('../../assets/images/actor.svg', import.meta.url).href
  if (store.user) {
    if (store.user.image) {
      imgUrl = imageSever + store.user.image
    } else {
      imgUrl = new URL('../../assets/images/actor.svg', import.meta.url).href
    }
  }
  return imgUrl
})
// watch(() => store.user, (apem) => {
//   console.log('watch apem', apem)
//   image.value = apem.image !== null ? (imageSever + apem.image) : new URL('../../assets/images/actor.svg', import.meta.url).href
// })
</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}
</style>
