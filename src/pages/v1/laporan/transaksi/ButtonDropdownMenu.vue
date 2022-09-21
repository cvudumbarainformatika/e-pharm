<template>
  <app-btn-dropdown
    flat
    no-caps
    :color="setting.dark?'white':'primary'"
    :label="props.label"
  >
    <template #content>
      <div
        v-for="(item, i) in props.items"
        :key="i"
      >
        <q-item
          v-close-popup
          clickable
          :active="props.aktif === item.nama"
          active-class="text-white bg-primary"
          @click="diKlik(item)"
        >
          <q-item-section>
            <q-item-label>
              <strong>{{ item.label }}</strong>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </template>
  </app-btn-dropdown>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'

const emits = defineEmits(['clicked'])
const props = defineProps({
  label: { type: String, default: 'label' },
  items: { type: Array, default: () => [] },
  aktif: { type: String, default: '' }
})
const setting = useSettingStore()
const diKlik = val => {
  emits('clicked', val)
}
</script>
