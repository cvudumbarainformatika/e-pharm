<!-- @format -->

<template>
  <router-view v-slot="{ Component }">
    <transition
      enter-active-class="slide-left"
      leave-active-class="slide-right"
      :duration="300"
      appear
    >
      <component :is="Component" />
    </transition>
  </router-view>
  <!-- <transition :name="transitionName">
  </transition> -->
  <!-- <router-view /> -->
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
// import { routerInstance } from './boot/router'

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar()
    // console.log($q.dark.isActive)
    $q.dark.set(false)
    $q.iconSet.set(customIcons)
    document.body.setAttribute(['data-theme'], 'custom')
    // let transitionName = 'slide-left'
    // const route = routerInstance
    // console.log('App route ', route)
    // watch(() => route, (to, from) => {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   console.log('app : ', fromDepth, ' - ', toDepth)
    // })
    // return {
    //   transitionName
    // }
  }
})
</script>
