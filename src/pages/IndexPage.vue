<template>
  <q-page class="q-pa-lg">
    <q-card class="my-card">
      <q-card-section>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate provident neque eveniet id qui velit expedita consectetur voluptates, laborum vel, animi unde est voluptatum architecto optio assumenda consequatur aut. Facere!
      </q-card-section>
      <q-card-section>
        <q-input
          label="Coba"
          no-caps
          outlined
          dense
        />
        <q-btn
          label="Apem"
          no-caps
          color="primary"
          flat
        />
      </q-card-section>
      <q-card-section>
        <app-autocomplete-customlabel
          v-model="model"
          outlined
          :source="source"
          label="Coba autocomplete baru"
          optionvalue="id"
          :loading="loading"
          autocomplete=""
          @clear="hapusModel"
          @ada-input="adaInput"
          @on-select="selected"
        >
          <!-- :optionlabel="['apem']" -->
          <template #option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.nama }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </app-autocomplete-customlabel>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// import { defineComponent } from 'vue'

import { api } from 'src/boot/axios'
import { ref } from 'vue'

// export default defineComponent({
//   name: 'IndexPage'
// })
// const source = ref([
//   { id: 1, nama: 'lupis' },
//   { id: 2, nama: 'apem' }
// ])
const source = ref([])
const model = ref(null)
const loading = ref(false)

const hapusModel = val => {
  model.value = null
  console.log('clear', model.value)
}
// const labelOption = computed(() => {
//   return 'nama'
// })
const adaInput = val => {
  console.log('ada input', val)
  loading.value = true
  const params = {
    params: {
      product: val
    }
  }
  return new Promise((resolve, reject) => {
    api.get('v1/laporan/cari', params)
      .then(resp => {
        loading.value = false
        if (resp.status === 200) {
          console.log(resp.data)
          source.value = resp.data
          resolve(resp)
        }
      })
      .catch(err => {
        loading.value = false
        reject(err)
      })
  })
}
const selected = val => {
  console.log('selected', val)
  console.log('model', model.value)
}
</script>
