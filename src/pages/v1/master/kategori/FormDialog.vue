<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Kategori"
      desc="Input data Kategori"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-12 col-xs-12">
              <app-input
                v-model="store.form.nama"
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
import { useKategoriFormStore } from 'src/stores/master/kategori/form'
import { ref } from 'vue'

const store = useKategoriFormStore()

const formReff = ref(null)
const onSubmit = () => {
  store.saveForm().then(() => {
    // console.log('form', formReff)
    if (formReff.value != null) { formReff.value.resetValidation() }
  })
}

const onReset = () => {
  formReff.value.resetValidation()
  store.setOpen()
}
</script>
