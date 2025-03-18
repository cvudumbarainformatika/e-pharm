<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Form Produk"
      desc="Input data Produk"
      style="width: 700px; max-width: 80vw;"
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
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_umum"
                  style="width:80%"
                  label="Harga Jual umum*"
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
                  v-model="store.form.harga_jual_hv"
                  style="width:80%"
                  label="Harga Jual hv*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_hv) - olahUang(store.form.harga_beli))/olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>

            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_rac"
                  style="width:80%"
                  label="Harga Jual Racikan*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
                <q-badge>
                  {{ parseInt((olahUang(store.form.harga_jual_rac) - olahUang(store.form.harga_beli))/olahUang(store.form.harga_beli) * 100) }} %
                </q-badge>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="row">
                <app-input
                  v-model="store.form.harga_jual_resep"
                  label="Harga Jual Resep*"
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
                valid
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

function updateHargaBeli(val) {
  const hargaBeli = olahUang(val)
  const sepuluh = hargaBeli * (10 / 100)
  const duapuluh = hargaBeli * (20 / 100)
  // if (!store.form.hv) store.setForm('harga_jual_umum', parseInt(hargaBeli + duapuluh + 1000)) 1000 itu r di transaksi
  // store.setForm('harga_jual_resep', parseInt(hargaBeli + sepuluh + 1000))
  store.setForm('harga_jual_hv', parseInt(hargaBeli + sepuluh))
  store.setForm('harga_jual_umum', parseInt(hargaBeli + duapuluh))
  store.setForm('harga_jual_resep', parseInt(hargaBeli + sepuluh))
  store.setForm('harga_jual_cust', parseInt(hargaBeli))
  store.setForm('harga_jual_prem', parseInt(hargaBeli))
  store.setForm('harga_jual_rac', parseInt(hargaBeli + duapuluh))
  // console.log('harbel', val, olahUang(val), sepuluh, duapuluh, hargaBeli + duapuluh + 1000)
}
// function updateHv(val) {
//   console.log('val hv', val)
//   if (olahUang(store.form.harga_beli) > 0) {
//     console.log('har', val)
//     const hargaBeli = olahUang(store.form.harga_beli)
//     const sepuluh = olahUang(store.form.harga_beli) * (10 / 100)
//     const duapuluh = olahUang(store.form.harga_beli) * (20 / 100)
//     if (val) {
//       console.log('val true', val)
//       store.setForm('harga_jual_umum', parseInt(hargaBeli + sepuluh))
//     } else {
//       store.setForm('harga_jual_umum', parseInt(hargaBeli + duapuluh))
//     }
//   }
// }
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
