<template>
  <div>
    <div class="row items-center q-mb-sm">
      <div class="col-4">
        Nama Menu
      </div>
      <div class="col-8">
        <app-input
          v-model="namaMenu"
          outlined
          autofocus
          label="Input Nama Menu"
        />
      </div>
    </div>
    <div class="row items-center q-mb-sm">
      <div class="col-4">
        Icon Menu
      </div>
      <div class="col-8">
        <app-input
          v-model="iconMenu"
          outlined
          label="Input Icon Menu"
          hint="example : icon-mat-close"
        />
      </div>
    </div>
    <div class="row items-center q-mb-sm">
      <div class="col-4">
        Link Menu
      </div>
      <div class="col-8">
        <app-input
          v-model="linkMenu"
          outlined
          label="Input Link Menu"
        />
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <app-btn
          v-close-popup
          label="Batal"
          color="dark"
          :disable="loading"
          @click="emist('batal')"
        />
      </div>
      <div class="col  text-right">
        <app-btn
          v-close-popup
          label="Simpan"
          color="primary"
          :loading="loading"
          @click="emist('simpan')"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  nama: { type: String, default: '' },
  icon: { type: String, default: 'icon-mat-' },
  link: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})
const emist = defineEmits(['batal', 'simpan', 'updatenama', 'updateicon', 'updatelink'])
const namaMenu = computed({
  get() { return props.nama },
  set(val) { emist('updatenama', val) }
})
const iconMenu = computed({
  get() { return props.icon },
  set(val) { emist('updateicon', val) }
})
const linkMenu = computed({
  get() { return props.link },
  set(val) { emist('updatelink', val) }
})
</script>
