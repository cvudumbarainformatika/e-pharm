<template>
  <q-dialog
    persistent
    :position="props.position"
    transition-show="jump-right"
    transition-hide="jump-left"
  >
    <q-card style="margin-left:80px;">
      <q-bar>
        <q-btn
          v-close-popup
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="row items-center no-wrap">
        <div
          class="flex column flex-center full-height"
          style="height:calc(100%-60px) "
        >
          <router-link
            v-for="(menu, i) in menus"
            :key="i"
            :to="`/${menu.link}`"
            replace
            class="sidebar flex items-center justify-start"
            style="min-width:150px;"
            exact
            @click="closePopup"
          >
            <q-tooltip
              class="bg-primary"
              anchor="center right"
              self="center left"
              :offset="[5, 5]"
            >
              <strong class="">{{ menu.name }}</strong>
              (
              <q-icon name="icon-mat-keyboard_arrow_right" />)
            </q-tooltip>
            <strong class="q-mr-sm">{{ menu.name }}</strong>
            <q-icon
              :name="menu.icon"
              size="25px"
            />
          </router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
// import { computed } from 'vue'
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  position: { type: String, default: 'center' },
  menus: { type: Array, default: () => { return [] } }
})
const emits = defineEmits(['tutup'])
// const toOpen = computed({
//   get () { return props.isOpen }, set (val) { emits('tutup', val) }
// })
const closePopup = () => {
  emits('tutup')
}
</script>
<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height: 60px;
}

a.sidebar {
  text-decoration: none;
  color: $grey-5;
}

a.router-link-active,
a.router-link-exact-active {
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
