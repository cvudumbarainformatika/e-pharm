<template>
  <q-card>
    <q-card-section style="padding:5px;">
      <div class="row items-center print-hide">
        <q-icon
          name="icon-mat-menu"
          flat
          :color="setting.dark? 'white':'primary'"
          size="25px"
          round
          class="cursor-pointer"
        >
          <TopMenuContent />
        </q-icon>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import TopMenuContent from './TopMenuContent.vue'

const setting = useSettingStore
</script>
