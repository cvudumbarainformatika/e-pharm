<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Distributor"
      desc="Input data Distributor"
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
                v-model="store.form.nama"
                label="Nama*"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.alamat"
                label="Alamat*"
                outlined
              />
            </div>
          </div>
          <!-- <div class="row q-col-gutter-md">
          </div> -->
          <div class="row q-col-gutter-md q-my-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kontak"
                label="Kontak*"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.saldo_awal_piutang"
                label="Saldo Awal Piutang*"
                outlined
                number
                currency
              />
            </div>
          </div>
          <!-- <div class="row q-col-gutter-md">
          </div> -->
          <div class="row q-col-gutter-md q-my-sm">
            <!-- <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.perusahaan"
                label="Perusahaan*"
                outlined
              />
            </div> -->
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
import { useCustomerFormStore } from 'src/stores/master/customer/form'
import { ref } from 'vue'

const store = useCustomerFormStore()

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
