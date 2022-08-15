<template>
  <q-drawer
    show-if-above
    :width="170"
  >
    <!-- logo -->
    <div class="absolute-top">
      <div
        class=" flex flex-center"
        style="height: 60px;"
      >
        <q-btn
          round
          color="primary"
          icon="icon-mat-arrow_back"
          style="margin: 16px;"
          to="\dashboard"
        />
        <q-avatar
          size="40px"
          style="margin: 16px;"
        >
          <img src="~assets/logos/logo.png">
        </q-avatar>
      </div>
    </div>
    <!-- <q-scroll-area
        class="fit"
        style="height:calc(100%-50px) ;padding-top:50px"
      > -->
    <!-- <div
      class="flex column flex-center full-height"
      style="height:calc(100%-60px) "
    >
      <router-link
        v-for="(menu, i) in menus"
        :key="i"
        :to="`/${menu.name}`"
        replace
        class="sidebar flex flex-center"
        :active-class="activated(true)"
      >
        <q-tooltip
          class="bg-primary"
          anchor="center right"
          self="center left"
          :offset="[5, 5]"
        >
          <strong class="">{{ menu.name }}</strong>

          (<q-icon name="icon-mat-keyboard_arrow_right" />)
        </q-tooltip>
        <q-icon
          :name="menu.icon"
          size="25px"
        />
      </router-link>
    </div> -->
    <!-- </q-scroll-area> -->

    <div
      class="q-pa-sm flex column flex-center full-height"
      style="height:calc(100%-50px) ;padding-top:50px"
    >
      <q-list
        padding
        class="rounded-borders text-primary"
      >
        <!-- <div
        replace
      > -->
        <q-item
          v-for="(menu,i) in menus"
          :key="i"
          v-ripple
          class="menu"
          :active-class="activated(true)"
          :to="`${menu.link}`"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="menu.icon" />
          </q-item-section>

          <q-item-section>{{ menu.name }}</q-item-section>
        </q-item>
      <!-- </div> -->
      </q-list>
    </div>
    <div class="just-shadow absolute-full overflow-hidden no-pointer-events" />
  </q-drawer>
</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})

const menus = ref([
  { id: 1, name: 'Satuan', icon: 'icon-mat-gas_meter', link: 'satuan' },
  { id: 2, name: 'Produk', icon: 'icon-mat-workspaces', link: 'produk' },
  { id: 3, name: 'Rak', icon: 'icon-mat-table_rows', link: 'rak' },
  { id: 4, name: 'Kategori', icon: 'icon-mat-category', link: 'kategori' }
])

function activated(val) {
  console.log('val ', val, ' dark ', props.dark)
  if (val) {
    if (props.dark) {
      return 'page-dark text-white'
    } else {
      return 'bg-grey-4 text-primary'
    }
  }
  return 'text-grey-5'
}

// const router = useRouter()
console.log('router', props.dark)
</script>

<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height:60px;
}

a.sidebar {
  text-decoration: none;
  color:$grey-5;
}
a.router-link-active, a.router-link-exact-active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
  }

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
