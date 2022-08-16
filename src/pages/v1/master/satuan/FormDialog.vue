<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Satuan"
      desc="Input data Satuan"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.name"
                label="Nama*"
                outlined
                autofocus
              />
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="store.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useSatuanFormStore } from 'src/stores/satuan/form'
import { ref } from 'vue'

const store = useSatuanFormStore()

const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    console.log('form', formReff)
    formReff.value.resetValidation()
  })
}

const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
