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
import AdmHeaderMenuProfile from './AdmHeaderMenuProfile.vue'
import { ref, watch } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { imageSever } from 'src/boot/axios'
const store = useAuthStore()
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

const image = ref(new URL('../../assets/images/actor.svg', import.meta.url).href)
watch(() => store.user, (apem) => {
  console.log('watch apem', apem)
  image.value = apem.image !== null ? (imageSever + apem.image) : new URL('../../assets/images/actor.svg', import.meta.url).href
})
</script>

<style lang="scss" scoped>
.flip__icon {
  transform: scaleX(-1);
}
</style>
