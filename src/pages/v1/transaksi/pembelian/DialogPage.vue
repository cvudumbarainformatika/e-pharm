<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Pembayaran"
      desc="selesaikan pembayaran"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-12">
              <app-autocomplete
                v-model="store.form.jenis"
                label="Pilih tunai atau hutang"
                autocomplete="nama"
                option-value="value"
                option-label="nama"
                outlined
                :source="store.jenises"
                @on-select="store.jenisSelected"
              />
            </div>
          </div>
          <div
            v-if="store.form.jenis == 'tunai' "
            class="row q-col-gutter-md"
          >
            <div class="col-md-12">
              <app-autocomplete
                v-model="store.form.kasir_id"
                label="pilih Kasir"
                autocomplete="name"
                option-value="id"
                option-label="name"
                :source="store.kasirs"
                outlined
                :loading="store.loading"
              />
            </div>
          </div>
          <div
            v-if="store.form.jenis == 'hutang'"
            class="row q-col-gutter-md"
          >
            <div class="col-md-12">
              <app-autocomplete
                v-model="store.form.supplier_id"
                label="pilih Supplier"
                autocomplete="nama"
                option-value="id"
                option-label="nama"
                :source="store.suppliers"
                outlined
                :loading="store.loading"
                @set-model="store.searchSupplier"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md items-center">
            <div class="col-md-4">
              Total Pembelian
            </div>
            <div class="col-md-8">
              <app-input
                v-model="store.form.total"
                label=" "
                outlined
                disable
                prefix="Rp "
                currency
              />
            </div>
          </div>
          <div class="row q-col-gutter-md items-center">
            <div class="col-md-4">
              Ongkir / Admin
            </div>
            <div class="col-md-8">
              <app-input
                v-model="store.form.ongkir"
                label=" "
                prefix="Rp "
                outlined
                currency
                valid
                @update:model-value="store.totalSeluruhnya"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md items-center">
            <div class="col-md-4">
              Potongan
            </div>
            <div class="col-md-8">
              <app-input
                v-model="store.form.potongan"
                label=" "
                outlined
                prefix="Rp "
                currency
                valid
                @update:model-value="store.totalSeluruhnya"
              />
            </div>
          </div>
          <div class="row q-col-gutter-md items-center">
            <div class="col-md-12">
              <div class="text-right">
                Total Seluruhnya
              </div>
              <app-input
                v-model="store.totalSemua"
                label=" "
                outlined
                prefix="Rp "
                disable
                currency
                valid
              />
            </div>
          </div>
          <div
            v-if="store.form.jenis == 'tunai'"
            class="row q-col-gutter-md items-center"
          >
            <div class="col-md-12">
              <app-input
                v-model="store.form.bayar"
                label=" Pembayaran"
                outlined
                prefix="Rp "
                currency
                valid
                @update:model-value="store.kembalian"
              />
            </div>
          </div>
          <div
            v-if="store.form.jenis == 'tunai'"
            class="row q-col-gutter-md items-center"
          >
            <div class="col-md-12">
              <app-input
                v-model="store.form.kembali"
                label=" Kembalian"
                outlined
                prefix="Rp "
                currency
                valid
              />
            </div>
          </div>
          <div
            v-if="store.form.jenis == 'hutang'"
            class="row q-col-gutter-md items-center"
          >
            <div class="col-md-12">
              <q-input
                v-model="store.form.tempo"
                dense
                label="Jatuh Tempo"
                mask="date"
                outlined
                :rules="['date']"
              >
                <template #append>
                  <q-icon
                    name="icon-mat-event"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="store.form.tempo">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
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
// import { olahUang } from 'src/modules/formatter'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
import { ref } from 'vue'

const formReff = ref(null)
const store = usePembelianDialog()
store.setToday()
const onSubmit = () => {
  store.simpanTransaksi()
  if (formReff.value != null) { formReff.value.resetValidation() }
}
const onReset = () => {
  if (formReff.value != null) { formReff.value.resetValidation() }
  store.setOpen()
}
// const totalSeluruhnya = () => {
//   const total = olahUang(store.form.total)
//   const potongan = olahUang(store.form.potongan)
//   const ongkir = olahUang(store.form.ongkir)
//   return total - potongan + ongkir
// }
</script>
