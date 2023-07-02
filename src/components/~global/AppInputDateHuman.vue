<template>
  <q-input
    ref="refInputDate"
    :dense="dense"
    :filled="!outlined ? filled : !filled"
    :outlined="outlined"
    :label="label"
    :hide-bottom-space="true"
    no-error-icon
    lazy-rules
    :rules="[anotherValid]"
    :validator="validator"
    class="cursor-pointer"
    :autofocus="autofocus"
    :disable="disable"
    :readonly="readonly"
    :model-value="modelProp"
    @click="showDate"
  >
    <template
      v-if="icon !== null"
      #append
    >
      <q-icon
        :name="icon"
        size="18px"
        @click="showDate"
      />
    </template>
    <template #prepend>
      <q-popup-proxy
        ref="refPopup"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <!-- <q-menu v-model="showing"> -->
        <q-date
          v-if="typeDate"
          ref="refDate"
          v-model="modelProp"
          mask="DD MMMM YYYY"
          today-btn
          @update:model-value="closeDate()"
        >
          <div class="row items-center justify-end">
            <q-btn
              label="Close"
              color="primary"
              flat
              @click="closeDate()"
            />
          </div>
        </q-date>
        <q-time
          v-else
          v-model="modelProp"
          format24h
        >
          <div class="row items-center justify-end">
            <q-btn
              v-close-popup
              label="Close"
              color="primary"
              flat
            />
          </div>
        </q-time>
        <!-- </q-menu> -->
      </q-popup-proxy>
    </template>
  </q-input>
</template>

<script setup>
import { date } from 'quasar'
import { ref, onMounted, computed } from 'vue'

const emits = defineEmits(['showDate', 'setModel', 'setDisplay', 'dbModel'])
const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: 'label'
  },
  model: {
    type: String,
    default: ''
  },
  mask: {
    type: String,
    default: '#.##'
  },
  fillMask: {
    type: String,
    default: '#'
  },
  validator: {
    type: String,
    default: null
  },
  typeDate: {
    type: Boolean,
    default: true
  },
  valid: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  dense: { type: Boolean, default: true },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  reverseFillMask: { type: Boolean, default: false },
  errMessage: { type: String, default: 'error, data tidak valid' }
})

const modelProp = computed({
  get () { return props.model },
  set (val) {
    const temp = val.split(' ')
    let newTgl = ''
    if (temp[1] === 'Mei') {
      newTgl = temp[0] + ' May ' + temp[2]
    } else if (temp[1] === 'Oktober') {
      newTgl = temp[0] + ' October ' + temp[2]
    } else if (temp[1] === 'Agustus') {
      newTgl = temp[0] + ' August ' + temp[2]
    } else if (temp[1] === 'Desember') {
      newTgl = temp[0] + ' December ' + temp[2]
    } else {
      newTgl = val
    }
    // console.log('app input date', newTgl)
    emits('setModel', newTgl)
    emits('setDisplay', val)
    emits('dbModel', date.formatDate(newTgl, 'YYYY-MM-DD'))
  }
})
// const modelProp = toRef(props, 'model')// react to ref
// watch(modelProp, (value) => {
//   props.model.value = modelProp.value // OK, textEnvoye is yours
// })

const refInputDate = ref(null)
const refPopup = ref(null)
const refDate = ref(null)
// const showing = ref(false)
// const modelProxy = ref()

onMounted(() => {
  //   console.log(refInputDate.value.modelValue)
  // modelProxy.value = refInputDate.value.modelValue
})

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}

function closeDate () {
  // console.log('hide', refPopup.value)
  refPopup.value.hide()
}
function showDate () {
  // console.log('show', refPopup.value)
  refPopup.value.show()
  //   showing.value = true
}

// function coba (val) {
//   console.log(val)
// }
</script>

<style lang="scss" scoped>
.q-field--dense .q-field__bottom {
  display: none;
}

.q-field--error .q-field--highligted {
  background: none;
}

.q-field--standout.q-field--highlighted .q-field__control {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  background: rgb(250, 173, 173);
}
</style>
