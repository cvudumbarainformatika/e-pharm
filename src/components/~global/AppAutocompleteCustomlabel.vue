<template>
  <q-select
    ref="refAuto"
    dense
    :options="optionx"
    :label="label"
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    hide-bottom-space
    hide-dropdown-icon
    no-error-icon
    use-input
    :option-label="optionlabel"
    :disable="disable"
    :loading="loading"
    :model-value="modelProp"
    lazy-rules
    :rules="[anotherValid]"
    behavior="menu"
    map-options
    emit-value
    @update:model-value="selected"
    @filter="filterFn"
    @new-value="createValue"
    @input-value="inputValue"
    @clear="clear"
  >
    <template
      v-if="modelProp"
      #append
    >
      <q-icon
        name="icon-mat-cancel"
        class="cursor-pointer"
        @click.stop.prevent="clear"
      />
    </template>
    <template #option="scope">
      <slot
        name="option"
        :scope="scope"
      />
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.nama }}</q-item-label>
          <q-item-label>
            Stok : {{ scope.opt.stokSekarang }}
            <!-- <q-chip
              outline
              size="sm"
              color="negative"
            >
              {{ scope.opt.transaksi }}
            </q-chip> -->
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import { computed, ref } from 'vue'
const emits = defineEmits([
  'on-enter',
  'getSource',
  'set-model',
  'ada-input',
  'clear',
  'on-select'
])
const props = defineProps({
  source: { type: Array, default: () => [] },
  label: { type: String, default: 'Label' },
  searchBy: { type: String, default: 'nama' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionvalue: { type: [Object, Array, String], default: 'id' },
  optionlabel: { type: [Object, Array, String], default: 'nama' },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  valid: { type: Boolean, default: false },
  model: { type: String, default: '' }
})

const optionx = ref([])
const refAuto = ref(null)
const anu = ref(null)

const modelProp = computed({
  get() { return props.model },
  set(val) {
    emits('set-model', val)
    anu.value = val
  }

})

function fetchData () {
  // console.log(refAuto.value)
  if (props.source.length > 0) {
    optionx.value = props.source
  }
}

const selected = (val) => {
  emits('on-select', val)
  anu.value = val
  // console.log('modelProp', modelProp.value)
}

const clear = val => {
  emits('clear', val)
  anu.value = null
  // console.log('modelProp', modelProp.value)
}
fetchData()

const inputValue = (value) => {
  emits('ada-input', value)
}

function filterFn (val, update) {
  // console.log('filterFn ', val)
  // console.log('refAuto', refAuto.value)
  if (val === '') {
    update(() => {
      optionx.value = props.source
    })
    return
  }
  if (val === null) {
    update(() => {
      optionx.value = props.source
    })
    return
  }
  update(() => {
    // if (val === '') {
    //   optionx.value = props.source
    // } else {
    const needle = val.toLowerCase()
    const arr = refAuto.value.autocomplete
    // console.log('arr', arr)
    if (arr === '') {
      optionx.value = props.source.filter(v => v.toLowerCase().indexOf(needle) > -1)
    } else {
      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
      const filteredData = multiFilter(props.source, splits, needle)
      optionx.value = filteredData
      // console.log('update if bawah ', optionx.value)
    }
    // }
  },
  ref => {
    // console.log(ref)
    if (val !== '' && ref.options.length > 0) {
      ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
      ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
    }
  }
  )
}

function createValue (val, done) {
  const result = new Promise((resolve) => emits('on-enter', val, resolve))
  emits('set-model', val)
  result.then((resp) => {
    fetchData()
    done(resp, 'toggle')
  })
}

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}
</script>
