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
              <!-- <app-input
                v-model="store.form.perusahaan"
                label="Perusahaan*"
                outlined
              /> -->
              <div class="row items-center">
                <app-autocomplete-new
                  v-model="store.form.perusahaan_id"
                  outlined
                  style="width:90%"
                  label="Perusahaan"
                  autocomplete="nama"
                  option-value="id"
                  option-label="nama"
                  :source="store.perusahaans"
                  @on-enter="perusahaan.addPerusahaan"
                />
                <q-icon
                  size="16px"
                  name="icon-mat-help_outline"
                  color="info"
                  class="cursor-pointer"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong>Untuk Masukkan data ?</strong> <br>
                    <em>ketik data yang akan di input</em><br>
                    <em>contoh</em><br>
                    <strong>PT. Maju Jaya</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.kontak"
                label="Kontak*"
                outlined
              />
            </div>
          </div>
          <!-- <div class="row q-col-gutter-md">
          </div> -->
          <!-- <div class="row q-col-gutter-md q-my-sm">
            <div class="col-md-12 col-xs-12">
              <app-input
                v-model="store.form.saldo_awal_hutang"
                label="Saldo Awal Hutang*"
                outlined
                number
                currency
                valid
              />
            </div>
          </div> -->
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
import { usePerusahaanFormStore } from 'src/stores/master/perusahaan/form'
import { useSupplierFormStore } from 'src/stores/master/supplier/form'
import { ref, onMounted } from 'vue'

const store = useSupplierFormStore()

const perusahaan = usePerusahaanFormStore()

onMounted(() => {
  store.ambilDataPerusahaan()
})
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
