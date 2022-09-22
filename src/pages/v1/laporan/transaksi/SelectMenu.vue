<template>
  <q-select
    v-model="model"
    dense
    outlined
    use-input
    option-value="id"
    option-label="nama"
    :label="'Cari ' + props.title"
    :options="options"
    behavior="menu"
    hide-dropdown-icon
    @filter="filterOptions"
    @update:model-value="selected"
    @clear="bersihkan"
  >
    <template
      v-if="model"
      #append
    >
      <q-icon
        name="icon-mat-close"
        class="cursor-pointer"
        @click.stop.prevent="model = null"
      />
    </template>
    <template #prepend>
      <q-icon name="icon-mat-search" />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.nama }}</q-item-label>
          <!-- <q-item-label v-if="scope.opt.faktur!==null" caption>
            <strong>faktur : </strong> {{ scope.opt.faktur }}
          </q-item-label>
          <q-item-label caption>
            {{ scope.opt.jenis.toUpperCase() }}
          </q-item-label> -->
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'
const emits = defineEmits(['on-select', 'clear'])
const props = defineProps({
  title: { type: String, default: 'apa ?' },
  url: { type: String, default: 'tidak ada' }
})
const options = ref(null)
const model = ref(null)

const selected = val => {
  emits('on-select', val)
  console.log('on-select', val)
}
const bersihkan = val => {
  emits('clear', val)
}
async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }

  const params = {
    params: {
      q: val,
      order_by: 'created_at',
      sort: 'desc',
      per_page: 20
    }
  }

  const resp = await api.get(props.url, params)
  console.log('supplier ', resp.data.data)
  update(
    () => (options.value = resp.data.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
</script>
