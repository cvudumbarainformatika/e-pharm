<template>
  <div>
    <div class="row justify-center items-center q-col-gutter-md">
      <div
        v-for="(list, i) in lists"
        :key="i"
        class="col-12 col-md-3 col-xs-12"
      >
        <!-- :class="`bg-${list.name}`" -->
        <q-card
          flat
          :class="list.name==='white' ? '' : ' text-white ' +' cursor-pointer'"
          :style="`background-color:${list.value};`"
        >
          <q-card-section class="text-center">
            {{ list.name }}
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              {{ list.name }}
            </q-tooltip>
            <q-menu>
              <q-color
                :model-value="list.value"
                @change="val => changeColor(i, val)"
              />
              <!-- <q-input
                v-model="list.value"
                readonly
                dense
              /> -->
            </q-menu>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { setCssVar } from 'quasar'
import { useSettingStore } from 'src/stores/setting/setting'
const store = useSettingStore()
const lists = computed(() => store.themes)
function changeColor (i, val) {
  store.setTheme(i, val)
  setCssVar(lists.value[i].name, lists.value[i].value)
}
</script>
