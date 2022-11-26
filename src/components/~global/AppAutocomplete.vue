<template>
  <q-select
    ref="refAuto"
    dense
    :options="optionx"
    :label="label"
    :filled="!outlined ? filled : !filled"
    :outlined="outlined"
    hide-bottom-space
    no-error-icon
    use-input
    hide-dropdown-icon
    :option-label="typeof(props.optionLabel)==='object'? optionLabel[0] : optionLabel"
    :option-value="optionValue"
    :model="model"
    :disable="disable"
    :model-value="modelProp"
    :loading="loading"
    lazy-rules
    :rules="[anotherValid]"
    behavior="menu"
    map-options
    emit-value
    transition-show="scale"
    transition-hide="scale"
    autofocus
    @update:model-value="selected"
    @filter="filterFn"
    @new-value="createValue"
    @input-value="inputValue"
    @clear="bersihkan"
  >
    <template
      v-if="modelProp"
      #append
    >
      <q-icon
        name="icon-mat-cancel"
        class="cursor-pointer"
        @click.stop.prevent="bersihkan"
      />
    </template>
    <template
      v-if="icon"
      #prepend
    >
      <q-icon
        :name="icon"
      />
    </template>
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <div v-if="typeof(props.optionLabel)==='object'">
            <div
              v-for="(item, i) in props.optionLabel"
              :key="i"
            >
              <q-item-label>{{ scope.opt[item] }}</q-item-label>
              <q-item-label>{{ oLabel }}</q-item-label>
            </div>
          </div>
          <div v-if="typeof(props.optionLabel)==='string'">
            {{ scope.opt[optionLabel] }}
          </div>
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
import { computed, ref, watch } from 'vue'
const emits = defineEmits(['on-enter', 'getSource', 'set-model', 'buang', 'on-select', 'clear', 'em-fokus'])
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
  model: { type: String, default: '' },
  fokus: { type: Boolean, default: false },
  icon: { type: String, default: '' }
})
const optionx = ref([])
const refAuto = ref(null)
const diModel = ref(null)
function fetchData () {
  // console.log(refAuto.value)
  if (props.source.length > 0) {
    optionx.value = props.source
  }
}
const modelProp = computed({
  get () { return props.model },
  set (val) { emits('set-model', val) }
})
const oLabel = computed(() => {
  const balik = props.optionLabel.forEach(data => {
    const temp = ' ' + data
    return temp
  })
  return balik
})
const bersihkan = val => {
  diModel.value = null
  emits('clear', val)
}
const selected = (val) => {
  diModel.value = val
  emits('on-select', val)
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
  update(
    () => {
      // if (val === '') {
      //   optionx.value = props.source
      // } else {
      const needle = val.toLowerCase()
      const arr = refAuto.value.autocomplete

      if (arr === '') {
        optionx.value = props.source.filter((v) => v.toLowerCase().indexOf(needle) > -1)
      } else {
        const splits = arr.split('-')
        const multiFilter = (data = [], filterKeys = [], value = '') =>
          data.filter((item) =>
            filterKeys.some(
              (key) =>
                item[key].toString().toLowerCase().includes(value.toLowerCase()) &&
                item[key]
            )
          )
        const filteredData = multiFilter(props.source, splits, needle)
        optionx.value = filteredData
      }
      // }
    },
    (ref) => {
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
</script>

<style lang="scss" scoped>

</style>
