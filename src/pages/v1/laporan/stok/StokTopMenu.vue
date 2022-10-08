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
          <StockMenuCotent />
        </q-icon>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { useSettingStore } from 'src/stores/setting/setting'
import StockMenuCotent from './menucontent/StockMenuCotent.vue'

const setting = useSettingStore()
</script>
