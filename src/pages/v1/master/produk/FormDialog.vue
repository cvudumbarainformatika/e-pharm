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
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.barcode"
                label="Barcode"
                outlined
                autofocus
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.nama"
                label="Nama*"
                outlined
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.harga_beli"
                prefix="Rp"
                label="Harga Beli*"
                outlined
                number
                currency
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.harga_jual_umum"
                label="Harga Jual Umum*"
                outlined
                number
                currency
                prefix="Rp"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.harga_jual_resep"
                label="Harga Jual Resep*"
                outlined
                number
                currency
                prefix="Rp"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.harga_jual_cust"
                label="Harga Jual Customer*"
                outlined
                number
                currency
                prefix="Rp"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.stok_awal"
                label="Stok Awal*"
                outlined
                number
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <app-input
                v-model="store.form.merk"
                label="Merk*"
                outlined
              />
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-xs-12">
              <!-- <app-input
                v-model="store.form.rak_id"
                label="Posisi Rak*"
                outlined
              /> -->
              <app-autocomplete
                v-model="store.form.rak_id"
                outlined
                style="width:90%"
                label="Rak"
                autocomplete="nama"
                option-value="id"
                option-label="nama"
              />
              <!-- :source="formData.jurusans"
                                            @setModel="(val)=>formData.setForm('jurusan_id', val)"
                                            @onEnter="formData.addJurusan" -->
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.satuan_id"
                label="Satuan*"
                outlined
              />
            </div>
            <div class="col-md-4 col-xs-12">
              <app-input
                v-model="store.form.kategori_id"
                label="Kategori*"
                outlined
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
import { useProdukFormStore } from 'src/stores/produk/form'
import { ref } from 'vue'

const store = useProdukFormStore()
// const price = ref(null)
// const maskedPrice = ref(null)
// const hitung = () => {
//   console.log('price', price.value, 'masked', maskedPrice.value)
// }
// const moneyFormatForDirective = ref({
//   decimal: '.',
//   thousands: ',',
//   prefix: 'Rp ',
//   suffix: ' #',
//   precision: 2,
//   masked: true /* doesn't work with directive */
// })
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
