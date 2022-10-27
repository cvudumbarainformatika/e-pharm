<template>
  <q-page class="q-ma-sm">
    <div class="q-mr-lg">
      <q-btn
        v-if="parseFloat(currentUser.level)>4"
        to="/penjualan/pjl-"
        flat
        round
        color="primary"
        size="lg"
        icon="icon-mat-arrow_back"
      />
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <q-img
          src="~assets/images/actor.svg"
        />
        <q-file
          ref="fileRef"
          v-model="tempImg"
          filled
          dense
          label="Pilih Gambar"
          accept="image/*"
          class="q-mb-md"
        />
      </div>
      <div class="col-8">
        <tabMenu />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { ref } from 'vue'
import tabMenu from './TabMenu.vue'

const auth = useAuthStore()
const currentUser = auth.state().user

const tempImg = ref(null)
</script>
