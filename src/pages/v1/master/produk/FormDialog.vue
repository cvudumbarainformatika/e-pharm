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
                label="Harga Jual Reguler*"
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
                v-model="store.form.harga_jual_cust"
                label="Harga Jual Grosir*"
                outlined
                number
                currency
                prefix="Rp"
              />
            </div>
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
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-xs-12">
              <div class="row items-center">
                <app-autocomplete-new
                  v-model="store.form.merk_id"
                  outlined
                  style="width:90%"
                  label="Merk"
                  autocomplete="nama"
                  option-value="id"
                  option-label="nama"
                  :source="store.merks"
                  @on-enter="merk.addMerk"
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
                    <strong>KALBE</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
            <div class="col-md-4 col-xs-12">
              <div class="row items-center">
                <app-autocomplete-new
                  v-model="store.form.rak_id"
                  outlined
                  style="width:90%"
                  label="Rak"
                  autocomplete="nama"
                  option-value="id"
                  option-label="nama"
                  :source="store.raks"
                  @on-enter="rak.addRak"
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
                    <strong>1 A</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>

            <div class="col-md-4 col-xs-12">
              <div class="row items-center">
                <app-autocomplete-new
                  v-model="store.form.kategori_id"
                  outlined
                  style="width:90%"
                  label="Kategori"
                  autocomplete="nama"
                  option-value="id"
                  option-label="nama"
                  :source="store.kategoris"
                  @on-enter="kategori.addKategori"
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
                    <strong>generic</strong><br>
                    <em>Lalu tekan Enter </em>
                  </q-tooltip>
                </q-icon>
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-md-4 col-xs-12">
                <div class="row items-center">
                  <app-autocomplete-new
                    v-model="store.form.satuan_besar_id"
                    outlined
                    style="width:90%"
                    label="Satuan Besar"
                    autocomplete="nama"
                    option-value="id"
                    option-label="nama"
                    :source="store.satuanBesars"
                    @on-enter="satuanBesar.addSatuan"
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
                      <strong>pcs</strong><br>
                      <em>Lalu tekan Enter </em>
                    </q-tooltip>
                  </q-icon>
                </div>
              </div>
              <div class="col-md-4 col-xs-12">
                <app-input
                  v-model="store.form.pengali"
                  label="pengali"
                  outlined
                  number
                />
              </div>
              <div class="col-md-4 col-xs-12">
                <div class="row items-center">
                  <app-autocomplete-new
                    v-model="store.form.satuan_id"
                    outlined
                    style="width:90%"
                    label="Satuan"
                    autocomplete="nama"
                    option-value="id"
                    option-label="nama"
                    :source="store.satuans"
                    @on-enter="satuan.addSatuan"
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
                      <strong>pcs</strong><br>
                      <em>Lalu tekan Enter </em>
                    </q-tooltip>
                  </q-icon>
                </div>
              </div>
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
import { useMerkFormStore } from 'src/stores/master/merk/form'
import { useProdukFormStore } from 'src/stores/master/produk/form'
import { useRakFormStore } from 'src/stores/master/rak/form'
import { useSatuanBesarFormStore } from 'src/stores/master/satuan/besar/form'
import { useSatuanFormStore } from 'src/stores/master/satuan/form'
import { ref, onMounted } from 'vue'
// import { Dialog } from 'quasar'
// import { waitLoad } from 'src/modules/utils'

const store = useProdukFormStore()

const rak = useRakFormStore()
const satuan = useSatuanFormStore()
const satuanBesar = useSatuanBesarFormStore()
const kategori = useKategoriFormStore()
const merk = useMerkFormStore()

onMounted(() => {
  store.ambilDataRak()
  store.ambilDataSatuan()
  store.ambilDataSatuanBesar()
  store.ambilDatakategori()
  store.ambilDataMerk()
})
//   const id = uniqueId()
//   console.log(id)
// const uniqueId = () => {
//   const dateString = Date.now().toString(36)
//   const randomness = Math.random().toString(36).substring(2, 7)
//   return dateString + randomness
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
