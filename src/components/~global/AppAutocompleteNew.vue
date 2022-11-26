<template>
  <q-select
    ref="refAuto"
    dense
    :options="optionx"
    :label="label"
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    hide-bottom-space
    no-error-icon
    use-input
    :option-label="optionLabel"
    :option-value="optionValue"
    :disable="disable"
    :loading="loading"
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
    <!-- @keydown.capture="ceptureKey" -->
    <!-- <template
      v-if="icon"
      #append
    >
      <q-icon
        name="icon-mat-cancel"
        class="cursor-pointer"
      />
    </template> -->
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
import { ref, watch } from 'vue'
const emits = defineEmits(['on-enter', 'getSource', 'set-model', 'buang', 'clear', 'on-select', 'em-ref'])
const props = defineProps({
  source: { type: Array, default: () => [] },
  label: { type: String, default: 'Label' },
  searchBy: { type: String, default: 'nama' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionValue: { type: [Object, Array, String], default: 'id' },
  optionLabel: { type: [Object, Array, String], default: 'nama' },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  valid: { type: Boolean, default: false },
  fokus: { type: Boolean, default: false }
})
const optionx = ref([])
const refAuto = ref(null)
function fetchData () {
  // console.log(refAuto.value)
  if (props.source.length > 0) {
    optionx.value = props.source
  }
}
// const ceptureKey = val => {
//   console.log('key', val)
//   if (val === 'Tab') {
//     selected()
//   }
// }
const selected = (val) => {
  emits('on-select', val)
}
const clear = val => {
  emits('clear', val)
}
fetchData()
function filterFn (val, update) {
  console.log('filterFn ', val)
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
    if (arr === '') {
      optionx.value = props.source.filter(v => v.toLowerCase().indexOf(needle) > -1)
      console.log('update if atas ', optionx.value)
    } else {
      const splits = arr.split('-')
      const multiFilter = (data = [], filterKeys = [], value = '') => data.filter((item) => filterKeys.some(key => item[key].toString().toLowerCase().includes(value.toLowerCase()) && item[key]))
      const filteredData = multiFilter(props.source, splits, needle)
      optionx.value = filteredData
      console.log('update if bawah ', optionx.value)
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
// function setDisplay (val) {
//   return val
// }
// function getFocus () {
//   if (props.source.length === 0) {
//     console.log('getData from server')
//     emits('getSource')
//     // optionx.value = props.source
//   }
// }
const inputValue = (value) => {
  emits('buang', value)
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
watch(() => props.source, (obj) => {
  // console.log('watch', obj)
  optionx.value = obj
})
// watch(() => props.fokus, (obj) => {
//   console.log('watch', obj)
//   // optionx.value = obj
// })
</script>

<style lang="scss" scoped>
</style>
