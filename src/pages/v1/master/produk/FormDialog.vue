<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Produk"
      desc="Input data Produk"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <!-- <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.barcode"
                label="Barcode"
                outlined
                autofocus
              />
            </div>
            -->
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama*"
                outlined
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.harga_beli"
                prefix="Rp"
                label="Harga Beli*"
                outlined
                number
                currency
                @update:model-value="updateHargaBeli"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_umum"
                  style="width:80%"
                  label="Harga Jual Reguler*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_umum) - olahUang(store.form.harga_beli))/olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_resep"
                  label="Harga Jual Dokter*"
                  style="width:80%"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_resep) - olahUang(store.form.harga_beli))/ olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_cust"
                  label="Harga Jual Pri Cash*"
                  style="width:80%"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_cust) - olahUang(store.form.harga_beli))/ olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_prem"
                  label="Harga Jual Pri Kredit*"
                  style="width:80%"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_prem) - olahUang(store.form.harga_beli))/ olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.stok_awal"
                label="Stok Awal*"
                outlined
                number
                valid
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.limit_stok"
                label="Limit Stok*"
                outlined
                number
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
import { olahUang } from 'src/modules/formatter'
import { useProdukFormStore } from 'src/stores/master/produk/form'
import { ref } from 'vue'

const store = useProdukFormStore()

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
